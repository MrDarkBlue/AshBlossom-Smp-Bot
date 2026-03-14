// -----------------------------
// MEVCUT BOT KODUN
// -----------------------------
import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import express from 'express';
import fetch from 'node-fetch';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`AshBlossom Bot Aktif!`);
});

// --- KARŞILAMA MESAJI + OTOMATİK ROL ---
client.on("guildMemberAdd", async (member) => {

    const roleID = "1482397689365794950"; // Member rolü
    const welcomeChannelID = "1468326917055844394"; // Welcome kanalı

    const cleanName = member.user.globalName || member.user.username;

    // --- OTOMATİK ROL VERME ---
    try {
        const role = member.guild.roles.cache.get(roleID);
        if (role) {
            await member.roles.add(role);
        }
    } catch (err) {
        console.error("Rol verilemedi:", err);
    }

    // --- WELCOME MESAJI ---
    const welcomeEmbed = new EmbedBuilder()
        .setColor("#b33939")
        .setAuthor({ 
            name: `Welcome ${cleanName}!`, 
            iconURL: member.guild.iconURL({ dynamic: true }) 
        })
        .setDescription(`## Hello, ${cleanName}!\n\nThanks so much for joining us! Hope you enjoy your time in **AshBlossom SMP**!\n\n✦ Check out the <#1468291421671919871> and <#1480769101566841075> to get started.`)
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

// -----------------------------
// CAPTCHA + TEK SEFERLİK INVITE SİSTEMİ
// -----------------------------
const app = express();
app.use(express.json());

// Verify endpoint
app.post('/verify', async (req, res) => {
  const captcha = req.body.captcha;

  const secret = process.env.RECAPTCHA_SECRET;
  const verification = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `secret=${secret}&response=${captcha}`
  });

  const captchaResult = await verification.json();

  if(!captchaResult.success){
    return res.json({success: false});
  }

  try {
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    const channel = guild.channels.cache.get(process.env.INVITE_CHANNEL_ID);
    const invite = await channel.createInvite({ maxUses: 1, unique: true, maxAge: 86400 });

    res.json({success: true, invite: invite.url});
  } catch(err) {
    console.error(err);
    res.json({success: false});
  }
});

// Express server
app.listen(process.env.PORT || 3000, () => console.log('Verification server running...'));

// -----------------------------
// BOT LOGIN
// -----------------------------
client.login(process.env.BOT_TOKEN);
