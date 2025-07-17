async function command(message, client) {

	const remoteJid = message.key.remoteJid;

	const listMessage = {

		text :  `🛒 *Passer une commande chez Caoly*\n\nVeuillez envoyer les détails suivants pour votre commande :\n\n1. 🧾 Produit souhaité (ex: fèves de cacao)\n2. 📦 Quantité (ex: 100 kg, 10 sacs)\n3. 🌍 Destination ou adresse de livraison\n4. 📞 Vos coordonnées (nom + numéro)\n\nNotre équipe vous contactera rapidement pour finaliser la commande et discuter des modalités de paiement/livraison.\n\n------------------------\n\n🛒 *Place a Cocoa Order*\n\nPlease send:\n- Product name\n- Quantity\n- Delivery location\n- Your name and contact\n\nWe'll reach out soon!`,
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

						description: "En savoir plus sur Caoly."
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

export default command;
