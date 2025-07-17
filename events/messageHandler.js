
import mainMenu from '../commands/main.js'

import product from '../commands/product.js'

import command from '../commands/command.js'

import info from '../commands/infos.js'

import appel from '../commands/appel.js'

import ai from '../commands/ai.js'


async function handleIncomingMessage(event, client) {

    const messages = event.messages;

    for (const message of messages) {

        console.log(message)

        const userNum = message.key.remoteJid.split('@s.whatsapp.net')[0];

        console.log(userNum);

        const fromMe = message.key.fromMe;

        const text = (message.message?.extendedTextMessage?.text || message.message?.conversation || '').toLowerCase();

        const prefix = "/";

        if (!fromMe && message.message.listResponseMessage) {

            const commandAndArgs = message.message?.listResponseMessage?.title.slice(prefix.length).trim();

            console.log(commandAndArgs)

            const parts = commandAndArgs.split(/\s+/);

            const args = parts[0];

            console.log(args)

            switch(args) {

                case 'info': 

                    await info(message, client);
                    
                    break;

                case 'product': 

                    await product(message, client);
                    
                    break;

                case 'commande': 

                    await command(message, client);

                    await appel(message, client);

                    break;
                

            case 'appel':

                await appel(message, client);
                
                break;

            }


        } else {
            // sending the normal text to my ai

            await ai(text, message, client);



            //console.log("AI")

        }
    }
}


export default handleIncomingMessage;