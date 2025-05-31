module.exports = {
  config: {
    name: "spy",
    version: "1.0",
    author: "Shikaki",
    countDown: 60,
    role: 2,
    shortDescription: "Get user information and avatar",
    longDescription: "Get user information and avatar by mentioning",
    category: "image",
  },

   onStart: async function ({ event, message, usersData, api, args, getLang }) {
    let avt;
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];
    let uid;

    if (args[0]) {
      // Check if the argument is a numeric UID
      if (/^\d+$/.test(args[0])) {
        uid = args[0];
      } else {
        // Check if the argument is a profile link
        const match = args[0].match(/profile\.php\?id=(\d+)/);
        if (match) {
          uid = match[1];
        }
      }
    }

    if (!uid) {
      // If no UID was extracted from the argument, use the default logic
      uid = event.type === "message_reply" ? event.messageReply.senderID : uid2 || uid1;
    }

    api.getUserInfo(uid, async (err, userInfo) => {
      if (err) {
        return message.reply("Failed to retrieve user information.");
      }

      const avatarUrl = await usersData.getAvatarUrl(uid);

      // Gender mapping
      let genderText;
      switch (userInfo[uid].gender) {
        case 1:
          genderText = "𝗚𝗶𝗿𝗹";
          break;
        case 2:
          genderText = "𝗕𝗼𝘆";
          break;
        default:
          genderText = "𝗨𝗻𝗸𝗻𝗼𝘄𝗻";
      }

      // Construct and send the user's information with avatar
      const userInformation = `━━━━━━━━━━━━━━━\n\n🎀𝙽𝙰𝙼𝙴 : ${userInfo[uid].name}\n😍 𝙿𝚁𝙾𝙵𝙸𝙻𝙴 𝚄𝚁𝙻 : ${userInfo[uid].profileUrl}\n👪 𝙶𝙴𝙽𝙳𝙴𝚁 : ${genderText}\n💀 𝚄𝚂𝙴𝚁 𝚃𝚈𝙿𝙴 : ${userInfo[uid].type}\n🫱🏻‍🫲🏼 𝙸𝚂 𝙵𝚁𝙸𝙴𝙽𝙳 : ${userInfo[uid].isFriend ? "𝚈𝚎𝚜" : "𝙽𝚘"}\n🥳 𝙸𝚂 𝙱.𝙳 𝚃𝙾𝙳𝙰𝚈 : ${userInfo[uid].isBirthday ? "𝚈𝚎𝚜" : "𝙽𝚘"}\n\n━━━━━━━━━━━━━━━`;

      message.reply({
        body: userInformation,
        attachment: await global.utils.getStreamFromURL(avatarUrl)
      });
    });
  }
};
