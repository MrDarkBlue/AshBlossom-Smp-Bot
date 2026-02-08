const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
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
    const roleID = "1469894967924359190"; 
    const welcomeChannelID = "1468326917055844394"; 
    
    // Standart emoji kullanıyoruz çünkü botun diğer sunucuda yetkisi yok
    const coolEmoji = "😎"; 

    // İsimden #0 veya #1234 kısmını tamamen kazıyan kesin yöntem
    const cleanName = member.user.globalName || member.user.username.split('#')[0];

    const role = member.guild.roles.cache.get(roleID);
    if (role) {
        try { await member.roles.add(role); } catch (e) { console.error("Rol hatası"); }
    }

    const welcomeEmbed = new EmbedBuilder()
        .setColor("#b33939") 
        .setTitle(`Welcome to AshBlossom SMP!`)
        // İsim kalınlaştırıldı (Hello **İsim**!)
        .setDescription(`Hello **${cleanName}**!\n\nThanks so much for joining us! Hope you enjoy your time in Beeland!\n\n✨ Check out the rules to start\n✨ Get to know us in introduction`)
        .setThumbnail(member.user.displayAvatarURL({ forceStatic: false }))
        // Emoji burada, üye sayısının yanına (en alta) taşındı
        .setFooter({ text: `${coolEmoji} You're the ${member.guild.memberCount}. member of the server!` })
        .setTimestamp();

    const channel = member.guild.channels.cache.get(welcomeChannelID);
    if (channel) {
        channel.send({ 
            content: `Welcome <@${member.id}>!`, 
            embeds: [welcomeEmbed] 
        });
    }
});

client.login(process.env.BOT_TOKEN);
