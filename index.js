const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ]
});

client.once("ready", () => {
  console.log(`AshBlossom Bot Aktif!`);
});

client.on("guildMemberAdd", async (member) => {
    const roleID = "1469894967924359190"; 
    const welcomeChannelID = "1468326917055844394"; 
    
    // Temiz isim (Tag yok)
    const cleanName = member.user.globalName || member.user.username;

    // Otomatik Rol
    const role = member.guild.roles.cache.get(roleID);
    if (role) { await member.roles.add(role).catch(() => {}); }

    const welcomeEmbed = new EmbedBuilder()
        .setColor("#b33939") 
        // SOL ÜST KÖŞE: Sunucu ikonu ve "welcome İsim!" yazısı
        .setAuthor({ 
            name: `welcome ${cleanName}!`, 
            iconURL: member.guild.iconURL({ dynamic: true }) 
        })
        // ORTA KISIM: Büyük Hello ve içerik
        .setDescription(`## Hello, ${cleanName}!\n\nThanks so much for joining us! Hope you enjoy your time in **AshBlossom Smp**!\n\n✦ check out the <#1468291421671919871> to start\n✦ get to know us in <#1468313543014355118>`)
        // SAĞ TARAF: Kullanıcı resmi
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        // EN ALTI: Üye sayısı ve verdiğin o gif/emoji
        .setFooter({ 
            text: `You're the ${member.guild.memberCount}. member of the server!`, 
            iconURL: "https://cdn.discordapp.com/emojis/636690832904290304.gif" 
        });

    const channel = member.guild.channels.cache.get(welcomeChannelID);
    if (channel) {
        // Üstteki @etiketi sildim, sadece embed gidiyor
        channel.send({ embeds: [welcomeEmbed] });
    }
});

client.login(process.env.BOT_TOKEN);
