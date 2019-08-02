const Discord = require('discord.js')

exports.run = async (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setDescription(`Estou com ${Math.floor(client.ping)} de ping!`)
    .setColor('#42a1f5')

    message.channel.send(embed)
}

/**************************************************************************/
exports.config = { // module.exports.config
    name: 'ping',
    aliases: ['ping']
}