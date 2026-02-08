const { Client, GatewayIntentBits } = require("discord.js");

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
  try {
    const roleId = process.env.AUTO_ROLE_ID;
    if (!roleId) return;

    const role = member.guild.roles.cache.get(roleId);
    if (!role) return;

    await member.roles.add(role);
    console.log(`${member.user.tag} kişisine rol verildi`);
  } catch (err) {
    console.error("Rol verilirken hata:", err);
  }
});

client.login(process.env.BOT_TOKEN);
