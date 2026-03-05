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
            name: `Welcome ${cleanName}!`, 
            iconURL: member.guild.iconURL({ dynamic: true }) 
        })
        // ORTA KISIM: Büyük Hello ve içerik
        .setDescription(`## Hello, ${cleanName}!\n\nThanks so much for joining us! Hope you enjoy your time in **AshBlossom Smp**!\n\n✦ check out the <#1468291421671919871> to start`)
        // SAĞ TARAF: Kullanıcı resmi
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        // EN ALTI: Üye sayısı ve verdiğin o gif/emoji
        .setFooter({ 
            text: `You're the ${member.guild.memberCount}. member of the server!`, 
            iconURL: "https://cdn.discordapp.com/emojis/636690832904290304.gif" 
        });
// --- MULTI-QUESTION ROLE SELECTION SYSTEM ---
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

client.on("messageCreate", async (message) => {
    // Sadece yönetici yetkisi olanlar !setup-roles yazarak başlatabilir
    if (message.content === "!setup-roles" && message.member.permissions.has("Administrator")) {
        
        // 1. SORU: VERSION
        const embedVersion = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("🎮 Game Version")
            .setDescription("## Which version are you playing on?\n\nPlease select your platform to get started.");
        
        const rowVersion = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("role_java").setLabel("Java").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("role_bedrock").setLabel("Bedrock").setStyle(ButtonStyle.Primary)
        );

        // 2. SORU: REGION (Butonlar 5 taneden fazla olduğu için iki satıra böldüm)
        const embedRegion = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("🌍 Region")
            .setDescription("## What region are you from?\n\nSelect your continent for better connection and community.");

        const rowRegionA = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("role_africa").setLabel("Africa").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("role_asia").setLabel("Asia").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("role_australia").setLabel("Australia").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("role_europe").setLabel("Europe").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("role_na").setLabel("North America").setStyle(ButtonStyle.Secondary)
        );
        const rowRegionB = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("role_sa").setLabel("South America").setStyle(ButtonStyle.Secondary)
        );

        // 3. SORU: DMs
        const embedDMs = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("📩 Direct Messages")
            .setDescription("## Are your DMs open?\n\nLet the community know if you are open to private messages.");

        const rowDMs = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("role_dm_open").setLabel("DMs Open").setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("role_dm_closed").setLabel("DMs Closed").setStyle(ButtonStyle.Danger)
        );

        // 4. SORU: PINGS
        const embedPings = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("🔔 Notifications")
            .setDescription("## Which pings you want to receive?\n\nChoose the topics you want to get notified about.");

        const rowPings = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("role_ping_smp").setLabel("SMP").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("role_ping_zoralis").setLabel("Zoralis").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("role_ping_events").setLabel("Events").setStyle(ButtonStyle.Primary)
        );

        // Mesajları ayrı ayrı gönderiyoruz
        await message.channel.send({ embeds: [embedVersion], components: [rowVersion] });
        await message.channel.send({ embeds: [embedRegion], components: [rowRegionA, rowRegionB] });
        await message.channel.send({ embeds: [embedDMs], components: [rowDMs] });
        await message.channel.send({ embeds: [embedPings], components: [rowPings] });
        
        message.delete(); // Komut mesajını temizle
    }
});

// BUTON TIKLAMALARINI DİNLEYEN KISIM
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    // BURADAKİ "ID_YAZ" KISIMLARINA DİSCORD'DAN ALDIĞIN ROL ID'LERİNİ YAPIŞTIR
    const roleMap = {
        "role_java": "ID_YAZ",
        "role_bedrock": "ID_YAZ",
        "role_africa": "ID_YAZ",
        "role_asia": "ID_YAZ",
        "role_australia": "ID_YAZ",
        "role_europe": "ID_YAZ",
        "role_na": "ID_YAZ",
        "role_sa": "ID_YAZ",
        "role_dm_open": "ID_YAZ",
        "role_dm_closed": "ID_YAZ",
        "role_ping_smp": "ID_YAZ",
        "role_ping_zoralis": "ID_YAZ",
        "role_ping_events": "ID_YAZ"
    };

    const roleID = roleMap[interaction.customId];
    const role = interaction.guild.roles.cache.get(roleID);

    if (!role) return interaction.reply({ content: "Role not found! Please update the ID in the code.", ephemeral: true });

    if (interaction.member.roles.cache.has(roleID)) {
        await interaction.member.roles.remove(role);
        return interaction.reply({ content: `Removed the **${role.name}** role.`, ephemeral: true });
    } else {
        await interaction.member.roles.add(role);
        return interaction.reply({ content: `Added the **${role.name}** role!`, ephemeral: true });
    }
});
    const channel = member.guild.channels.cache.get(welcomeChannelID);
    if (channel) {
        // Üstteki @etiketi sildim, sadece embed gidiyor
        channel.send({ embeds: [welcomeEmbed] });
    }
});

client.login(process.env.BOT_TOKEN);
