const { RichEmbed, Client } = require('discord.js');
const Discord = require('discord.js')
const client = new Client()

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
    if(usuario.roles.has(cargo.id)) return message.channel.send(new RichEmbed()
    .setDescription(`Este usuario ja possui este cargo`)
    .setTimestamp()
    .setColor('#42a1f5'))
    usuario.addRole(cargo.id).then(() => {message.channel.send(new RichEmbed()
      .setDescription(`Você adicionou o cargo ${cargo} no player ${usuario}`)
      .setTimestamp()
      .setColor('#42a1f5'))}) 
};

exports.config = {
    name: "setartag",
    aliases: ['setartag', 'st', 'stag']
}