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
    
    // Tag'den kurtulmak için en kesin çözüm
    const cleanName = member.user.globalName || member.user.username;

    // Rol verme işlemi
    const role = member.guild.roles.cache.get(roleID);
    if (role) { await member.roles.add(role).catch(() => {}); }

    const welcomeEmbed = new EmbedBuilder()
        .setColor("#b33939") 
        // 1. SOL ÜST KÖŞE: Sunucu fotoğrafı ve yanına yazı (Author kısmı)
        .setAuthor({ 
            name: `welcome ${cleanName}!`, 
            iconURL: member.guild.iconURL({ dynamic: true }) 
        })
        // 2. ORTA KISIM: Büyük Hello yazısı
        .setDescription(`## Hello, ${cleanName}!\n\nThanks so much for joining us! Hope you enjoy your time in **AshBlossom**!\n\n✨ check out the <#RULES_ID> to start\n✨ get to know us in <#INTRO_ID>`)
        // 3. SAĞ TARAF: Kullanıcının profil fotoğrafı
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        // 4. EN ALTI: Emoji ve üye sayısı
        .setFooter({ 
            text: `You're the ${member.guild.memberCount}. member of the server!`, 
            iconURL: "
