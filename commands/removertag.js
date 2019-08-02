const { RichEmbed } = require('discord.js');
const Discord = require('discord.js')
const client = new Discord.Client();

exports.run = (client, message, args) => {
if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(new RichEmbed()
      .setDescription(`Permissões Insuficientes`)
      .setTimestamp()
      .setColor('#42a1f5'))   
    let usuario = message.mentions.members.first() || message.guild.members.get(args[0])
    let cargo_nome = message.mentions.roles.first().name || args[1]
    if(!usuario)  return message.channel.send(new RichEmbed()
    .setDescription(`Você esqueceu de mencionar o usuario`)
    .setTimestamp()
    .setColor('#42a1f5'))
    if(!cargo_nome)   return message.channel.send(new RichEmbed()
    .setDescription(`Você esqueceu de mencionar o cargo`)
    .setTimestamp()
    .setColor('#42a1f5'))
    let cargo = message.guild.roles.find(role => role.name === `${cargo_nome}`)  
    if(!usuario.roles.has(cargo.id))  return message.channel.send(new RichEmbed()
    .setDescription(`Esse usuario não possui esta tag`)
    .setTimestamp()
    .setColor('#42a1f5'))
    usuario.removeRole(cargo.id).then(() => {message.channel.send(new RichEmbed()
      .setDescription(`Você removeu o cargo ${cargo} no player ${usuario}`)
      .setTimestamp()
      .setColor('#42a1f5'))})
    message.delete();
    
    
};

exports.config = {
    name: "removertag",
    aliases: ['removertag', 'tirartag', 'ttag', 'rt']
}