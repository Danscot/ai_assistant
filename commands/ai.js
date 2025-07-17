import fs from 'fs';

import axios from 'axios';

import mainMenu from './main.js'

async function ai(text, message, client) {

	try {

		const prompt = fs.readFileSync('./prompt.txt', 'utf8');

		// Encode both prompt and content for the URL
		const encodedPrompt = encodeURIComponent(prompt.trim());

		const encodedMessage = encodeURIComponent(text.trim());

		// Construct the API URL
		const apiURL = `https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodedPrompt}&content=${encodedMessage}`;

		// Send the request
		const response = await axios.get(apiURL);

		console.log(response.data.data)

		return mainMenu(response.data.data, message, client);

	} catch (err) {

		console.error("Error calling API:", err.message);
	}
}

export default ai;