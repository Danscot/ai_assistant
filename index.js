
import connectToWhatsApp from './auth/authHandler.js';

import handleIncomingMessage from './events/messageHandler.js';


(async () => {

    await connectToWhatsApp(handleIncomingMessage);
    
})();
