const { Client, GatewayIntentBits } = require("discord.js");

console.log("BOT DOSYASI ÇALIŞTI");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`Bot giriş yaptı: ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  console.log("GUILD MEMBER ADD TETİKLENDİ:", member.user.tag);

  const roleId = process.env.AUTO_ROLE_ID;
  if (!roleId) {
    console.log("AUTO_ROLE_ID YOK");
    return;
  }

  const role = member.guild.roles.cache.get(roleId);
  if (!role) {
    console.log("ROL BULUNAMADI");
    return;
  }

  try {
    await member.roles.add(role);
    console.log("ROL VERİLDİ:", role.name);
  } catch (err) {
    console.error("ROL VERME HATASI:", err);
  }
});

client.login(process.env.BOT_TOKEN);
