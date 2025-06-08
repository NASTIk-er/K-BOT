!cmd install bkashf.js const axios = require("axios");

module.exports.config = {
 name: "bkashf",
 role: 2,
 author: "Gok",
 description: "Create a fake Bkash screenshot",
 usePrefix: true,
 prefix: true,
 category: "Fun",
 guide:"<number> - <transaction ID> - <amount>",
 cooldowns: 5,
};

module.exports.onStart = async function ({ api, event, args }) {
 const input = args.join(" ");
 if (!input.includes("-")) {
 return api.sendMessage(
 `❌| Wrong format!\nUse: ${global.config.PREFIX}bkashf 017xxxxxxxx - TXN12345 - 1000`,
 event.threadID,
 event.messageID
 );
 }

 const [numberRaw, transactionRaw, amountRaw] = input.split("-");
 const number = numberRaw.trim();
 const transaction = transactionRaw.trim();
 const amount = amountRaw.trim();

 const url = `https://masterapi.site/api/bkashf.php?number=${encodeURIComponent(number)}&transaction=${encodeURIComponent(transaction)}&amount=${encodeURIComponent(amount)}`;

 api.sendMessage(
 `𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐢𝐧𝐠.....𝐏𝐋𝐙 𝐖8-⌛`,
 event.threadID,
 (err, info) =>
 setTimeout(() => {
 api.unsendMessage(info.messageID);
 }, 4000)
 );

 try {
 const response = await axios.get(url, { responseType: "stream" });
 const attachment = response.data;

 api.sendMessage(
 {
 body: `━━━━━━━━━━━━━━━━━━━━━━━\n 
______𝐉𝐔𝐒𝐓 𝐖8 𝐀𝐍𝐃 𝐒𝐄𝐄_______ ✅\n━━━━━━━━━━━━━━━━━━━━━━━\n\n📱 𝐏𝐡𝐧 𝐍𝐮𝐦𝐛𝐞𝐫 : ${number}\n🧾 𝐓𝐫𝐚𝐧𝐬𝐚𝐜𝐭𝐢𝐨𝐧 𝐈𝐃: ${transaction}\n💵 𝐀𝐦𝐨𝐮𝐧𝐭: ৳${amount}\n\n📤𝐑𝐄𝐀𝐃𝐘 𝐅𝐎𝐑-𝐘𝐎𝐔𝐑  \n\n━━━━━━━━━━━━━━━━━━━━━━━\n\n 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘:- 𝐆𝐎𝐊-𝐆𝐎𝐊-𝐁𝐎𝐓 \n\n━━━━━━━━━━━━━━━━━━━━━━━`,
 attachment,
 },
 event.threadID,
 event.messageID
 );
 } catch (err) {
 console.error(err);
 api.sendMessage(
 "❌ An error occurred while generating the screenshot.",
 event.threadID,
 event.messageID
 );
 }
};
