const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`AshBlossom Bot Aktif!`);
});

// --- KARŞILAMA MESAJI ---
client.on("guildMemberAdd", async (member) => {
    const welcomeChannelID = "1468326917055844394"; // Welcome kanalı

    const cleanName = member.user.globalName || member.user.username;

    // Welcome Mesajı
    const welcomeEmbed = new EmbedBuilder()
        .setColor("#b33939")
        .setAuthor({ 
            name: `Welcome ${cleanName}!`, 
            iconURL: member.guild.iconURL({ dynamic: true }) 
        })
        .setDescription(`## Hello, ${cleanName}!\n\nThanks so much for joining us! Hope you enjoy your time in **AshBlossom Smp**!\n\n✦ Check out the <#1468291421671919871> and <#1480769101566841075> to get started.`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ 
            text: `You're the ${member.guild.memberCount}. member of the server!`, 
            iconURL: "https://cdn.discordapp.com/emojis/636690832904290304.gif" 
        });

    const channel = member.guild.channels.cache.get(welcomeChannelID);
    if (channel) {
        channel.send({ embeds: [welcomeEmbed] }).catch(console.error);
    }
});

client.login(process.env.BOT_TOKEN);
