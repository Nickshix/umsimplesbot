const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")
const fs = require('fs')
const { saida, entrada } = require('./canais.json')

client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`); 
    const activity = [
                    {name: `Estou em ${client.guilds.size} servidores e conheço ${client.users.size} pessoas`, type: 1, url: "https://www.twitch.tv/cellbit"},
                    {name: `Para mais informações digite .help na sala de comandos!`, type: 1, url: "https://www.twitch.tv/cellbit"}]
    setInterval(function() {
        let random = Math.floor(Math.random() * activity.length)
        client.user.setPresence({game: activity[random]})
    }, 15000)
})


client.on('message', async message => {
    if (message.author.bot) return
    if (message.channel.type === 'dm') return
    let member = message.mentions.members.first()
    if (member) 
        if (member.id == `${client.user.id}`)
            message.channel.send(` \nUse \`.botinfo\` para ver meus comandos \`\``)
        
    if (!message.content.startsWith(config.prefix)) return
    
    const args = message.content.slice(config.prefix.length).trim()
    .split(/ +/g)
    const command = args.shift().toLowerCase()
    
    
    fs.readdir('./commands', (err, files) => {
        if (err) console.log(err)
        
        let jsfile = files.filter(f => f.split('.').pop() === 'js')
        //console.log(jsfile)
        if (jsfile.length <= 0) {
            console.log('Comando não encontrado')
            return
        }
        jsfile.forEach((f) => {
            let pull = require(`./commands/${f}`)
            console.log(`${f} carregado`)
            if (pull.config.aliases.includes(command)) pull.run(client, message, args)
        })
    }) 
})
const jimp = require('jimp')

async function main(){
    let fonte = await jimp.loadFont(jimp.FONT_SANS_64_BLACK)
    let mask = await jimp.read('mascara.png')
    //let avatar = await jimp.read('PERFIL.jpg')
    let fundo = await jimp.read('BemVindoDiscord.PNG')
    jimp.read('https://sm.ign.com/ign_br/news/a/avatar-the/avatar-the-last-airbender-is-getting-expansion-novels_sma8.jpg').then(avatar => {
        avatar.resize(275, 275)
        mask.resize(275, 275)
        avatar.mask(mask)
        fundo.print(fonte, 480, 300, 'OKD GAMING')
        fundo.composite(avatar,132 ,285).write('beta.png')
    })
    .catch(err => {
      console.log('Erro ao carregar a imagem')
    });
}
main()

client.on("guildMemberAdd", async member => {
    let canal = client.channels.get(entrada) // Canal de entrada/bemvindo = entrada no json
    let fonte = await jimp.loadFont(jimp.FONT_SANS_64_WHITE)
    let mask = await jimp.read('mascara.png')
    let fundo = await jimp.read('fundo_bem_vindo.png')
    jimp.read(member.user.displayAvatarURL).then(avatar => {
    avatar.resize(275, 275)
    mask.resize(275, 275)
    avatar.mask(mask)

    fundo.print(fonte, 480, 300, member.user.username)
    fundo.composite(avatar,132 ,285).write('BemVindo_fcrp.png')
    canal.send(``,{ files: ["BemVindo_fcrp.png"] })

    console.log('Imagem enviada para o Discord')
    })
    .catch(err => {
    console.log('Erro ao carregar a imagem')
    });
})
client.on("guildMemberRemove", async member => {
  let canal = client.channels.get(saida) // Canal de saida = saida no json
  let fonte = await jimp.loadFont(jimp.FONT_SANS_64_WHITE)
  let mask = await jimp.read('mascara.png')
  let fundo = await jimp.read('fundo_va_com_deus.png')
  jimp.read(member.user.displayAvatarURL).then(avatar => {
  avatar.resize(275, 275)
  mask.resize(275, 275)
  avatar.mask(mask)
  fundo.print(fonte, 480, 300, member.user.username)
  fundo.composite(avatar,132 ,285).write('BemVindo_fcrp.png')
  canal.send(``,{ files: ["BemVindo_fcrp.png"] })
  console.log('Imagem enviada para o Discord')
  })
  .catch(err => {
  console.log('Erro ao carregar a imagem')
  });
})

client.login(config.token)
