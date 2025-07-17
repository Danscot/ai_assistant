
async function appel(message, client) {

	const remoteJid = message.key.remoteJid;

	const num = "237670707070";
	
	const name = "Caoly support";

    const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN: Caoly\n' // full name
            + 'ORG: Senku Tech;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=237689360833:+237689360833\n' // WhatsApp ID + phone number
            + 'END:VCARD'

    await client.sendMessage(remoteJid,

        { 
            contacts: { 

                displayName: '_*Caoly*_', 

                contacts: [{ vcard }] 
            }
        }
    );

}


export default appel;


