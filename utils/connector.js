import { makeWASocket, useMultiFileAuthState, DisconnectReason } from 'bailey';

import configManager from '../utils/manageConfigs.js';

import fs from "fs";

import fsp from "fs/promises";

import handleIncomingMessage from '../events/messageHandler.js';

const SESSIONS_FILE = "sessions.json";

const sessions = {};

function saveSessionNumber(number) {

    let sessionsList = [];

    if (fs.existsSync(SESSIONS_FILE)) {

        try {

            const data = JSON.parse(fs.readFileSync(SESSIONS_FILE));

            sessionsList = Array.isArray(data.sessions) ? data.sessions : [];

        } catch (err) {

            console.error("Error reading sessions file:", err);

            sessionsList = [];
        }
    }

    if (!sessionsList.includes(number)) {

        sessionsList.push(number);

        fs.writeFileSync(SESSIONS_FILE, JSON.stringify({ sessions: sessionsList }, null, 2));
    }
}

function removeSession(number) {

    console.log(`❌ Removing session data for ${number} due to failed pairing.`);

    if (fs.existsSync(SESSIONS_FILE)) {

        let sessionsList = [];

        try {
            const data = JSON.parse(fs.readFileSync(SESSIONS_FILE));

            sessionsList = Array.isArray(data.sessions) ? data.sessions : [];

        } catch (err) {

            console.error("Error reading sessions file:", err);

            sessionsList = [];
        }

        sessionsList = sessionsList.filter(num => num !== number);

        fs.writeFileSync(SESSIONS_FILE, JSON.stringify({ sessions: sessionsList }, null, 2));
    }

    const sessionPath = `./sessions/${number}`;

    if (fs.existsSync(sessionPath)) {

        fs.rmSync(sessionPath, { recursive: true, force: true });
    }


    delete sessions[number];

    console.log(`✅ Session for ${number} fully removed.`);
}

async function startSession(targetNumber, handler, n) {

    try {            

            console.log("Starting session for:", targetNumber);

            const sessionPath = `./sessions/${targetNumber}`;

            if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath, { recursive: true });

            const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

            const sock = makeWASocket({

                auth: state,

                printQRInTerminal: true,

                syncFullHistory: false,

                markOnlineOnConnect: false

            });

            sock.ev.on('creds.update', saveCreds);

            sock.ev.on('connection.update', async (update) => {

                const { connection, lastDisconnect } = update;

                if (connection === 'close') {

                    console.log("Session closed for:", targetNumber);

                    const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

                    if (shouldReconnect) {
                        
                        startSession(targetNumber, handler);

                    } else {

                        console.log(`❌ User logged out, removing session for ${targetNumber}`);

                        removeSession(targetNumber);
                    }
                } else if (connection === 'open') {

                    console.log(`✅ Session open for ${targetNumber}`);
                }
            });


            setTimeout(async () => {

                if (!state.creds.registered) {

                    const code = await sock.requestPairingCode(targetNumber);
	                    
	                console.log(`📲 Pairing Code: ${code}`);
	                
	                console.log('👉 Enter this code on your WhatsApp phone app to pair.');
	             }

            }, 8000);

            setTimeout(async () => {

                if (!state.creds.registered) {

                    console.log(`❌ Pairing failed or expired for ${targetNumber}. Removing session.`);

                    removeSession(targetNumber);

                    return;
                }
            }, 60000);

            sock.ev.on('messages.upsert', async (msg) => handler(msg, sock));

            sessions[targetNumber] = sock;

            saveSessionNumber(targetNumber);

            if (n) {


                configManager.config.users[`${targetNumber}`] = {

                    sudoList: [],

                    tagAudioPath: "tag.mp3",

                    antilink: false,

                    response: true,

                    autoreact: false,

                    prefix: ".",

                    reaction: "🌹",

                    welcome: false,

                    record: false,

                    type: false
                };

                configManager.save();

            }

            // Make sure structure exists before assignment
            configManager.config = configManager.config || {};

            configManager.config.users = configManager.config.users || {};

            configManager.config.users["root"] = configManager.config.users["root"] || {};

            // Now it's safe to assign
            configManager.config.users["root"].primary = `${targetNumber}`;

            configManager.save();

            return sock;

    } catch (err) {

        console.error("Error creating session :", err);

    }
}

export default startSession;
