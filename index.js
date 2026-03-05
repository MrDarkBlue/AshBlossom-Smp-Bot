const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent // Mesaj komutlarını okuyabilmesi için bu şart
  ]
});

client.once("ready", () => {
  console.log(`AshBlossom Bot Aktif!`);
});

// --- 1. BÖLÜM: KARŞILAMA SİSTEMİ (Welcome) ---
client.on("guildMemberAdd", async (member) => {
    const roleID = "1469894967924359190"; 
    const welcomeChannelID = "1468326917055844394"; 
    
    const cleanName = member.user.globalName || member.user.username;

    // Otomatik Rol Verme
    const role = member.guild.roles.cache.get(roleID);
    if (role) { await member.roles.add(role).catch(() => {}); }

    const welcomeEmbed = new EmbedBuilder()
        .setColor("#b33939") 
        .setAuthor({ 
            name: `Welcome ${cleanName}!`, 
            iconURL: member.guild.iconURL({ dynamic: true }) 
        })
        .setDescription(`## Hello, ${cleanName}!\n\nThanks so much for joining us! Hope you enjoy your time in **AshBlossom Smp**!\n\n✦ check out the <#1468291421671919871> to start`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ 
            text: `You're the ${member.guild.memberCount}. member of the server!`, 
            iconURL: "https://cdn.discordapp.com/emojis/636690832904290304.gif" 
        });

    const channel = member.guild.channels.cache.get(welcomeChannelID);
    if (channel) {
        channel.send({ embeds: [welcomeEmbed] });
    }
});

// --- 2. BÖLÜM: ROL SEÇİM MESAJLARINI GÖNDERME (!setup-roles) ---
client.on("messageCreate", async (message) => {
    if (message.content === "!setup-roles" && message.member.permissions.has("Administrator")) {
        
        // Version Embed
        const embedVersion = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("🎮 Game Version")
            .setDescription("## Which version are you playing on?\n\nPlease select your platform to get started.");
        
        const rowVersion = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("role_java").setLabel("Java").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("role_bedrock").setLabel("Bedrock").setStyle(ButtonStyle.Primary)
        );

        // Region Embed
        const embedRegion = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("🌍 Region")
            .setDescription("## What region are you from?\n\nSelect your continent for better connection.");

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

        // DMs Embed
        const embedDMs = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("📩 Direct Messages")
            .setDescription("## Are your DMs open?\n\nLet others know if you're open to PMs.");

        const rowDMs = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("role_dm_open").setLabel("DMs Open").setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("role_dm_closed").setLabel("DMs Closed").setStyle(ButtonStyle.Danger)
        );

        // Pings Embed
        const embedPings = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("🔔 Notifications")
            .setDescription("## Which pings you want to receive?\n\nChoose your notification topics.");

        const rowPings = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("role_ping_smp").setLabel("SMP").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("role_ping_zoralis").setLabel("Zoralis").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("role_ping_events").setLabel("Events").setStyle(ButtonStyle.Primary)
        );

        await message.channel.send({ embeds: [embedVersion], components: [rowVersion] });
        await message.channel.send({ embeds: [embedRegion], components: [rowRegionA, rowRegionB] });
        await message.channel.send({ embeds: [embedDMs], components: [rowDMs] });
        await message.channel.send({ embeds: [embedPings], components: [rowPings] });
        
        message.delete().catch(() => {}); 
    }
});

// --- 3. BÖLÜM: BUTONLARA TIKLANDIĞINDA ROL VERME ---
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

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
    if (!roleID || roleID === "ID_YAZ") return interaction.reply({ content: "Role ID is not set up correctly!", ephemeral: true });

    const role = interaction.guild.roles.cache.get(roleID);
    if (!role) return interaction.reply({ content: "Role not found in this server!", ephemeral: true });

    if (interaction.member.roles.cache.has(roleID)) {
        await interaction.member.roles.remove(role);
        return interaction.reply({ content: `Removed: **${role.name}**`, ephemeral: true });
    } else {
        await interaction.member.roles.add(role);
        return interaction.reply({ content: `Added: **${role.name}**`, ephemeral: true });
    }
});

client.login(process.env.BOT_TOKEN);
