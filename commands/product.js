async function product(message, client) {

	const remoteJid = message.key.remoteJid;

	const listMessage = {

		text : `🍫 *Nos Produits à base de cacao*\n\n1. 🌰 Fèves de cacao fermentées - Qualité export\n2. 🧱 Pâte de cacao brute\n3. 🛢️ Beurre de cacao pur\n4. 🌾 Poudre de cacao naturelle\n5. 🍬 Produits dérivés (chocolats, confiseries)\n\nTous nos produits respectent les normes internationales de qualité et sont disponibles en gros ou en détail.\n\n------------------------\n\n🍫 *Our Cocoa Products*\n- Fermented cocoa beans\n- Raw cocoa paste\n- Pure cocoa butter\n- Natural cocoa powder\n- Processed goods (chocolates, sweets)\n\nContact us for pricing or samples.`,

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

export default product;
