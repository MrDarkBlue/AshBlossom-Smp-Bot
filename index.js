const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // Üyeleri takip etmek için
    GatewayIntentBits.GuildMessages
  ]
});

client.once("ready", () => {
  console.log(`Bot AshBlossom SMP için hazır: ${client.user.tag}`);
  
  client.user.setPresence({
    status: "online",
    activities: [{ name: "AshBlossom SMP", type: 0 }] 
  });
});

client.on("guildMemberAdd", async (member) => {
    // --- AYARLAR ---
    const roleID = "1469894967924359190"; // AshBlossom Rol ID
    const welcomeChannelID = "1468326917055844394"; // Buraya #welcome kanalının ID'sini yaz Batman!

    // 1. OTOMATİK ROL VERME
    const role = member.guild.roles.cache.get(roleID);
    if (role) {
        try {
            await member.roles.add(role);
            console.log(`${member.user.tag} kullanıcısına rol verildi.`);
        } catch (error) {
            console.error("Rol verme hatası! Botun rolü yukarıda mı kontrol et.");
        }
    }

    // 2. KIRMIZI EMBED MESAJI
    const welcomeEmbed = new EmbedBuilder()
        .setColor("#b33939") // İstediğin o asil kırmızı tonu
        .setTitle(`Welcome to AshBlossom SMP!`)
        .setDescription(`Hello **${member.user.username}**!\n\nThanks so much for joining us! Hope you enjoy your time in Beeland!\n\n✨ Check out the rules to start\n✨ Get to know us in introduction`)
        .setThumbnail(member.user.displayAvatarURL({ forceStatic: false }))
        .setFooter({ text: `You're the ${member.guild.memberCount}. member of the server!` })
        .setTimestamp();

    const channel = member.guild.channels.cache.get(welcomeChannelID);
    if (channel) {
        channel.send({ 
            content: `Welcome <@${member.id}>!`, 
            embeds: [welcomeEmbed] 
        });
    } else {
        console.log("Hata: Welcome kanalı bulunamadı, ID'yi kontrol et Batman.");
    }
});

client.login(process.env.BOT_TOKEN);
