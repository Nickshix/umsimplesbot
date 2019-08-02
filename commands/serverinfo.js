const Discord = require('discord.js');
const client = new Discord.Client();
exports.run = (client, message, args) => {

    const moment = require('moment')
    moment.locale("pt-BR")
    let online = message.guild.members.filter(a => a.presence.status == "online").size;
    let ocupado = message.guild.members.filter(a => a.presence.status == "dnd").size;
    let ausente = message.guild.members.filter(a => a.presence.status == "idle").size;
    let offline = message.guild.members.filter(a => a.presence.status == "offline").size;
    let bot = message.guild.members.filter(a => a.user.bot).size;
    let totalmembros = message.guild.memberCount;
    let canaistexto = message.guild.channels.filter(a => a.type === "text").size;
    let canaisvoz = message.guild.channels.filter(a => a.type === "voice").size;
        const embed = new Discord.RichEmbed()
        .setTitle(`Informacoes do servidor **${message.guild.name}**`)
        .setColor("#36393E")
        .setThumbnail(message.guild.iconURL)
        .setTimestamp()
        .addField('• Criador do servidor:', `<@${message.guild.owner.id}>`)
        .addField('• Criado em:', moment(message.guild.createdAt).format('LLLL'))
        .addField("• ID:", message.guild.id)
        .addField(`• Membros [${totalmembros}]`, `<:online:605700016123805707> Online: ${online}\n <:ausente:605872381591814220> Ausentes: ${ausente}\n Ocupados: ${ocupado}\n <:offline:605700014798274580> Offline: ${offline}\n 🤖 Bots:${bot}`, true)
        .addField(`• Canais [${canaistexto+canaisvoz}]`, `💬 Texto: ${canaistexto}\n 🎧 Voz: ${canaisvoz}`, true)
        .setFooter(`Comando solicitado por: ${message.author.tag}`, `${message.author.avatarURL}`)
        message.channel.send(embed)
}

exports.config = {
    name: "serverinfo",
    aliases: ["serverinfo", "server"]
}
