
async function info(message, client) {

	const remoteJid = message.key.remoteJid;

	const listMessage = {

		text: `🌱 *À propos de Caoly*\n\nCaoly est une entreprise spécialisée dans la production et la commercialisation du cacao de haute qualité, cultivé avec soin au Cameroun. 🌍\n\n📍 Basée à Douala, nous travaillons avec des coopératives locales pour garantir un produit équitable, biologique et durable.\n\n🤝 Nous servons à la fois le marché local et international.\n\n------------------------\n\n🌱 *About Caoly*\n\nCaoly is a cocoa-focused company based in Cameroon. We produce and supply high-quality, organic cocoa through sustainable farming and local partnerships.\n\nContact us anytime for business inquiries or partnership proposals.`,

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
						title: "/commande ",

						rowId: "Passer une commande",

						description: "Passer une commande en ligne."
					}
				]
			}
		]
	};

	await client.sendMessage(remoteJid, listMessage);
}

export default info;
