const { RichEmbed } = require('discord.js')

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new RichEmbed()
    .setDescription(`Permissões Insuficientes`)
    .setTimestamp()
    .setColor('#42a1f5')
    )
    let deletar = args.slice(0).join(" ")
    if(deletar < 2 || deletar > 100) return message.channel.send(new RichEmbed()
    .setDescription(`Você so pode limpar de 2 a 100 mensagems`)
    .setTimestamp()
    .setColor('#42a1f5'))
    if(args.lengt === 0) return message.channel.send(new RichEmbed()
    .setDescription(`Use .limpar (Número de mensages) para o comando funcionar corretamente!`)
    .setTimestamp()
    .setColor('#42a1f5'))
    if(isNaN(args[0])) return message.channel.send(new RichEmbed()
    .setDescription(`Você deve colocar um numero`)
    .setTimestamp()
    .setColor('#42a1f5'))
    
    try {
          message.channel.bulkDelete(deletar)
          message.channel.send(new RichEmbed()
          .setDescription(`O chat foi apagado por ${message.author.tag}\n foram excluidas **${deletar}** mensagens!`)
          .setTimestamp()
          .setColor('#42a1f5'))
    } catch (e) {
          message.channel.send(`[ERRO] ${e}`)
    }

}

exports.config = {
    name: 'limparchat',
    aliases: ['limparchat', 'lc']
}