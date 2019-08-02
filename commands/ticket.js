exports.run = async (client, message, args) => {
    const { categoria-ticket } = require('../canais.json')
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Não tenho permissão de gerenciar canais')
    if (message.guild.channels.find(ch => ch.name.includes(message.author.id))) return message.reply('Já existe um canal criado pra você 🐒')
    
    let channel
    try { 
        channel = await message.guild 
            .createChannel(`${message.member.displayName}#${message.author.discriminator}`,
                {permissionOverwrites: [{
                    id: message.guild.id, 
                    deny: ['READ_MESSAGES'], 
                },
                {
                    id: message.author.id, 
                    allow: ['READ_MESSAGES', 'SEND_MESSAGES'] 
                }]
            }).then(c => c.setParent(categoria-ticket))
        }
    catch(err) {
        message.channel.send('Erro: ' + err.message) 
    }
        let timeout = await channel.send(`<@${message.author.id}>`)
            .catch(err => message.channel.send('Erro: ' + err.message))
        timeout.delete(5000)
        setTimeout(() => channel.delete()
            .then(c => message.channel.send(`\`Canal ${c.name} deletado ✅\``))
            .catch(err => message.channel.send('Erro: ' + err.message)), 86400 * 60) // 1000 * 60 == 1 minuto em milissegundos (ms)
}

exports.config = {
    name: 'ticket',
    aliases: ['ticket']
}