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
    
    // Güneş gözlüklü emoji eklendi
    const emoji = "😎"; 

    // Yeni Discord sisteminde kullanıcı adını (tag'siz) almak için en güvenli yol
    const cleanName = member.user.globalName || member.user.username;

    const role = member.guild.roles.cache.get(roleID);
    if (role) {
        try {
            await member.roles.add(role);
        } catch (error) {
            console.error("Rol verme hatası!");
        }
    }

    const welcomeEmbed = new EmbedBuilder()
        .setColor("#b33939") 
        .setTitle(`Welcome to AshBlossom SMP!`)
        .setDescription(`${emoji} Hello **${cleanName}**!\n\nThanks so much for joining us! Hope you enjoy your time in Beeland!\n\n✨ Check out the rules to start\n✨ Get to know us in introduction`)
        .setThumbnail(member.user.displayAvatarURL({ forceStatic: false }))
        .setFooter({ text: `You're the ${member.guild.memberCount}. member of the server!` })
        .setTimestamp();

    const channel = member.guild.channels.cache.get(welcomeChannelID);
    if (channel) {
        channel.send({ 
            content: `Welcome <@${member.
