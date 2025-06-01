module.exports = {t
 config: {
	 name: "crush",
	 version: "1.0",
	 author: "AceGun",
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "no prefix",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "life") {
 return message.reply({
 body: " 「𝚃𝙰𝙽𝚅𝙸𝚁- 𝙲𝚁𝚄𝚂𝙷 𝚃𝙷𝙸𝚂..!!♡︎♫︎\n\n🝮︎︎︎︎︎︎︎♡︎ 𝙻𝙸𝚂𝙰\n𝙱𝙾𝚃 𝙶𝙾𝙺-🤡」",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/3gInOCz.mp4")
 });
 }
 }
}
