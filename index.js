const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers // Yeni gelenleri görmesi için bu şart!
  ]
});

client.once("ready", () => {
  console.log(`Bot AshBlossom SMP için hazır: ${client.user.tag}`);
  
  // Botun "Oynuyor" kısmını AshBlossom SMP yaptık
  client.user.setPresence({
    status: "online",
    activities: [{ name: "AshBlossom SMP", type: 0 }] 
  });
});

// SUNUCUYA YENİ BİRİ GELDİĞİNDE ÇALIŞIR
client.on("guildMemberAdd", async (member) => {
    // BURAYI DÜZENLE: Discord'dan kopyaladığın Rol ID'sini tırnak içine yapıştır
    const roleID = "1469894967924359190"; 
    
    const role = member.guild.roles.cache.get(roleID);

    if (role) {
        try {
            await member.roles.add(role);
            console.log(`${member.user.tag} kullanıcısına AshBlossom rolü verildi.`);
        } catch (error) {
            console.error("Rol verme hatası! Botun rolü, vereceği rolden daha üstte olmalı.");
        }
    } else {
        console.log("Hata: Belirttiğin Rol ID sunucuda bulunamadı.");
    }
});

client.login(process.env.BOT_TOKEN);
