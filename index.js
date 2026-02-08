const { Client, GatewayIntentBits } = require("discord.js");

console.log("BOT DOSYASI ÇALIŞTI");
console.log("BOT_TOKEN:", process.env.BOT_TOKEN);
console.log("TYPEOF TOKEN:", typeof process.env.BOT_TOKEN);
console.log("TOKEN LENGTH:", process.env.BOT_TOKEN?.length);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`Bot giriş yaptı: ${client.user.tag}`);

  // BOTU ZORLA ONLINE GÖSTER
  client.user.setPresence({
    status: "online",
    activities: [
      {
        name: "Bee SMP",
        type: 0 // PLAYING
      }
    ]
  });
});

client.login(process.env.BOT_TOKEN);
