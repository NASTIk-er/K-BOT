const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
    config: {
        name: "fluxx",
        aliases: ["x", "flx"],
        version: "1.1",
        author: "Mostakim",
        countDown: 15,
        role: 0,
        shortDescription: "AI Generated Art",
        longDescription: "Get AI-generated images based on your prompt",
        category: "fun",
        guide: {
            en: "{pn} prompt  (e.g. art a dog )",
        },
    },

    onStart: async function ({ api, event, args }) {
        const query = args.join(" ").split("-");
        const prompt = query[0]?.trim();
        const limit = parseInt(query[1]?.trim()) || 1;

        if (!prompt) {
            return api.sendMessage(
                "❌ | Please provide a prompt like: art a cat - 4",
                event.threadID,
                event.messageID
            );
        }

        try {
            const wait = await api.sendMessage(
                "⏳ |- 𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙸𝙽𝙶...𝙿𝙻𝚉 𝚆8",
                event.threadID
            );

            const res = await axios.get(`https://www.x-noobs-apis.42web.io/img?text=${encodeURIComponent(prompt)}`);
            const images = res.data?.output;

            if (!images || images.length === 0) {
                return api.sendMessage( 
                    "❌ | 𝙽𝚘 𝚒𝚖𝚊𝚐𝚎𝚜 𝚠𝚎𝚛𝚎 𝚐𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍. 𝚃𝚛𝚢 𝙰 𝚍𝚒𝚏𝚏𝚎𝚛𝚎𝚗𝚝 𝚙𝚛𝚘𝚖𝚙𝚝.",
                    event.threadID,
                    event.messageID
                );
            }

            const selected = images.slice(0, limit);
            const attachments = [];

            for (let i = 0; i < selected.length; i++) {
                const imgData = await axios.get(selected[i], { responseType: "arraybuffer" });
                const fileName = path.join(__dirname, "cache", `art_${i + 1}.jpg`);
                await fs.outputFile(fileName, imgData.data);
                attachments.push(fs.createReadStream(fileName));
            }

            await api.unsendMessage(wait.messageID);

            return api.sendMessage(
                {
                    body: `✅ | 𝙷𝙴𝚁𝙴 𝙸𝚂 𝚈𝙾𝚄𝚁 𝙰𝙸-𝙶𝙴𝙽. 𝙰𝚁𝚃 𝙿𝙸𝙲𝚃𝚄𝚁𝙴: "${prompt}"\n🖼 | Total: ${selected.length} image(s)`,
                    attachment: attachments,
                },
                event.threadID,
                event.messageID
            );

        } catch (err) {
            console.error(err);
            return api.sendMessage(
                `❌ | 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍: ${err.message}`,
                event.threadID,
                event.messageID
            );
        }
    },
};
