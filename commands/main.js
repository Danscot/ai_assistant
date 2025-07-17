async function mainMenu(text,message, client) {
	const remoteJid = message.key.remoteJid;

	const listMessage = {

		text: `${text}`,

		buttonText: "📋 Ouvrir le Menu",

		footer: "assistante Caoly",

		title: "Mika",

		sections: [

			{
				title: "Que voulez vous savoir",

				rows: [

					{
						title: "/info",

						rowId: "/info",

						description: "En savoir plus."
					},

					{
						title: "/product",

						rowId: "/product",

						description: "Voir les infos nos produits."

					},

					{
						title: "/commande",

						rowId: "/commande",

						description: "Passer une commande en ligne."
					}
				]
			}
		]
	};

	await client.sendMessage(remoteJid, listMessage);
}

export default mainMenu;
