const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // Üyeleri takip etmek için şart
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
    // --- AYARLARIN ---
    const roleID = "1469894967924359190"; // AshBlossom Rol ID
    const welcomeChannelID = "1468326917055844394"; // #welcome kanal ID

    // 1. OTOMATİK ROL VERME
    const role = member.guild.roles.cache.get(roleID);
    if (role) {
        try {
            await member.roles.add(role);
            console.log(`${member.user.username} kullanıcısına rol verildi.`);
        } catch (error) {
            console.error("Rol verme hatası! Botun rolü yukarıda mı kontrol et.");
        }
    }

    // 2. KIRMIZI EMBED MESAJI (İSİM DÜZELTİLDİ)
    const welcomeEmbed = new EmbedBuilder()
        .setColor("#b33939") // İstediğin o asil kırmızı tonu
        .setTitle(`Welcome to AshBlossom SMP!`)
        // member.user.tag yerine sadece member.user.username kullanarak temiz isim aldık
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
        console.log("Hata: Welcome kanalı bulunamadı Batman, ID'yi kontrol et.");
    }
});

client.login(process.env.BOT_TOKEN);
