const { default: makeWAconnet, DisconnectReason, makeInMemoryStore, useMultiFileAuthState, delay, downloadContentFromMessage, getAggregateVotesInPollMessage, MessageType, Mimetype} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');

//==(NODE_MODULES)==\\
require('./settings.js')
const fs = require('fs');
const P = require('pino');
const axios = require('axios');
const util = require('util')
const mimetype = require("mime-types")
const ffmpeg = require('fluent-ffmpeg');
const webpmux = require("node-webpmux")
const { exec, spawn, execSync } = require("child_process")
const { decryptPollVote } = require("@whiskeysockets/baileys");
//==(LIB)==\\
const {
 getAdmins,
 getMembers
} = require('./lib/utils');

//=====[CONEXÃO]=====\\
async function connectToWhatsApp () {
    const {state, saveCreds} = await useMultiFileAuthState('./db/conexão')
    const conn = makeWAconnet({
        // can provide additional config here
        printQRInTerminal: true,
        logger: P({level: 'silent'}),
    defaultQueryTimeoutMs: undefined,
    auth: state
    })
    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            const shouldReconnect = (update.lastDisconnect.error.output.statusCode == DisconnectReason.connectionClosed)
            console.log('connection closed due to ', lastDisconnect.error, ', Tentando Reconectar ', shouldReconnect)
            // reconnect if not logged out
            if(shouldReconnect) {
                connectToWhatsApp()
            }
        } else if(connection === 'open') {
            console.log('BOT [ON]')
        }
    })
    conn.ev.on ('creds.update', saveCreds);
    
 const getExtension = async (type) => { 
 return await mimetype.extension(type)
 }
    
conn.ev.on('messages.upsert', async updateM => {
 if (updateM.type != 'notify') return;
 const mek = updateM.messages[0];
 if (!mek.key.participant) mek.key.participant = mek.key.remoteJid;
 mek.key.participant = mek.key.participant.replace(/:[0-9]+/gi, '');
 if (mek.key.fromMe) return;
 if (!mek.message) return;
 const from = mek.key.remoteJid;
 const info = mek.message;  
 const type = require('@whiskeysockets/baileys').getContentType(info);
// console.log(mek.key)
  
 const body = type == 'conversation' ? info[type] : type == 'imageMessage' ? info[type].caption : type == 'videoMessage' ? info[type].caption : type == 'extendedTextMessage' ? info[type].text : type == 'buttonsResponseMessage' ? info[type].selectedButtonId : type == 'listResponseMessage' ? info[type].singleSelectReply.selectedRowId : type == 'templateButtonReplyMessage' ? info[type].selectedId : '';
 selectedButton = (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : ''
 const argsButton = selectedButton.trim().split(/ +/)
 var budy = type === 'conversation' ? mek.message.conversation : type === 'extendedTextMessage' ? mek.message.extendedTextMessage.text : ''
 var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
 function env(text) {
 conn.sendMessage(from, {text: text}, {quoted: mek});
 }
 
 const isGroup = mek.key.remoteJid.endsWith('g.us');
 const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
 const groupDesc = isGroup ? groupMetadata.desc : ""
 const groupMembers = isGroup ? groupMetadata.participants : []
 const sender = mek.key.participant;
 const args = body.trim().split(/ +/).slice(1)
 const argss = body.split(/ +/g)
 const texto = args.join(" ")
 const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
 const quoted = mek.quoted ? mek.quoted : mek
 const qtod = mek.quoted? "true":"false"
 const content = JSON.stringify(mek.message)
 const text = q = args.join(" ")
 const { palavrasANA } = require('./database/jogos/anagrama/jogos.js');
 const pushname = mek.pushName ? mek.pushName : ""
 const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? conn.sendMessage(from, {text: teks.trim(), mentions: memberr}) : conn.sendMessage(from, {text: teks.trim(), mentions: memberr})
}
const colors = require("colors")

const { color, bgcolor } = require('./lib/color')

const os = require('os')

const speed = require('performance-now')

const mime = (quoted.msg || quoted).mimetype || ''

//=========(isQuoted/consts)=============\\
const isImage = type == 'imageMessage'
const isVideo = type == 'videoMessage'
const isAudio = type == 'audioMessage'
const isSticker = type == 'stickerMessage'
const isContact = type == 'contactMessage'
const isLocation = type == 'locationMessage'
const isProduct = type == 'productMessage'
const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage')
typeMessage = body.substr(0, 50).replace(/\n/g, '')
if (isImage) typeMessage = "Image"
else if (isVideo) typeMessage = "Video"
else if (isAudio) typeMessage = "Audio"
else if (isSticker) typeMessage = "Sticker"
else if (isContact) typeMessage = "Contact"
else if (isLocation) typeMessage = "Location"
else if (isProduct) typeMessage = "Product"

const isQuotedMsg = type === 'extendedTextMessage' && content.includes('textMessage')

const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')

const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')

const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')

const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')

const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')

const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')

const isQuotedProduct = type === 'extendedTextMessage' && content.includes('productMessage')

const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)

let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

const Random = Math.random(10)

banChats = false

const participants = isGroup ? await groupMetadata.participants : ''

const greetedMembers = {}; 

const getExtension = async (type) => { return await mimetype.extension(type)}

const cheerio = require("cheerio")

const botNumber = conn.user.id.split(':')[0]+'@s.whatsapp.net'

const moment = require('moment-timezone');

const hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss")

const data = moment.tz("America/Sao_Paulo").format("DD/MM/YY")

const sotoy = JSON.parse(fs.readFileSync('./database/jogos/sotoy.json'))

const logo = global.menu

const { convertSticker } = require("./lib/swm.js");

const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) })

const { getLevelingXp, getLevelingLevel, getLevelingId, Telesticker, addLevelingXp, addLevelingLevel, addLevelingId, smsg, isUrl, tanggal, formatDate, getTime, clockString, getBuffer, jsonformat, format, parseMention, getGroupAdmins, sleep, getRandom, runtime, fetchJson  } = require('./lib/myfunc.js')

function DLT_FL(file) {
try {
fs.unlinkSync(file);
} catch (error) {
return;
}
}

//===(Var)===\\
var _level = JSON.parse(fs.readFileSync('./db/json/level.json'))

var leveling = JSON.parse(fs.readFileSync('./db/json/leveling.json'))

var uang = JSON.parse(fs.readFileSync('./db/json/banco.json'))

var budy2 = body.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

//======[CONST DE ARQUIVOS]=======//

const antilink = JSON.parse(fs.readFileSync('./database/ativacoes/antilink.json'))

const bemvindo = JSON.parse(fs.readFileSync('./database/ativacoes/bemvindo.json'))

const antipala = JSON.parse(fs.readFileSync('./database/ativacoes/antipalavrao.json'))

const rg = JSON.parse(fs.readFileSync('./database/grupos/rg.json'))

const antiimg = JSON.parse(fs.readFileSync('./database/ativacoes/antiimg.json'))

const antiaudio = JSON.parse(fs.readFileSync('./database/ativacoes/antiaudio.json'))

const antidocumento = JSON.parse(fs.readFileSync('./database/ativacoes/antidocumento.json'))

const antivideo = JSON.parse(fs.readFileSync('./database/ativacoes/antivideo.json'))

const samih = JSON.parse(fs.readFileSync('./database/ativacoes/simi.json'));

const samih2 = JSON.parse(fs.readFileSync('./database/ativacoes/simi.json'));

const { insert, response } = require('./database/ativacoes/simi.js');

const forca = JSON.parse(fs.readFileSync('database/jogos/forca.json'))

const puppet = JSON.parse(fs.readFileSync('database/jogos/puppet_forca.json'))

const ban = JSON.parse(fs.readFileSync('./lib/banned.json'))

//===(OWNERS DO BOT)===\\
const owner = ["557499237652@s.whatsapp.net","5511953641743@s.whatsapp.net"]

 //==(CONST is)==\\
 const botN= conn.user.id.replace(/:[0-9]+/gi, '');
 const isOwner = owner.indexOf(sender) < 0;
 const isAdmins = isGroup ? getAdmins(groupMembers) : '';
 const isMemberAdmin = isGroup ? isAdmins.indexOf(sender) > -1 : false;
 const isBotAdm = isGroup ? isAdmins.indexOf(botN) > -1 : false;
 const isCmd = prefix.indexOf(body.slice(0, 1)) > - 1;
 const premium = JSON.parse(fs.readFileSync('./db/json/premium.json'))
 const isPremium = premium.includes(sender)
 const isLevelingOn  = isGroup ? leveling.includes(from) : false
 const level = JSON.parse(fs.readFileSync('./db/json/level.json'))
 const banco = JSON.parse(fs.readFileSync('./db/json/banco.json'))
 const isBanco = JSON.parse(fs.readFileSync('./db/json/banco.json'))
 const isRg = rg.includes(sender)
 const isLevel = level.includes(sender)
 const isAntilink = isGroup ? antilink.includes(from) : false 
 const isAntiLink = sender.includes(sender)
 const isAntiimg = isGroup ? antiimg.includes(from) : false 
 const isAntiImg = sender.includes(sender)
 const isAntivideo = isGroup ? antivideo.includes(from) : false 
 const isAntiVideo = sender.includes(sender)
 const isAntiaudio = isGroup ? antiaudio.includes(from) : false
 const isAntiAudio = sender.includes(sender)
 const isBemvindo = isGroup ? bemvindo.includes(from) : false 
 const isBemVindo = sender.includes(sender)
 const isAntipala = isGroup ? antipala.includes(from) : false 
 const isAntiPala = sender.includes(sender)
 const isBanned = ban.includes(sender)
 
const isSimi = isGroup ? samih.includes(from) : false
const isSimi2 = isGroup ? samih2.includes(from) : false 

 const allForcaId = []
for(let obj of forca) allForcaId.push(obj.id)
const isPlayForca = allForcaId.indexOf(sender) >= 0 ? true : false

async function randompalavra() {
    return new Promise(async (resolve, reject) => {
 fetch('https://www.palabrasaleatorias.com/palavras-aleatorias.php?fs=1&fs2=0&Submit=Nova+palavra',).then(async function (res, err) {
if(err) reject(err)    
var $ = cheerio.load(await res.text())
resolve($('body > center > center > table:nth-child(4) > tbody > tr > td > div')[0].children[0].data)
})
    }) 
}

//=====[VIZU MENSAGEM]=====\\
//await conn.readMessages([mek.key])

//===[SELOS]===\\

const selo = {key: {fromMe: false, participant: '0@s.whatsapp.net'}, message: { "extendedTextMessage": {"text": ` ᴄᴇᴄɪ́ʟɪᴀ ʙᴏᴛ `,"title": null,'jpegThumbnail': null}}}

const selo2 = { key: {fromMe: false, participant: `0@s.whatsapp.net`, ... {}}, message: { "contactMessage": { "displayName": `${pushname}`, "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}}

const selodoc = { key : { fromMe: false, participant : '0@s.whatsapp.net'}, message: {documentMessage: {title: `Bem vindo: ${pushname}`,jpegThumbnail: fs.readFileSync(`./database/fotos/foto.jpg`)}}};

//===[Console]===\\
var olog = '\n' 
const consoleci = olog 
if (isGroup && isCmd) console.log( 
`${consoleci}`,color('COMANDO EM GRUPO', 'white'), 
`${consoleci}`,color('COMANDO:', 'white'), color(`${prefixobot + command}`, 'cyan'),
`${consoleci}`,color('USUÁRIO:', 'white'), color(`${pushname}`, 'cyan'), 
`${consoleci}`,color('GRUPO: \n 」', 'white'), color(`${groupMetadata.subject}`, 'cyan'), 
)

//Console Grupo
if (isGroup && !isCmd) console.log(
`${consoleci}`,color('MENSAGEM EM GRUPO', 'white'), 
`${consoleci}`,color('MENSAGEM:', 'white'),color(`${budy}`, 'cyan'),
`${consoleci}`,color('USUÁRIO:', 'white'),color(`${pushname}`, 'cyan'), 
`${consoleci}`,color('GRUPO:', 'white'),color(`${groupMetadata.subject}`, 'cyan') 
)

//Console no pv 
if (!isGroup && isCmd) console.log( 
`${consoleci}`,color('「 COMANDO NO PV 」', 'white'), 
`${consoleci}`,color('COMANDO', 'white'), color(`${prefixobot + command}`, 'cyan'), 
`${consoleci}`,color('USUÁRIO ', 'white'), color(`${pushname}`, 'cyan')
`${consoleci}`,color('HORA ', 'white'), color(`${hora}`, 'cyan')

) 

//Mensagem Pv 
if (!isGroup && !isCmd) console.log( 
`${consoleci}`,color('MENSAGEM NO PV:', 'green'), 
`${consoleci}`,color('USUÁRIO:', 'yellow'), color(`${pushname}`, 'cyan') 
)
//===[LUGAR DAS IFS]===\\
if (isGroup) {
if (!isLevelingOn) {
    const currentLevel = getLevelingLevel(sender)
    const checkld = getLevelingId(sender)
    try {
    if (currentLevel === undefined && checkld === undefined) addLevelingId(sender)
    const amountXp = Math.floor(Math.random() * 10) + 500
    const requiredXp = 1000 * (Math.pow(2, currentLevel) - 1)
    const getLevel = getLevelingLevel(sender)
    addLevelingXp(sender, amountXp)
    if (requiredXp <= getLevelingXp(sender)) {
    addLevelingLevel(sender, 1)
/*   env(`┏━━━━━━[『 LEVEL UP ! 』]━━━━
┃• *Nome*: Parabéns ${pushname} 
└┬💫
 ┃• *LEVEL ATUAL*: ${getLevel}
 ┃• *Xp ATUAL*: ${getLevelingXp(sender)}
 ┗━━━━━━[💫]━━━━━━━━`
)*/
    }
    } catch (err) {
    console.error(err)
    }
    }
    }

/********** FUCTION DINHEIRO **********/
const addATM = (sender, pushname) => {
const obj = {id: sender, nome: pushname, uang : 0}
uang.push(obj)
fs.writeFileSync('./db/json/banco.json', JSON.stringify(uang))
}

/********** FUCTION DINHEIRO **********/
const getNameDinheiro = (sender) => {
let position = false
Object.keys(uang).forEach((i) => {
if (uang[i].id === sender) {
position = i
}
})
if (position !== false) {
return uang[position].nome
}
}

/********** FUCTION DINHEIRO **********/
const addKoinUser = (sender, amount) => {
let position = false
Object.keys(uang).forEach((i) => {
if (uang[i].id === sender) {
position = i
}
})
if (position !== false) {
uang[position].uang += amount
fs.writeFileSync('./db/json/banco.json', JSON.stringify(uang))
}
}
   
/********** FUCTION DINHEIRO **********/
const checkATMuser = (sender) => {  
let position = false
Object.keys(uang).forEach((i) => {
if (uang[i].id === sender) {
position = i
}
})
if (position !== false) {
return uang[position].uang
}
}

/********** FUCTION DINHEIRO **********/
const confirmATM = (sender, amount) => {
let position = false
Object.keys(uang).forEach((i) => {
if (uang[i].id === sender) {
position = i
}
})
if (position !== false) {
uang[position].uang -= amount
fs.writeFileSync('./db/json/banco.json', JSON.stringify(uang))
}
}

//===[IFS ANAGRAMA]===\\
if (isGroup && fs.existsSync(`./database/jogos/anagrama/anagrama-${from}.json`)){
let dataAnagrama = JSON.parse(fs.readFileSync(`./database/jogos/anagrama/anagrama-${from}.json`))
if (budy.slice(0,4).toUpperCase() == dataAnagrama.original.slice(0,4).toUpperCase() && budy.toUpperCase() != dataAnagrama.original) return env('Quase lá 👀') 
xp = Math.floor(Math.random() * 14) + 3000
if (budy.toUpperCase() == dataAnagrama.original) { conn.sendMessage(from, {text: ` Parabéns ${pushname} 🎉 você ganhou o jogo\nPalavra : ${dataAnagrama.original}\nIniciando o próximo jogo em 5 segundos 😁...`}, {"mentionedJid": [sender]}), fs.unlinkSync(`./database/jogos/anagrama/anagrama-${from}.json`) 
addLevelingXp(sender, xp)
recompensa = ` Parabéns ${pushname}, aqui está alguns Bônus Você ganhou ${xp} em *xp*` 
env(recompensa)
setTimeout(async() => {
fs.writeFileSync(`./database/jogos/anagrama/anagrama-${from}.json`, `${JSON.stringify(palavrasANA[Math.floor(Math.random() * palavrasANA.length)])}`)
let dataAnagrama2 = JSON.parse(fs.readFileSync(`./database/jogos/anagrama/anagrama-${from}.json`))
conn.sendMessage(from, {text:`
╔────── ¤ ◎ 𐂡 ◎ ¤ ──────╗
┃Descubra a Palavra 😁
┃
┃Anagrama: ${dataAnagrama2.embaralhada}
┃ 
┃DICA: ${dataAnagrama2.dica}
╚────── ¤ ◎ 𐂡 ◎ ¤ ──────╝`
 })
 }, 5000)
 }}
 
//===[PATENTES]===\\
const nivelAtual = getLevelingLevel(sender)
var patt = 'Bronze I🥉'
if (nivelAtual === 1) {
patt = 'Bronze  I🥉'
} else if (nivelAtual === 2) {
patt = 'Bronze II🥉'
} else if (nivelAtual === 3) {
patt = 'Bronze  III🥉'
} else if (nivelAtual === 4) {
patt = 'Bronze  IV🥉'
} else if (nivelAtual === 5) {
patt = 'Bronze  V🥉'
} else if (nivelAtual === 6) {
patt = 'Prata I🥈'
} else if (nivelAtual === 7) {
patt = 'Prata II🥈'
} else if (nivelAtual === 8) {
patt = 'Prata III🥈'
} else if (nivelAtual === 9) {
patt = 'Prata IV🥈'
} else if (nivelAtual === 10) {
patt = 'Prata V🥈'
} else if (nivelAtual === 11) {
patt = 'Ouro I🥇'
} else if (nivelAtual === 12) {
patt = 'Ouro II🥇'
} else if (nivelAtual === 13) {
patt = 'Ouro III🥇'
} else if (nivelAtual === 14) {
patt = 'Ouro IV🥇'
} else if (nivelAtual === 15) {
patt = 'Ouro V🥇'
} else if (nivelAtual === 16) {
patt = 'Platina  I'
} else if (nivelAtual === 17) {
patt = 'Platina  II'
} else if (nivelAtual === 18) {
patt = 'Platina  III'
} else if (nivelAtual === 19) {
patt = 'Platina IV'
} else if (nivelAtual === 20) {
patt = 'platina V'
} else if (nivelAtual === 21) {
patt = 'Diamante I 💎'
} else if (nivelAtual === 22) {
patt = 'Diamante II 💎'
} else if (nivelAtual === 23) {
patt = 'Diamante III 💎'
} else if (nivelAtual === 24) {
patt = 'Diamante IV 💎'
} else if (nivelAtual === 25) {
patt = 'Diamante V 💎'
} else if (nivelAtual === 26) {
patt = 'Mestre I 🏆'
} else if (nivelAtual === 27) {
patt = 'Mestre II 🏆'
} else if (nivelAtual === 28) {
patt = 'Mestre III 🏆'
} else if (nivelAtual === 29) {
patt = 'Mestre IV 🏆'
} else if (nivelAtual === 30) {
patt = 'Mestre V 🏆'
} else if (nivelAtual === 31) {
patt = 'Mítico I 🔮'
} else if (nivelAtual === 32) {
patt = 'Mítico II 🔮'
} else if (nivelAtual === 33) {
patt = 'Mítico III 🔮'
} else if (nivelAtual === 34) {
patt = 'Mítico IV 🔮'
} else if (nivelAtual === 35) {
patt = 'Mítico V 🔮'
} else if (nivelAtual === 36) {
patt = 'Campeão I🕴'
} else if (nivelAtual === 37) {
patt = 'Campeão II🕴'
} else if (nivelAtual === 38) {
patt = 'Campeão III🕴'
} else if (nivelAtual === 39) {
patt = 'Campeão IV🕴'
} else if (nivelAtual === 40) {
patt = 'Campeão V🕴'
} else if (nivelAtual >= 41) {
patt = '👑 Owner 👑'
}
if (isGroup) {
const checkATM = checkATMuser(sender)
try {
if (checkATM === undefined) addATM(sender, pushname)
const uangsaku = Math.floor(Math.random() * 10) + 90
addKoinUser(sender, uangsaku)
} catch (err) {
console.error(err)
}
}

//===[IFS DE MENSAGEM]===\\

if ((body === 'krl') | (body === 'Krl') | (body === 'karalho')) { 
env('Ban') 
}

if ((body === "bot") || (body === "Bot")) {
bla = fs.readFileSync('./database/audio/boy.mp3')
conn.sendMessage(from, {audio: bla, mimetype: 'audio/mp4', ptt:true}, {quoted: mek})
}

if ((body === ('Ceci')) || (body === ('Cecília'))) { 
env(`Olá ${pushname}! Para ter acesso a minha lista de comandos Digite ${prefixobot}menu `)
}

/*if (isPremium) { 
conn.sendMessage(from, {react: {
text: "👑", 
key: mek.key
}}
)
}*/

//===[IF DE BAN NOS COMANDOS]===\\
if (!mek.key.fromMe && !isOwner && banChats === true) return 
        if (isCmd && isBanned) { 
         return console.log(color('[ ❗BAN ❗] Ignorando comando', 'yellow'), color(moment.tz('America/Sao_Paulo').format('HH:mm:ss'), 'blue'), color(`${command}`),'DE', color(pushname))}

//Menu                
switch (command) {

case 'Menu': case 'menu':
let menuft = `${Math.floor(Math.random() * 5)}`   
           var menuzin =`╭═══════════════⊷
│ INFOR BOT ❗
╰╮╭────⪩
╭┤│⪧ *Nome: Ceci Bot*
│┃│⪧ *Data: ${data}*
│┃│⪧ *Prefixo:『 ${prefixobot} 』*
│┃├──────⪧
│┃│ !INFOR USER! 👤
│┃│
│┃│⪧ *Nome: ${pushname}*
│┃│⪧ *Numero: ${sender.split("@")[0]}*
│┃│⪧ *Level: ${getLevelingLevel(sender)}*
│┃│⪧ *Saldo: ${checkATMuser(sender)}*
│┃╰────────
│╰────────⪩
╰═════════════⊷

     ঔৣ͜͡𝐌𝐄𝐍𝐔 𝐏𝐑𝐈𝐍𝐂𝐈𝐏𝐀𝐋 

╭═══════════════⊷
│
│╭━━━━━━━━━━━━━━━━━━⪨
│┃╭─「* ⏤͟͟͞͞𝐒𝐔𝐏𝐎𝐑𝐓𝐄 👨‍💻* 」⊷
│┃│
│┃│${prefixobot}Suporte
│┃│${prefixobot}Novocmd
│┃│${prefixobot}Bug
│┃╰───────⊷
│╰━━━━━━━━━━━━━━━━━━⪩
│
│╭━━━━━━━━━━━━━━━━━━⪨
│┃╭─「* ⏤͟͟͞͞𝐁𝐀𝐍𝐂𝐎 🏦* 」⊷
│┃│
│┃│${prefixobot}Saldo
│┃│${prefixobot}Pix @/2000
│┃│${prefixobot}Apostar
│┃│${prefixobot}Rankmoney
│┃│${prefixobot}Buyprem (comprar premium) 
│┃╰───────⊷
│╰━━━━━━━━━━━━━━━━━━⪩
│
│╭━━━━━━━━━━━━━━━━━━⪩
│┃╭─「* ⏤͟͟͞͞𝐌𝐄𝐌𝐁𝐑𝐎𝐒 👤* 」⊷
│┃│
│┃│${prefixobot}Chat 
│┃│${prefixobot}Gpt 「 Faça uma Pergunta. 」
│┃│${prefixobot}Ranklevel
│┃│${prefixobot}Ping
│┃│${prefixobot}Perfil
│┃│${prefixobot}Reagir 🌟
│┃│${prefixobot}Wame
│┃│${prefixobot}Tiktok
│┃│${prefixobot}Cartafof
│┃│${prefixobot}Playaudio
│┃│${prefixobot}Playvideo
│┃│${prefixobot}Troll
│┃│${prefixobot}Sn 「 Faça uma Pergunta. 」
│┃│${prefixobot}Contar
│┃│${prefixobot}Toimg
│┃╰───────
│╰━━━━━━━━━━━━━━━━━━⪨
│
│╭━━━━━━━━━━━━━━━━━━⪨
│┃╭─「* ⏤͟͟͞͞𝐀𝐃𝐌𝐈𝐍𝐈𝐒𝐓𝐑𝐀𝐂̧𝐀̃𝐎 👑* 」⊷
│┃│
│┃│${prefixobot}Ban @
│┃│${prefixobot}Add (apns dono)
│┃│${prefixobot}Totag
│┃│${prefixobot}Clear
│┃│${prefixobot}Fechar
│┃│${prefixobot}Abrir
│┃│${prefixobot}Nomegp
│┃│${prefixobot}Descgp
│┃│${prefixobot}Rebaixar
│┃│${prefixobot}Promover
│┃│${prefixobot}Leveling
│┃│${prefixobot}Marcar2
│┃│${prefixobot}Mute @
│┃╰───────⊷
│╰━━━━━━━━━━━━━━━━━━⪩
│
│╭━━━━━━━━━━━━━━━━━━⪨
│┃╭─「* ⏤͟͟͞͞𝐀𝐓𝐈𝐕𝐀𝐂̧𝐎̃𝐄𝐒 ✔️* 」⊷
│┃│
│┃│${prefixobot}Antilink「 1/0 」
│┃│${prefixobot}Antipala「 1/0 」
│┃│${prefixobot}Bemvindo「 1/0 」
│┃│${prefixobot}AntiImg「 1/0 」
│┃│${prefixobot}AntiAudio「 1/0 」
│┃│${prefixobot}AntiDocumento「 1/0 」
│┃│${prefixobot}AntiVideo「 1/0 」
│┃│${prefixobot}AntiAudio「 1/0 」
│┃│${prefixobot}Simi2「 1/0 」
│┃╰───────⊷
│╰━━━━━━━━━━━━━━━━━━⪩
│
│╭━━━━━━━━━━━━━━━━━━⪩
│┃╭─「* ⏤͟͟͞͞𝐅𝐈𝐆𝐔𝐑𝐈𝐍𝐇𝐀𝐒 🖼️* 」⊷
│┃│
│┃│${prefixobot}Attp1
│┃│${prefixobot}Attp2
│┃│${prefixobot}Attp3
│┃│${prefixobot}Attp4
│┃│${prefixobot}Attp5
│┃│${prefixobot}Attp6
│┃│${prefixobot}Attp7
│┃│${prefixobot}Roubar
│┃│${prefixobot}-S/Fig
│┃│${prefixobot}PackFig 
│┃╰───────⊷
│╰━━━━━━━━━━━━━━━━━━⪨
│
│╭━━━━━━━━━━━━━━━━━━⪨
│┃╭─「* ⏤͟͟͞͞𝐒𝐅𝐖 🆓* 」⊷
│┃│
│┃│${prefixobot}Imgneko
│┃│${prefixobot}Imgwaifu
│┃│${prefixobot}Loli
│┃╰───────⊷
│╰━━━━━━━━━━━━━━━━━━⪩
│
│╭━━━━━━━━━━━━━━━━━━⪩
│┃╭─「* ⏤͟͟͞͞𝐉𝐎𝐆𝐎𝐒 🎮* 」⊷
│┃│
│┃│${prefixobot}Anagrama
│┃│${prefixobot}Roleta
│┃│${prefixobot}Roleta2
│┃│${prefixobot}Cassino
│┃│${prefixobot}Cassino2
│┃╰───────⊷
│╰━━━━━━━━━━━━━━━━━━⪨
│
│╭━━━━━━━━━━━━━━━━━━⪨
│┃╭─「* ⏤͟͟͞͞𝐃𝐈𝐕𝐄𝐑𝐒𝐎𝐒 👾* 」⊷
│┃│
│┃│${prefixobot}Gay
│┃│${prefixobot}Macaco
│┃│${prefixobot}Macaca
│┃│${prefixobot}Puta
│┃│${prefixobot}Puto
│┃│${prefixobot}Gado
│┃╰───────⊷
│╰━━━━━━━━━━━━━━━━━━⪩
│
│╭━━━━━━━━━━━━━━━━━━⪨
│┃╭─「* ⏤͟͟͞͞𝐁𝐑𝐈𝐍𝐂𝐀𝐃𝐄𝐈𝐑𝐀𝐒 🏳️‍🌈* 」⊷
│┃│
│┃│${prefixobot}Rankgay
│┃│${prefixobot}Rankcorno
│┃│${prefixobot}Rankgostosa
│┃│${prefixobot}Rankgostoso
│┃│${prefixobot}Rankbonito
│┃│${prefixobot}Rankgado
│┃│${prefixobot}Rankpau
│┃│${prefixobot}Rankotaku
│┃│${prefixobot}Ranknazista
│┃│${prefixobot}Rankfedidos
│┃│${prefixobot}Casal
│┃│${prefixobot}Shippo
│┃│${prefixobot}Morte
│┃│${prefixobot}Ppt 「 Pedra Papel Tesoura 」
│┃│${prefixobot}Pau
│┃│${prefixobot}Vesgo @
│┃│${prefixobot}Corno @
│┃│${prefixobot}Gay @
│┃│${prefixobot}Bebado @
│┃│${prefixobot}Chute @
│┃│${prefixobot}Tapa @
│┃│${prefixobot}Beijo @
│┃╰───────⊷
│╰━━━━━━━━━━━━━━━━━━⪩
│
│╭━━━━━━━━━━━━━━━━━━⪨
│┃╭─「* ⏤͟͟͞͞𝐋𝐎𝐆𝐎𝐒 🖼️* 」⊷
│┃│
│┃│${prefixobot}Diablo
│┃│${prefixobot}Blackpink
│┃│${prefixobot}Pinkv2
│┃│${prefixobot}Urso
│┃│${prefixobot}Areia
│┃│${prefixobot}Borracha
│┃│${prefixobot}Brotoluz
│┃│${prefixobot}Brilhante
│┃│${prefixobot}Tapete
│┃│${prefixobot}Papel
│┃│${prefixobot}Blur
│┃╰───────⊷
│╰━━━━━━━━━━━━━━━━━━⪩
│
│╭━━━━━━━━━━━━━━━━━━⪨
│┃╭─「* ⏤͟͟͞͞𝐕𝐈𝐏 ⚜️* 」⊷
│┃│
│┃│${prefixobot}Menuvip
│┃│${prefixobot}Neko
│┃│${prefixobot}Waifu
│┃│${prefixobot}Grupo
│┃╰───────⊷
│╰━━━━━━━━━━━━━━━━━━⪩
│
│╭━━━━━━━━━━━━━━━━━━⪨
│┃╭─「* ⏤͟͟͞͞𝐎𝐖𝐍𝐄𝐑  ☰* 」⊷
│┃│
│┃│${prefixobot}Eval
│┃│${prefixobot}Mek
│┃│${prefixobot}Exec
│┃│${prefixobot}Fotobot
│┃│${prefixobot}addpremium
│┃│${prefixobot}listavip
│┃│${prefixobot}Reprem
│┃╰───────⊷
│╰━━━━━━━━━━━━━━━━━━⪩
│${linktrr}
╰━━━━━━━━━━━━━━━━━━⪩
`
conn.sendMessage(from, {image: {url: `./shelly.jpg`}, caption: menuzin}, {quoted: selo2})
break

case 'menuvip': 
if (!isPremium) return env("Apenas usuários vip") 
let menuprem = `${Math.floor(Math.random() * 5)}`   
var menuvip = ` 
╭━━━━━━━━━━━━━━━━━━⪧
┃•
┃• ╭──────────────⊷
┃• ┃ Infor User 🇧🇷
┃• ┃
┃• ┃ Prefixo: 「 Multi 」
┃• ┃ Nome: ${BotName}
┃• ┃ Hora: ${hora} 
┃• ┃ Data: ${data}
┃• ┃ Premium: Sim ✅
┃• ╰──────────────⊷
┃•
╰━━━━━━━━━━━━━━━━━━⪧

          MENU VIP 
          
╭━━━━━━━━━━━━━━━━━━ ⪧
┃╭─「 *Vip* 」⊷
┃│
┃│${prefixobot}Ddd 83   
┃│${prefixobot}Neko
┃│${prefixobot}Waifu
┃│${prefixobot}Grupo
┃│${prefixobot}Ass
┃│${prefixobot}Cum
┃│${prefixobot}Ahegao
┃│${prefixobot}Hentai
┃│${prefixobot}Ero
┃│${prefixobot}Orgy
┃│${prefixobot}Femdom
┃│${prefixobot}BlowJob
┃│${prefixobot}Cuckold
┃│${prefixobot}Glasses
┃│${prefixobot}Foot
┃╰───────⊷
╰━━━━━━━━━━━━━━━━━━ ⪧
`
conn.sendMessage(from, {image: {url: './database/fotos/premium.jpg'}, caption: menuvip}, {quoted: selo})
break

//===[OUTROS]===\\

case 'suporte': 
if (!q) return env("Ex: .suporte Qual a próxima atualização?") 
env(`enviada para minha equipe 😁`)
let templateMessageee = { 
image: {url: './database/fotos/sugestao.jpg',
quoted: selo},
caption: `「 Suporte 」 \n  número: ${sender.split('@')[0]}\n Mensagem: ${q}`
}
conn.sendMessage(`120363159061319573@g.us`, templateMessageee)
break

case 'rename': 
case 'roubar': 
if (!isQuotedSticker) return env("Marque uma Figurinha") 
encmediats = await getFileBuffer(mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
var kls = q
var pack = kls.split("/")[0]; 
var author2 = kls.split("/")[1];
if (!q) return env("Tem coisa faltando!")
if (!pack) return env("*Escreva no formato certo: -roubar Cecília/bot*")
if (!author2) return env("Escreva no formato certo: -roubar Cecília/bot")
env("Calma la calma lá")
bas64 = `data:image/jpeg;base64,${encmediats.toString('base64')}`
var mantap = await convertSticker(bas64, `${author2}`, `${pack}`)
var sti = new Buffer.from(mantap, 'base64'); 
conn.sendMessage(from, {sticker: sti, contextInfo: { externalAdenv:{title: `${pack}|${author2}`, body:"", previewType:"PHOTO",thumbnail: sti}}}, {quoted: selo})
.catch((err) => { 
env("Opss! Deu erro"); 
})
break

case 'ranklevel': 
_level.sort((a, b) => (a.xp) ? 1 : -1)
var leaderboardlvl = ` 🏆 Rank Level\n\n` 
let nom = 0 
try { 
for (let i = 0; i < 10; i++) { 
nom++ 
leaderboardlvl += ` 
│╭──────────
││
││ [${nom}] => ${_level[i].id.replace('@s.whatsapp.net', '')}
││「Xp: => ${_level[i].xp}
││「Level」=> ${_level[i].level}
│╰─────────\n` 
}
leaderboardlvl += ` [ RANKING LEVEL ]` 
conn.sendMessage(from, {text: leaderboardlvl, sendEphemeral: true}, {quoted: mek})
} catch (err) { 
console.log(err) 
await env('Requisitos não estão comoletos')
}
break

case 'metadinha': {
await conn.sendMessage(from, { react: {text: '😉', key: mek.key}})
let una = await axios.get(`https://marcos025.onrender.com/api/ferramenta/metadinha?apikey=yOCSpNOwKw`)
conn.sendMessage(from, {image: {url: una.data.masculina}, caption: `Maculina`})
conn.sendMessage(from, {image: {url: una.data.feminina}, caption: `Feminina`})
}
break

//=====[LOGO]=====\\

case 'gatinho':
 cleiton = `Cute Cute🐈‍⬛❤️‍🩹`
conn.sendMessage(from, {image: {url: `https://cataas.com/cat?type=sq`}, caption: cleiton, mek})
break

//===[FIM DAS LOGOS]===\\

//=====[CMDS ADMINS]=====\\

case 'clear':
if (!isMemberAdmin) return ('apenas admins ❌...')
conn.sendMessage(from, {text:' Limpo \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nlimpo'})
break

case 'ban':
if (!isGroup) return env('[❗] Comando feito apenas em Grupos')
if (!isMemberAdmin) return env('Recurso disponível apenas para a Administração')
if (!isBotAdm) return env('Apenas adms')
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return env('Marque a mensagem ou o @ do alvo')
if (mek.message.extendedTextMessage.contextInfo.participant !== null && mek.message.extendedTextMessage.contextInfo.participant != undefined && mek.message.extendedTextMessage.contextInfo.participant !== "") {
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0] ? mek.message.extendedTextMessage.contextInfo.mentionedJid[0] : mek.message.extendedTextMessage.contextInfo.participant
if (sender.includes) return env('Marque o @ do usuário')
if (botNumber.includes) return env('Não vou me remover bobão')
if (Owner.includes) return env('Não vou remover meu Dono')
let responseb = await conn.groupParticipantsUpdate(from, [mentioned], 'remove')
if (responseb[0].status ===  '200') conn.sendMessage(from, {text: `${mentioned.split('@')[0]} foi removido do grupo`, mentions: [mentioned, sender], contextInfo: {forwardingScore:999, isForwarded: true}})
else if (responseb[0].status === '406') conn.sendMessage(from, {text: `${mentioned.split('@')[0]} Criou esse Grupo e não pode ser removido`, mentions: [mentioned, sender], contextInfo: {forwardingScore:999, isForwarded: true}})
else if (responseb[0].status === '404') conn.sendMessage(from, {text: `Esse numero ja foi removido`, mentions: [mentioned, sender], contextInfo: {forwardingScore:999, isForwarded: true}})
else conn.sendMessage(from, {text: 'Deu erro, Tente Novamente', mentions: [mentioned, sender], contextInfo: {forwardingScore:999, isForwarded: true}})
} else if (mek.message.extendedTextMessage.contextInfo.mentionedJid != null && mek.message.extendedTextMessage.contextInfo.mentionedJid != undefined) { 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.includes(sender)) return env('Marque o @ do usuário')
if (mentioned.includes(owner)) return env('Não vou remover meu dono bobão')
if (mentioned.includes(botNumber)) return env('Não vou me remover')
if (mentioned.length > 1) {
if (mentioned.length > groupMembers.length || mentioned.length === groupMembers.length || mentioned.length > groupMembers.length - 3) return env('Jaja o grupo fica sem membros')
veacovc = 0 
for (let banned of mentioned) {
await sleep (100)
if (responseb2 = await conn.groupParticipantsUpdate(from, [banned], 'remove'))
if (responseb2[0].status === '200') veacovc = veacovc + 1
}
conn.sendMessage(from, {text: `${veacovc} participantes removido do grupo..`, mentions: [mentioned, sender], contextInfo: {forwardingScore:999, isForwarded: true}})
} else {
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (mentioned.length > 1) {
tkkes = 'Membro removido com sucesso \n'
for (let _ of mentioned) {
tkkes += `@${_.split("@")[0]}\n`
}
mentions(tkkes, mentioned, true) 
conn.groupParticipantsUpdate(from, mentioned, 'remove')
} else { 
mentions(`Membro removido com sucesso`, mentioned, true)
conn.groupParticipantsUpdate(from, mentioned, 'remove')
}
}
}
break

case 'troll': {
if (!isGroup) return env("Kkkkkk") 
var Kick = `${sender.split("@")[0]}@s.whatsapp.net` 
setTimeout( () => {
env(`rs`)
}, 100) 
env(`☝️🤓`) 
setTimeout( () => { 
conn.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => 
{env(`Deu erro: ${e}`)}) 
}, 10) 
setTimeout( () => {
}, 0) 
}
break

case 'seradm':  
if (isOwner) return env('*So dono*');
conn.groupParticipantsUpdate(from, [sender], "promote")
break

case 'sermembro': 
if (isOwner) return env('*Apenas Administradores do Grupo*');
conn.groupParticipantsUpdate(from, [sender], "demote")
break

case 'resetlink':
case 'resetarlink': 
case 'redefinirlink': 
if (isMemberAdmin) return env("*Epa! Comando feito apenas para a Administração*")
var code = await conn.groupRevokeInvite(from) 
env("Link do grupo resetado 🔃") 
break 

case 'linkgp': case 'linkgrupo':{
if (!isGroup) return env("*Epa! Comando feito apenas para a Administração*")
if (!isMemberAdmin) return env("*Epa! Comando feito apenas para a Administração*")
if (!isBotAdm) return env("Bot não está como adm")
var responseed = await conn.groupInviteCode(from)
conn.sendMessage(from, {text: `https://chat.whatsapp.com/${responseed}\n\nLink do grupo: ${groupMetadata.subject}`}, {quoted: mek, detectLink: true })
}
break

case 'Join': 
case 'join': { 
if (isOwner) return env('*Você tá sabendo demais!*') 
if (!text) return env('Cade o link do grupo.?') 
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return env('Link inválido ❌') 
var result = args[0].split('https://chat.whatsapp.com/')[1] 
await conn.groupAcceptInvite(result).then((res) => console.log(jsonformat(res))).catch((err) => console.log(jsonformat(err)))
}
break

case 'descgp': case 'setdesc': {
if (!isMemberAdmin) return  env("Epa Epa Epa! apenas a Administração ")
if (!isGroup) return env("[❗] Comando feito apenas em Grupos")
if (!text) return env( 'Cadê a descrição?')
await conn.groupUpdateDescription(from, text)
env('Descricão do grupo foi alterada')
}
break

case "tmgp": 
case "tmgrupo": {
if (isOwner) return env("so meu dono")
if (!args.join(" ")) return env(`kd o texto amiguinho?`)
const tm = args.join(' ')
let getGroups = await conn.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
env(`*𝙀𝙣𝙫𝙞𝙖𝙣𝙙𝙤 𝙖 ${anu.length} 𝙜𝙧𝙪𝙥𝙤𝙨`)
for (let i of anu) {
await delay(1500)
templateMessago = {
video: {url: './database/videos/tmgp.mp4', gifPlayback: true, 
quoted: mek},
caption: tm,
footer: 'transmissão',
//templateButtons: templateButtons
}
conn.sendMessage(i, templateMessago)
}
env("✔️pronto...")
}
break

case 'nomegp':
if (!isMemberAdmin) return env("Comando apenas para a Administração") 
if (!isGroup) return env("apenas en Grupos") 
if (!text) return env("Cadê o Nome do Grupo?") 
await conn.groupUpdateSubject(from, text)
env('*Nome do Grupo alterado com sucesso*')
break

case 'totag': {
if (!isGroup) return env('[❗] Comando feito apenas em Grupos')
if (!text) return env('Marcar o que?')
if (!isMemberAdmin) return env('*Epa! Comando feito apenas para a Administração*')
conn.sendMessage(from, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: mek })
}
break

case 'marcar': {
if (!isMemberAdmin) return env("Epa! Comando apenas para a administração") 
if (!text) return env(`╭───────────⪧
Acorda rebanho 🦬
╰────────────⪧`) 
conn.sendMessage(from, {text : q ? q : '', mentions: participants.map(a => a.id)}, { 
quoted: mek}) 
}
break 

case 'marcar2': 
if (!isMemberAdmin) return env("Comando apenas para a Administração") 
members_id = [] 
tesks = (args.length > 1 ) ? body.slice(9).trim() : '' 
tesks += '\n\n' 
for (let mem of groupMembers) { 
tesks += ` => @${mem.id.split("@")[0]}\n` 
members_id.push(mem.id) 
}
env(tesks)
break

case 'rebaixar': case 'demote': 
if (!isGroup) return env('*🚫 Recursos Apenas para grupos*')
if (!isMemberAdmin) return env('Você precisa ser adm')
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return env('Marque ou responda a mensagem de quem você quer tirar de admin')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0] ? mek.message.extendedTextMessage.contextInfo.mentionedJid[0] : mek.message.extendedTextMessage.contextInfo.participant
let responsepm = await conn.groupParticipantsUpdate(from, [mentioned], 'demote')
if (responsepm[0].status === "406") conn.sendMessage(from, {text: `@${mentioned.split("@")[0]} criou esse grupo e não pode ser removido(a) da lista de admins.️`, mentions: [mentioned, sender], contextInfo:{forwardingScore:999, isForwarded:true}})
else if (responsepm[0].status === "200") conn.sendMessage(from, {text: `@${mentioned.split("@")[0]} Não é mais um admin`, mentions: [mentioned, sender], contextInfo:{forwardingScore:999, isForwarded:true}})
else if (responsepm[0].status === "404") conn.sendMessage(from, {text: `@${mentioned.split("@")[0]} não ta no grupo️`, mentions: [mentioned, sender], contextInfo:{forwardingScore:999, isForwarded:true}})
else conn.sendMessage(from, {text: `Parece que deu erro️`, mentions: [sender], contextInfo:{forwardingScore:999, isForwarded:true}})
break

case 'promover': case 'promote': case 'pm': 
if (!isGroup) return env('*🚫 Recursos Apenas para grupos*')
if (!isMemberAdmin) return env('Você precisa ser adm')
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return env('Marque ou responda a mensagem de quem você quer promover')
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0] ? mek.message.extendedTextMessage.contextInfo.mentionedJid[0] : mek.message.extendedTextMessage.contextInfo.participant
let responsedm = await conn.groupParticipantsUpdate(from, [mentioned], 'promote')
if (responsedm[0].status === "200") conn.sendMessage(from, {text: `@${mentioned.split("@")[0]} É o novo adm do gp️`, mentions: [mentioned, sender], contextInfo:{forwardingScore:999, isForwarded:true}})
else if (responsedm[0].status === "404") conn.sendMessage(from, {text: `@${mentioned.split("@")[0]} não ta no grupo️`, mentions: [mentioned, sender], contextInfo:{forwardingScore:999, isForwarded:true}})
else conn.sendMessage(from, {text: `Parece que deu erro️`, mentions: [sender], contextInfo:{forwardingScore:999, isForwarded:true}})
break

case 'open':
case 'abrir': 
if (!isMemberAdmin) return env("Apenas Administração do grupo") 
await conn.groupSettingUpdate(from, 'not_announcement') 
env(`${pushname} Acabou de abrir o grupo com sucesso ✔`)
break

case 'close': 
case 'fechar': 
if (!isMemberAdmin) return env("Apenas Administração do grupo") 
await conn.groupSettingUpdate(from, 'announcement') 
env(`${pushname} acabou de fechar o grupo com sucesso ✔`)
break

case 'regras': 
if (!isGroup) return env('[❗] Comando feito apenas em Grupos ')
env(`Regras do grupo: ${groupMetadata.subject} \n${groupMetadata.desc}`)
break 

//===[Comando de antis]===\\ 

case 'antilink': 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos") 
if (!isMemberAdmin) return env("Apenas a Administração do grupo") 
if (args.length < 1) return env("Digite: antilink 1 para ativar") 
if (Number(args[0]) === 1) { 
if (!isAntiLink) return env(` 「 *Aviso Importante! 🚫* 」

Gostaríamos de informar a todos que o recurso de antilink foi ativado neste grupo. A partir de agora, apenas os administradores têm permissão para compartilhar links. 🔒`) 
antilink.push(from) 
fs.writeFileSync('./database/ativacoes/antilink.json', JSON.stringify(antilink)) 
env(`「 *Aviso Importante! 🚫* 」

Gostaríamos de informar a todos que o recurso de antilink foi ativado neste grupo. A partir de agora, apenas os administradores têm permissão para compartilhar links. `) 
} else if (Number(args[0]) === 0) {
antilink.splice(from, 1) 
fs.writeFileSync('./database/ativacoes/antilink.json', JSON.stringify(antilink))  
env("Antilink Desativado") 
} else { 
env("1 para ativar, 0 para desativar") 
} 
break

case 'simih2':
if (!isMemberAdmin) return env("adms?")
if (args.length < 1) return env('Hmmmm')
if (Number(args[0]) === 1) {
if (isSimi2) return env('O modo Simi está ativo')
samih2.push(from)
fs.writeFileSync('./database/ativacoes/simi.json', JSON.stringify(samih2))
env('Ativado com sucesso o modo simi neste grupo, Esse simi ele funciona na forma que vocês estão falando.')
} else if (Number(args[0]) === 0) {
if(!isSimi2) return env('Já está Desativado.')
samih2.splice(from, 1)
fs.writeFileSync('./database/ativacoes/simi.json', JSON.stringify(samih2))
env('Desativado modo simi com sucesso neste grupo 😡️')
} else {
env('1 para ativar, 0 para desativar, lerdao vc em')
}
break

case 'antiimg': 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos") 
if (!isMemberAdmin) return env("Apenas a Administração do grupo") 
if (args.length < 1) return env("Digite: antiimg 1 para ativar") 
if (Number(args[0]) === 1) { 
if (!isAntiImg) return env(` 「 *Aviso Importante! 🚫* 」

Gostaríamos de informar a todos que o recurso de antiimg foi ativado neste grupo. A partir de agora, apenas os administradores têm permissão para compartilhar fotos. 🔒`) 
antiimg.push(from) 
fs.writeFileSync('./database/ativacoes/antiimg.json', JSON.stringify(antiimg)) 
env(`「 *Aviso Importante! 🚫* 」

Gostaríamos de informar a todos que o recurso de antiimg foi ativado neste grupo. A partir de agora, apenas os administradores têm permissão para compartilhar links. `) 
} else if (Number(args[0]) === 0) {
antiimg.splice(from, 1) 
fs.writeFileSync('./database/ativacoes/antiimg.json', JSON.stringify(antiimg))  
env("antiimg Desativado") 
} else { 
env("1 para ativar, 0 para desativar") 
} 
break

case 'antiaudio': 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos") 
if (!isMemberAdmin) return env("Apenas a Administração do grupo") 
if (args.length < 1) return env("Digite: antiaudio1 para ativar") 
if (Number(args[0]) === 1) { 
if (!isAntiAudio) return env(` 「 *Aviso Importante! 🚫* 」

Gostaríamos de informar a todos que o recurso de antiaudio foi ativado neste grupo. A partir de agora, apenas os administradores têm permissão para compartilhar áudios. 🔒`) 
antiaudio.push(from) 
fs.writeFileSync('./database/ativacoes/antiaudio.json', JSON.stringify(antiaudio)) 
env(`「 *Aviso Importante! 🚫* 」

Gostaríamos de informar a todos que o recurso de antiaudiofoi ativado neste grupo. A partir de agora, apenas os administradores têm permissão para compartilhar links. `) 
} else if (Number(args[0]) === 0) {
antiaudio.splice(from, 1) 
fs.writeFileSync('./database/ativacoes/antiaudio.json', JSON.stringify(antiaudio))  
env("antiaudioDesativado") 
} else { 
env("1 para ativar, 0 para desativar") 
} 
break

case 'antivideo': 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos") 
if (!isMemberAdmin) return env("Apenas a Administração do grupo") 
if (args.length < 1) return env("Digite: antivideo 1 para ativar") 
if (Number(args[0]) === 1) { 
if (!isAntiVideo) return env(` 「 *Aviso Importante! 🚫* 」

Gostaríamos de informar a todos que o recurso de antivideo foi ativado neste grupo. A partir de agora, apenas os administradores têm permissão para compartilhar vídeos. 🔒`) 
antivideo.push(from) 
fs.writeFileSync('./database/ativacoes/antivideo.json', JSON.stringify(antivideo)) 
env(`「 *Aviso Importante! 🚫* 」

Gostaríamos de informar a todos que o recurso de antivideo foi ativado neste grupo. A partir de agora, apenas os administradores têm permissão para compartilhar vídeos. `) 
} else if (Number(args[0]) === 0) {
antivideo.splice(from, 1) 
fs.writeFileSync('./database/ativacoes/antivideo.json', JSON.stringify(antivideo))  
env("antivideo Desativado") 
} else { 
env("1 para ativar, 0 para desativar") 
} 
break

case 'antipala': 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos") 
if (!isMemberAdmin) return env("Apenas a Administração do grupo ") 
if (args.length < 1) return env("Digite .antipala 1 para ativar!") 
if (Number(args[0]) === 1) {
if (!isAntiPala) return env("Anti-palavrão acabou de ser ativo") 
antipala.push(from) 
fs.writeFileSync('./database/ativacoes/antipalavrao.json', JSON.stringify(antipala)) 
env(`Atenção! 🚫
Queremos comunicar que o recurso de anti-palavrões foi ativado neste grupo. A partir deste momento, não serão tolerados palavrões ou linguagem ofensiva. Mantemos este ambiente respeitoso e amigável para todos os membros.`) 
} else if (Number(args[0]) === 0) {
antipala.splice(from, 1) 
fs.writeFileSync('./database/ativacoes/antipalavrao.json', JSON.stringify(antipala)) 
env("Anti-Palavrão Desabilitado ❌")
} else {
env(" 1 para ativar, 0 para desativar, bobão você também em 🙄 ") 
}
break

case 'bemvindo': 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos") 
if (!isMemberAdmin) return env("Apenas a Administração do grupo") 
if (args.length < 1) return env("Digite: bemvindo 1 para ativar") 
if (Number(args[0]) === 1) { 
if (!isBemVindo) return env("Bem-vindo ativado.") 
bemvindo.push(from) 
fs.writeFileSync('./database/ativacoes/bemvindo.json', JSON.stringify(bemvindo)) 
env('bemvindo acabou de ser ativado ✔️') 
} else if (Number(args[0]) === 0) {
bemvindo.splice(from, 1) 
fs.writeFileSync('./database/ativacoes/bemvindo.json', JSON.stringify(bemvindo))  
env("bemvindo Desativado") 
} else { 
env("1 para ativar, 0 para desativar") 
} 
break

case 'toimg':
if (!isQuotedSticker) return env('Marque uma figurinha')
buff = await getFileBuffer(mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
try {
conn.sendMessage(from, {image: buff}, {quoted: mek})
} catch(e) {
console.log(e)
env('erro...')
}
break

//===[Comando de download]===\\

case 'tiktok': 
if(!q) return env("Ei, Cadê o Link?")
if (!q.includes('tiktok')) return env(`Ei, So Link do TikTok 😮‍💨`)
env("calma la")
tik = await fetchJson(`https://marcos025.onrender.com/api/dl/tiktok?link=${q}&apikey=yOCSpNOwKw`)
ti = await getBuffer(tik.resultado.videoSemWt)
conn.sendMessage(from, {video: ti, caption: ""},{quoted: mek}) 
break

case "tiktok2": {
    if (q.length < 1) return env("Por favor, coloque o link do vídeo após o comando.");
    env("Já to enviando")
    const url = q;
    const apiUrl = `https://clover-t-bot.onrender.com/download/tiktok?url=${url}&key=924116&username=Smoke11`;
    fetch(apiUrl)
.then(response => response.json())
.then(data => {
    if (data.videoSemWt) {
conn.sendMessage(from, {
    audio: { url: data.audio },
    mimetype: 'audio/mpeg'
});
    } else {
     env("Não foi possível obter o vídeo. Verifique o link e tente novamente.");
    }
})
.catch(error => {
    console.error(error);
    return env("Ocorreu um erro ao processar o pedido. Tente novamente mais tarde.");
});
} break

case 'play': 
if (!isGroup) return env("*❌ Recurso disponível apenas para grupos ❌*") 
env(`
「 sᴇ ϙᴜɪsᴇʀ ғᴀᴢᴇʀ ᴅᴏᴡɴʟᴏᴀᴅ ᴅᴇ ᴜᴍᴀ ᴍɪᴅɪᴀ ᴜsᴇ 」

*-𝙥𝙡𝙖𝙮𝙖𝙪𝙙𝙞𝙤 -𝙣𝙤𝙢𝙚 𝙙𝙖 música* 

𝗢𝘂

*-𝗽𝗹𝗮𝘆𝘃𝗶𝗱𝗲𝗼 -𝗻𝗼𝗺𝗲 𝗱𝗼 𝘃𝗶𝗱𝗲𝗼* 
`) 
break

case "play1":
  case 'play': 
  if (!q) return env('Coloque o nome da musica também')
env("𝙹𝚊 𝚃𝚘 𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘...") 
fetch(`https://clover-t-bot.onrender.com/yt/playmp4?query=${q}&key=924116&username=Smoke11`).then(response => response.json()).then(ytbr => {

 conn.sendMessage(from,{image:{url:`${ytbr.thumb}`}, caption: `👤 *Nome* ${ytbr.title}\n 🎥 *Canal:*${ytbr.channel}\n👀 *Views:* ${ytbr.views}`}, {quoted: selo2})

 conn.sendMessage(from, { audio: { url: ytbr.url }, mimetype: 'audio/mpeg' }, {quoted: selo2})

})

  break

case 'playvideo': 
env("*Calma ae Jajá to enviando 😉*") 
playvid = args.join(" ") 
anu = await fetchJson(`https://p7api.xyz/api/ytplaymp4?nome=${playvid}&apikey=6bb2f5-22a158-0441f9-6b4308-115f0f`)
anu = anu.resultado
pla = ` 
👁️‍🗨️ *Visualizações:* ${anu.visualizações} 
 _Aguarde um momentinho._`

img = await getBuffer(anu.thumb) 
conn.sendMessage(from, {image: img, caption: `${pla}` }, {quoted: selo}) 
conn.sendMessage(from, { video: {url: anu.url }, mimetype: 'video/mp4', fileName: `${anu.título}.mp4` }, {quoted: selo})
break

//=====[COMANDOS DE ALTERAR AUDIO]=====\\

case 'esquilo':
if (!isQuotedAudio) return env('Marque um áudio')
env("calma")
muk = isQuotedAudio ? mek.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage : mek.message.audioMessage
rane = getRandom('.'+await getExtension(muk.mimetype))
buffimg = await getFileBuffer(muk, 'audio')
fs.writeFileSync(rane, buffimg)
gem = rane
rane = getRandom('.mp3')
exec(`ffmpeg -i ${gem} -filter:a "atempo=0.7,asetrate=65100" ${rane}`, (err, stderr, stdout) => {
fs.unlinkSync(gem)
hah = fs.readFileSync(ran)
conn.sendMessage(from, {audio: hah, mimetype: 'audio/mp4', ptt:true}, {quoted: mek})
fs.unlinkSync(ran)
})
break


//===[Comando diversos]===\\
case 'roleta': case 'Roleta': 
					if (!isGroup) return env('[❗] Comando feito apenas em Grupos')
                   rate = body.slice(6)
					var foda =['🍇','🍌','🍍','🍎','🥕','🥑','🥦']
					var keyse = foda[Math.floor(Math.random() * foda.length)]
					var fda =['🍇','🍌','🍍','🍎','🥕','🥑','🥦']
					var hesteia = fda[Math.floor(Math.random() * foda.length)]
					var fodu =['🍇','🍌','🍍','🍎','🥕','🥑','🥦']
					var alemanha = fodu[Math.floor(Math.random() * foda.length)]
                    env(`
╔────── ¤ ◎ 𐂡 ◎ ¤ ──────╗
┃             R O L E T A
┃
┃ ${keyse} ${hesteia} ${alemanha} <=
┃
┃  Parabéns por sua pontuação 
╚────── ¤ ◎ 𐂡 ◎ ¤ ──────╝ `)

					break 
					
					

case 'roleta2':	

					if (!isGroup) return env('*❌ Recurso disponível apenas para grupos ❌*')
                   rate = body.slice(6)
					var foda =['🦆', '😸', '🙈', '🐈', '🐢', '🐣', '🐷']
					var keyse = foda[Math.floor(Math.random() * foda.length)]
					var fda =['🦆', '😸', '🙈', '🐈', '🐢', '🐣', '🐷']
					var hesteia = fda[Math.floor(Math.random() * foda.length)]
					var fodu =['🦆', '😸', '🙈', '🐈', '🐢', '🐣', '🐷']
					var alemanha = fodu[Math.floor(Math.random() * foda.length)]
                    env(`
╔──────「 🎰 」──────╗
┃           R O L E T A
┃
┃ ${keyse} ${hesteia} ${alemanha} <=
┃
┃  Parabéns por sua pontuação 
╚──────「 🎰 」──────╝  `)

					break

case 'cassino': 
if (!isGroup) return env("*❌ Recurso disponível apenas para grupos ❌*") 
const soto = [
'🍊 : 🍒 : 🍐',
'🍒 : 🔔 : 🍊',
'🍇 : 🍇 : 🍇',
'🍊 : 🍋 : 🔔',
'🔔 : 🍒 : 🍐',
'🔔 : 🍒 : 🍊',
'🍊 : 🍋 : ??',		
'🍐 : 🍒 : 🍋',
'🍐 : 🍐 : 🍐',
'🍊 : 🍒 : 🍒',
'🔔 : 🔔 : 🍇',
'🍌 : 🍒 : 🔔',
'🍐 : 🔔 : 🔔',
'🍊 : 🍋 : 🍒',
'🍋 : 🍋 : 🍌',
'🔔 : 🔔 : 🍇',
'🔔 : 🍐 : 🍇',
'🔔 : 🔔 : 🔔',
'🍒 : 🍒 : 🍒',
'🍌 : 🍌 : 🍌'
]		  

const somtoy2 = sotoy[Math.floor(Math.random() * sotoy.length)]
if ((somtoy2 == '🥑 : 🥑 : 🥑') ||(somtoy2 == '🍉 : 🍉 : 🍉') ||(somtoy2 == '🍓 : 🍓 : 🍓') ||(somtoy2 == '🍎 : 🍎 : 🍎') ||(somtoy2 == '🍍 : 🍍 : 🍍') ||(somtoy2 == '🥝 : 🥝 : 🥝') ||(somtoy2 == '🍑 : 🍑 : 🍑') ||(somtoy2 == '🥥 : 🥥 : 🥥') ||(somtoy2 == '🍋 : 🍋 : 🍋') ||(somtoy2 == '🍐 : 🍐 : 🍐') ||(somtoy2 == '🍌 : 🍌 : 🍌') ||(somtoy2 == '🍒 : 🍒 : 🍒') ||(somtoy2 == '🔔 : 🔔 : 🔔') ||(somtoy2 == '🍊 : 🍊 : 🍊') ||(somtoy2 == '🍇 : 🍇 : 🍇')) {
var Vitória = "Você ganhou 🥳" 
} else { 
var Vitória = "Você perdeu" 
}
(from, env( `
╔────── 「 🎰 」──────╗
   ==> ${somtoy2} 
╚────── 「 🎰 」──────╝
*${Vitória} 
`,
mek))
break 

case 'shipo': 
case 'shippo':
case 'Shipo': 
if (!isGroup) return env('*🚫 Recursos Apenas para grupos*')

teks = args.join(" ")
if(teks.length < 10) return env('Marque uma pessoa do grupo para encontrar o par dela')
membrr = []
const suamae111 = groupMembers
const suamae211 = groupMembers
const teupai111 = suamae111[Math.floor(Math.random() * suamae111.length)]
const teupai211 = suamae211[Math.floor(Math.random() * suamae211.length)]
var shipted1 = ["1%", `2%`, `3%`, `4%`, `5%`, `6%`, `7`, `%`, `9%`, `10`, `11%`, `12%`,`13%`, `14%`, `15%`, `16%`, `17%`, `1%`, `19%`, `20%`, `21%`, `22`, `23%`, `24%`, `25%`, `26%`, `27%`, `2%`, `27%`, `2%`, `29%`, `30%`, `31%`, `32%`, `33%`, `34%`, `35%`, `36%`, `37%`, `3%`, `39%`, `40%`, `41%`, `42%`, `43%`, `44%`, `45%`, `46%`, `47%`, `4%`, `49%`, `50%`, `51%`, `52%`, `53%`, `54%`, `55%`, `56%`, `57%`, `5%`, `59%`, `60%`, `61%`, `62%`, `63%`, `64%`, `65%`, `66%`, `67%`, `6%`, `69%`, `70%`, `71%`, `72%`, `73%`, `74%`, `75%`, `76%`, `77%`, `7%`, `79%`, `0%`, `1%`, `2%`, `5%`, `4%`, `5%`, `6%`, `7%`, `%`, `9%`, `90%`, `91%`, `92%`, `93%`, `94%`, `95%`, `96%`, `97%`, `9%`, `99%`, `100%`]
const shiptedd = shipted1[Math.floor(Math.random() * shipted1.length)]
jet = `*Q Fofo, Eu Shipo eles 2*\n\n1 = @${teupai111.id.split('@')[0]}\n && 2 = ${teks} com uma porcentagem de: ${shiptedd}`
membrr.push(teupai111.id)
membrr.push(teupai211.id)
mentions(jet, membrr, true)
break

case 'casal': 
case 'Casal': 
if (!isGroup) return env('*🚫 Recursos Apenas para grupos*')

membr = []
const suamae11 = groupMembers
const suamae21 = groupMembers
const teupai11 = suamae11[Math.floor(Math.random() * suamae11.length)]
const teupai21 = suamae21[Math.floor(Math.random() * suamae21.length)]
var shipted1 = ["1%", `2%`, `3%`, `4%`, `5%`, `6%`, `7`, `%`, `9%`, `10`, `11%`, `12%`,`13%`, `14%`, `15%`, `16%`, `17%`, `1%`, `19%`, `20%`, `21%`, `22`, `23%`, `24%`, `25%`, `26%`, `27%`, `2%`, `27%`, `2%`, `29%`, `30%`, `31%`, `32%`, `33%`, `34%`, `35%`, `36%`, `37%`, `3%`, `39%`, `40%`, `41%`, `42%`, `43%`, `44%`, `45%`, `46%`, `47%`, `4%`, `49%`, `50%`, `51%`, `52%`, `53%`, `54%`, `55%`, `56%`, `57%`, `5%`, `59%`, `60%`, `61%`, `62%`, `63%`, `64%`, `65%`, `66%`, `67%`, `6%`, `69%`, `70%`, `71%`, `72%`, `73%`, `74%`, `75%`, `76%`, `77%`, `7%`, `79%`, `0%`, `1%`, `2%`, `5%`, `4%`, `5%`, `6%`, `7%`, `%`, `9%`, `90%`, `91%`, `92%`, `93%`, `94%`, `95%`, `96%`, `97%`, `9%`, `99%`, `100%`]
const shipted = shipted1[Math.floor(Math.random() * shipted1.length)]
jet = `*Q fofinho, Eu Shipo eles 2*\n\n1= @${teupai11.id.split('@')[0]}\ne esse\n2= @${teupai21.id.split('@')[0]}\ncom uma porcentagem de: ${shipted}`
membr.push(teupai11.id)
membr.push(teupai21.id)
mentions(jet, membr, true)
break

case 'rankgay':
case 'Rankgay': 

if (!isGroup) return env('*🚫 Recursos Apenas para grupos*')

try{
d = []
ret = '🏳️‍🌈 Rank dos mais gays\n'
for(i = 0; i < 5; i++) {
r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
ret += `🏳️‍🌈  @${groupMembers[r].id.split('@')[0]}\n`
d.push(groupMembers[r].id)
}
mentions(ret, d, true)
} catch (e) {
console.log(e)
env('Deu erro, tente novamente :/')
}
break

case 'rankgado': case 'rankgado':
if (!isGroup) return env('*🚫 Recursos Apenas para grupos*')

try{
d = []
ret = '🐂 Rank dos mais cornos do grupo \n'
for(i = 0; i < 5; i++) {
r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
ret += `🐂 @${groupMembers[r].id.split('@')[0]}\n`
d.push(groupMembers[r].id)
}
mentions(ret, d, true)
} catch (e) {
console.log(e)
env('Deu erro, tente novamente :/')
}
break

case 'gift': 
if (args.length === 0) return env("Cadê o código?!") 
if (args[0] == '26457' || args[0] == '2486555' || args[0] == '1528' || args[0] == 'Simonetti') {
env("*Código Resgatado, Você ganhou 5000 level*") 
addLevelingLevel(sender, 5000)
} else { 
env("*Código Inválido 😡!!! Seu safado")
}
break

case 'rankbonito': case 'Rankbonito':

if (!isGroup) return env('*🚫 Recursos Apenas para grupos*')

membr = []
const bonito1 = groupMembers
const bonito2 = groupMembers
const bonito3 = groupMembers
const bonito4 = groupMembers
const bonito5 = groupMembers
const bonitos1 = bonito1[Math.floor(Math.random() * bonito1.length)]
const bonitos2 = bonito2[Math.floor(Math.random() * bonito2.length)]
const bonitos3 = bonito3[Math.floor(Math.random() * bonito3.length)]
const bonitos4 = bonito4[Math.floor(Math.random() * bonito4.length)]
const bonitos5 = bonito5[Math.floor(Math.random() * bonito5.length)]
var porcentagembonito = ["1%", `2%`, `3%`, `4%`, `5%`, `6%`, `7%`, `8%`, `9%`, `10`, `11%`, `12%`,`13%`, `14%`, `15%`, `16%`, `17%`, `1%`, `19%`, `20%`, `21%`, `22`, `23%`, `24%`, `25%`, `26%`, `27%`, `2%`, `27%`, `2%`, `29%`, `30%`, `31%`, `32%`, `33%`, `34%`, `35%`, `36%`, `37%`, `3%`, `39%`, `40%`, `41%`, `42%`, `43%`, `44%`, `45%`, `46%`, `47%`, `4%`, `49%`, `50%`, `51%`, `52%`, `53%`, `54%`, `55%`, `56%`, `57%`, `5%`, `59%`, `60%`, `61%`, `62%`, `63%`, `64%`, `65%`, `66%`, `67%`, `6%`, `69%`, `70%`, `71%`, `72%`, `73%`, `74%`, `75%`, `76%`, `77%`, `7%`, `79%`, `0%`, `1%`, `2%`, `5%`, `4%`, `5%`, `6%`, `7%`, `%`, `9%`, `90%`, `91%`, `92%`, `93%`, `94%`, `95%`, `96%`, `97%`, `9%`, `99%`, `Rank dos mais bonitos do grupo `]
const porcentagemb = porcentagembonito[Math.floor(Math.random() * porcentagembonito.length)]
const porcentag = porcentagembonito[Math.floor(Math.random() * porcentagembonito.length)]
const porcent = porcentagembonito[Math.floor(Math.random() * porcentagembonito.length)]
const porcl = porcentagembonito[Math.floor(Math.random() * porcentagembonito.length)]
const porg = porcentagembonito[Math.floor(Math.random() * porcentagembonito.length)]
const prg = porcentagembonito[Math.floor(Math.random() * porcentagembonito.length)]
ytb = `
╔═════════[🌺]═════════╗
        ╔══════ • ══════╗
        ┠❯ ❒ ᚛ＣｅｃｉＢｏｔ᚜    [🤴]
        ╚══════ • ══════╝
╚═════════[🌺]═════════╝

「 Top 5 mais bonitos do grupo ${groupMetadata.subject}\n 」

@${bonitos1.id.split('@')[0]}\nCom uma porcentagem de ${porcent}\n
@${bonitos2.id.split('@')[0]}\nCom uma porcentagem de ${porcentag}\n
@${bonitos3.id.split('@')[0]}\nCom uma porcentagem de ${porcl}\n
@${bonitos4.id.split('@')[0]}\nCom uma porcentagem de ${porg}\n
@${bonitos5.id.split('@')[0]}\nCom uma porcentagem de ${prg}\n\n`
membr.push(bonitos1.id)
membr.push(bonitos2.id)
membr.push(bonitos3.id)
membr.push(bonitos4.id)
membr.push(bonitos5.id)
mentions(ytb, membr, true)
break

case 'rankcorno': case 'Rankcorno':

if (!isGroup) return env('*🚫 Recursos Apenas para grupos*')

membr = []
const corno1 = groupMembers
const corno2 = groupMembers
const corno3 = groupMembers
const corno4 = groupMembers
const corno5 = groupMembers
const cornos1 = corno1[Math.floor(Math.random() * corno1.length)]
const cornos2 = corno2[Math.floor(Math.random() * corno2.length)]
const cornos3 = corno3[Math.floor(Math.random() * corno3.length)]
const cornos4 = corno4[Math.floor(Math.random() * corno4.length)]
const cornos5 = corno5[Math.floor(Math.random() * corno5.length)]
var porcentagemcorno = ["1%", `2%`, `3%`, `4%`, `5%`, `6%`, `7`, `%`, `9%`, `10`, `11%`, `12%`,`13%`, `14%`, `15%`, `16%`, `17%`, `1%`, `19%`, `20%`, `21%`, `22`, `23%`, `24%`, `25%`, `26%`, `27%`, `2%`, `27%`, `2%`, `29%`, `30%`, `31%`, `32%`, `33%`, `34%`, `35%`, `36%`, `37%`, `3%`, `39%`, `40%`, `41%`, `42%`, `43%`, `44%`, `45%`, `46%`, `47%`, `4%`, `49%`, `50%`, `51%`, `52%`, `53%`, `54%`, `55%`, `56%`, `57%`, `5%`, `59%`, `60%`, `61%`, `62%`, `63%`, `64%`, `65%`, `66%`, `67%`, `6%`, `69%`, `70%`, `71%`, `72%`, `73%`, `74%`, `75%`, `76%`, `77%`, `7%`, `79%`, `0%`, `1%`, `2%`, `5%`, `4%`, `5%`, `6%`, `7%`, `%`, `9%`, `90%`, `91%`, `92%`, `93%`, `94%`, `95%`, `96%`, `97%`, `9%`, `99%`, `O chifre desse ai bate na lua ksksksk`]
const porcentagemc = porcentagemcorno[Math.floor(Math.random() * porcentagemcorno.length)]
const porcentagg = porcentagemcorno[Math.floor(Math.random() * porcentagemcorno.length)]
const porcentt = porcentagemcorno[Math.floor(Math.random() * porcentagemcorno.length)]
const porcllr = porcentagemcorno[Math.floor(Math.random() * porcentagemcorno.length)]
const porggr = porcentagemcorno[Math.floor(Math.random() * porcentagemcorno.length)]
const prggr = porcentagemcorno[Math.floor(Math.random() * porcentagemcorno.length)]
ytb = `
╔═════════[🌺]═════════╗
        ╔══════ • ══════╗
        ┠❯ ❒ ᚛ＣｅｃｉＢｏｔ᚜    [🐂]
        ╚══════ • ══════╝
╚═════════[🌺]═════════╝

「 Esses são os cornos do grupo ${groupMetadata.subject}\n 」

@${cornos1.id.split('@')[0]}\nCom uma porcentagem de ${porcentt}\n
@${cornos2.id.split('@')[0]}\nCom uma porcentagem de ${porcentagg}\n
@${cornos3.id.split('@')[0]}\nCom uma porcentagem de ${porcllr}\n
@${cornos4.id.split('@')[0]}\nCom uma porcentagem de ${porggr}\n
@${cornos5.id.split('@')[0]}\nCom uma porcentagem de ${prggr}\n\n⚡ `
membr.push(cornos1.id)
membr.push(cornos2.id)
membr.push(cornos3.id)
membr.push(cornos4.id)
membr.push(cornos5.id)
mentions(ytb, membr, true)
break

case 'simih':
if (!isMemberAdmin) return env("calma")
if (args.length < 1) return env('Hmmmm')
if (Number(args[0]) === 1) {
if (isSimi) return env('O modo Simi está ativo')
samih.push(from)
fs.writeFileSync('./database/usuarios/simi.json', JSON.stringify(samih))
env('Ativado com sucesso o modo simi neste grupo 😗')
} else if (Number(args[0]) === 0) {
if(!isSimi) return env('Já está Desativado.')
samih.splice(from, 1)
fs.writeFileSync('./database/usuarios/simi.json', JSON.stringify(samih))
env('Desativado modo simi com sucesso neste grupo 😡️')
} else {
env('1 para ativar, 0 para desativar, lerdao vc em')
}
break

case 'rankgostoso': case 'Rankgostoso':

if (!isGroup) return env('*🚫 Recursos Apenas para grupos*')

member = []
const p01 = groupMembers
const p02 = groupMembers
const p03 = groupMembers
const p04 = groupMembers
const p05 = groupMembers
const o01 = p01[Math.floor(Math.random() * p01.length)]
const o02 = p02[Math.floor(Math.random() * p02.length)]
const o03 = p03[Math.floor(Math.random() * p03.length)]
const o04 = p04[Math.floor(Math.random() * p04.length)]
const o05 = p05[Math.floor(Math.random() * p05.length)]
luy = `
╔═════════[🌺]═════════╗
        ╔══════ • ══════╗
        ┠❯ ❒ ᚛ＣｅｃｉＢｏｔ᚜    [🤭]
        ╚══════ • ══════╝
╚═════════[🌺]═════════╝

「 Calma ae paizão! Esse é o rank dos mais gostosos do Grupo 」

1° @${o01.id.split('@')[0]}
2° @${o02.id.split('@')[0]}
3° @${o03.id.split('@')[0]}
4° @${o04.id.split('@')[0]}
5° @${o05.id.split('@')[0]} 🤭`
member.push(o01.id)
member.push(o02.id)
member.push(o03.id)
member.push(o04.id)
member.push(o05.id)
mentions(luy, member, true)
break

case 'rankgostosa': case 'Rankgostosa':

if (!isGroup) return env('*🚫 Recursos Apenas para grupos*')

member = []
const p1 = groupMembers
const p2 = groupMembers
const p3 = groupMembers
const p4 = groupMembers
const p5 = groupMembers
const o1 = p1[Math.floor(Math.random() * p1.length)]
const o2 = p2[Math.floor(Math.random() * p2.length)]
const o3 = p3[Math.floor(Math.random() * p3.length)]
const o4 = p4[Math.floor(Math.random() * p4.length)]
const o5 = p5[Math.floor(Math.random() * p5.length)]
luy = `
╔═════════[🌺]═════════╗
        ╔══════ • ══════╗
        ┠❯ ❒ ᚛ＣｅｃｉＢｏｔ᚜    [🍑]
        ╚══════ • ══════╝
╚═════════[🌺]═════════╝

「 Paradas! Essas são as mais Gostosas do Grupo 」

1° @${o1.id.split('@')[0]}
2° @${o2.id.split('@')[0]}
3° @${o3.id.split('@')[0]}
4° @${o4.id.split('@')[0]}
5° @${o5.id.split('@')[0]} 🍑`
member.push(o1.id)
member.push(o2.id)
member.push(o3.id)
member.push(o4.id)
member.push(o5.id)
mentions(luy, member, true)
break

case 'Rankfedidos':
case 'rankfedido': 

if (!isGroup) return env('*🚫 Recursos Apenas para grupos*')


membr = []
const fedorento1 = groupMembers
const fedorento2 = groupMembers
const fedorento3 = groupMembers
const fedorento4 = groupMembers
const fedorento5 = groupMembers
const fedorento6 = groupMembers
const fedorento7 = groupMembers
const fedorento = groupMembers
const fedorento9 = groupMembers
const fedorento10 = groupMembers
const fedorentos1 = fedorento1[Math.floor(Math.random() * fedorento1.length)]
const fedorentos2 = fedorento2[Math.floor(Math.random() * fedorento2.length)]
const fedorentos3 = fedorento3[Math.floor(Math.random() * fedorento3.length)]
const fedorentos4 = fedorento4[Math.floor(Math.random() * fedorento4.length)]
const fedorentos5 = fedorento5[Math.floor(Math.random() * fedorento5.length)]
const fedorentos6 = fedorento6[Math.floor(Math.random() * fedorento6.length)]
const fedorentos7 = fedorento7[Math.floor(Math.random() * fedorento7.length)]
const fedorentos = fedorento[Math.floor(Math.random() * fedorento.length)]
const fedorentos9 = fedorento9[Math.floor(Math.random() * fedorento9.length)]
const fedorentos10 = fedorento10[Math.floor(Math.random() * fedorento10.length)]
ytb = `
╔═════════[🌺]═════════╗
        ╔══════ • ══════╗
        ┠❯ ❒ ᚛ＣｅｃｉＢｏｔ᚜    [🤢]
        ╚══════ • ══════╝
╚═════════[🌺]═════════╝
esses são os fedidos do grupo 🤢

@${fedorentos1.id.split('@')[0]}\n
@${fedorentos2.id.split('@')[0]}\n
@${fedorentos3.id.split('@')[0]}\n
@${fedorentos4.id.split('@')[0]}\n
@${fedorentos5.id.split('@')[0]}\n
@${fedorentos6.id.split('@')[0]}\n
@${fedorentos7.id.split('@')[0]}\n
@${fedorentos.id.split('@')[0]}\n
@${fedorentos9.id.split('@')[0]}\n
@${fedorentos10.id.split('@')[0]}\n\n ${instag}`
membr.push(fedorentos1.id)
membr.push(fedorentos2.id)
membr.push(fedorentos3.id)
membr.push(fedorentos4.id)
membr.push(fedorentos5.id)
membr.push(fedorentos6.id)
membr.push(fedorentos7.id)
membr.push(fedorentos.id)
membr.push(fedorentos9.id)
membr.push(fedorentos10.id)
mentions(ytb, membr, true)
break

case 'Rankotaku':
case 'rankotaku': 

if (!isGroup) return env('*🚫 Recursos Apenas para grupos*')

membr = []
const otaku1 = groupMembers
const otaku2 = groupMembers
const otaku3 = groupMembers
const otaku4 = groupMembers
const otaku5 = groupMembers
const otaku6 = groupMembers
const otaku7 = groupMembers
const otaku = groupMembers
const otaku9 = groupMembers
const otaku10 = groupMembers
const otakus1 = otaku1[Math.floor(Math.random() * otaku1.length)]
const otakus2 = otaku2[Math.floor(Math.random() * otaku2.length)]
const otakus3 = otaku3[Math.floor(Math.random() * otaku3.length)]
const otakus4 = otaku4[Math.floor(Math.random() * otaku4.length)]
const otakus5 = otaku5[Math.floor(Math.random() * otaku5.length)]
const otakus6 = otaku6[Math.floor(Math.random() * otaku6.length)]
const otakus7 = otaku7[Math.floor(Math.random() * otaku7.length)]
const otakus = otaku[Math.floor(Math.random() * otaku.length)]
const otakus9 = otaku9[Math.floor(Math.random() * otaku9.length)]
const otakus10 = otaku10[Math.floor(Math.random() * otaku10.length)]
ytb = `
╔═════════[🌺]═════════╗
        ╔══════ • ══════╗
        ┠❯ ❒ ᚛ＣｅｃｉＢｏｔ᚜    [🍥]
        ╚══════ • ══════╝
╚═════════[🌺]═════════╝
esses são os fedorentos do grupo\n 
@${otakus1.id.split('@')[0]}\n 
@${otakus2.id.split('@')[0]}\n  
@${otakus3.id.split('@')[0]}\n  
@${otakus4.id.split('@')[0]}\n 
@${otakus5.id.split('@')[0]}\n 
@${otakus6.id.split('@')[0]}\n  
@${otakus7.id.split('@')[0]}\n  
@${otakus.id.split('@')[0]}\n  
@${otakus9.id.split('@')[0]}\n
@${otakus10.id.split('@')[0]}\n\n ${instag}`
membr.push(otakus1.id)
membr.push(otakus2.id)
membr.push(otakus3.id)
membr.push(otakus4.id)
membr.push(otakus5.id)
membr.push(otakus6.id)
membr.push(otakus7.id)
membr.push(otakus.id)
membr.push(otakus9.id)
membr.push(otakus10.id)
mentions(ytb, membr, true)
break

case 'rankpau':
case 'Rankpau': 

if (!isGroup) return env('*🚫 Recursos Apenas para grupos*')

membr = []
const pauz1 = groupMembers
const pauz2 = groupMembers
const pauz3 = groupMembers
const pauz4 = groupMembers
const pauz5 = groupMembers
const paus1 = pauz1[Math.floor(Math.random() * pauz1.length)]
const paus2 = pauz2[Math.floor(Math.random() * pauz2.length)]
const paus3 = pauz3[Math.floor(Math.random() * pauz3.length)]
const paus4 = pauz4[Math.floor(Math.random() * pauz4.length)]
const paus5 = pauz5[Math.floor(Math.random() * pauz5.length)]
var pcpau1 = ["Dedo minúsculo", `Pequenino`, `Pequeno`, `Médio`, `Grandinho`, `Grande`, `Grandão`, `Gigante`, `Gigantesco`, `Enorme`, `Passando das Nuvens `]
var pcpau2 = ["Minuscúlo", `Pequenino`, `Pequeno`, `Médio`, `Grandinho`, `Grande`, `Grandão`, `Gigante`, `Gigantesco`, `Enorme`, `passando das Nuvens `]
var pcpau3 = ["Minuscúlo", `Pequenino`, `Pequeno`, `Médio`, `Grandinho`, `Grande`, `Grandão`, `Gigante`, `Gigantesco`, `Enorme`, `passando das Nuvens `]
var pcpau4 = ["Minuscúlo", `Pequenino`, `Pequeno`, `Médio`, `Grandinho`, `Grande`, `Grandão`, `Gigante`, `Gigantesco`, `Enorme`, `passando das Nuvens `]
var pcpau5 = ["Minuscúlo", `Pequenino`, `Pequeno`, `Médio`, `Grandinho`, `Grande`, `Grandão`, `Gigante`, `Gigantesco`, `Enorme`, `passando das Nuvens`]
const pc1 = pcpau1[Math.floor(Math.random() * pcpau1.length)]
const pc2 = pcpau2[Math.floor(Math.random() * pcpau2.length)]
const pc3 = pcpau3[Math.floor(Math.random() * pcpau3.length)]
const pc4 = pcpau4[Math.floor(Math.random() * pcpau4.length)]
const pc5 = pcpau5[Math.floor(Math.random() * pcpau5.length)]
pdr = `Esses são os caras com o menor e maior pau do Grupo\n${groupMetadata.subject}\n\n@${paus1.id.split('@')[0]}\n${pc1}\n@${paus2.id.split('@')[0]}\n${pc2}\n@${paus3.id.split('@')[0]}\n${pc3}\n@${paus4.id.split('@')[0]}\n${pc4}\n@${paus5.id.split('@')[0]}\n${pc5}\n\n ${BotName}`
membr.push(paus1.id)
membr.push(paus2.id)
membr.push(paus3.id)
membr.push(paus4.id)
membr.push(paus5.id)
mentions(pdr, membr, true)
break 

case 'ranknazista':
case 'Ranknazista':

if (!isGroup) return env('*🚫 Recursos Apenas para grupos*')

membr = []
const nazista1 = groupMembers
const nazista2 = groupMembers
const nazista3 = groupMembers
const nazista4 = groupMembers
const nazista5 = groupMembers
const nazistas1 = nazista1[Math.floor(Math.random() * nazista1.length)]
const nazistas2 = nazista2[Math.floor(Math.random() * nazista2.length)]
const nazistas3 = nazista3[Math.floor(Math.random() * nazista3.length)]
const nazistas4 = nazista4[Math.floor(Math.random() * nazista4.length)]
const nazistas5 = nazista5[Math.floor(Math.random() * nazista5.length)]
var porcentagemnazista = ["1%", `2%`, `3%`, `4%`, `5%`, `6%`, `7`, `%`, `9%`, `10`, `11%`, `12%`,`13%`, `14%`, `15%`, `16%`, `17%`, `1%`, `19%`, `20%`, `21%`, `22`, `23%`, `24%`, `25%`, `26%`, `27%`, `2%`, `27%`, `2%`, `29%`, `30%`, `31%`, `32%`, `33%`, `34%`, `35%`, `36%`, `37%`, `3%`, `39%`, `40%`, `41%`, `42%`, `43%`, `44%`, `45%`, `46%`, `47%`, `4%`, `49%`, `50%`, `51%`, `52%`, `53%`, `54%`, `55%`, `56%`, `57%`, `5%`, `59%`, `60%`, `61%`, `62%`, `63%`, `64%`, `65%`, `66%`, `67%`, `6%`, `69%`, `70%`, `71%`, `72%`, `73%`, `74%`, `75%`, `76%`, `77%`, `7%`, `79%`, `0%`, `1%`, `2%`, `5%`, `4%`, `5%`, `6%`, `7%`, `%`, `9%`, `90%`, `91%`, `92%`, `93%`, `94%`, `95%`, `96%`, `97%`, `9%`, `99%`, `O chifre desse ai bate na lua ksksksk`]
const porcentagem = porcentagemnazista[Math.floor(Math.random() * porcentagemnazista.length)]
const porcenn = porcentagemnazista[Math.floor(Math.random() * porcentagemnazista.length)]
const porcents = porcentagemnazista[Math.floor(Math.random() * porcentagemnazista.length)]
const porcll = porcentagemnazista[Math.floor(Math.random() * porcentagemnazista.length)]
const porgg = porcentagemnazista[Math.floor(Math.random() * porcentagemnazista.length)]
const prgg = porcentagemnazista[Math.floor(Math.random() * porcentagemnazista.length)]
ytb = `
╔═════════[🌺]═════════╗
        ╔══════ • ══════╗
        ┠❯ ❒ ᚛ＣｅｃｉＢｏｔ᚜    [🙋]
        ╚══════ • ══════╝
╚═════════[🌺]═════════╝
Esses são os nazistas do grupo ${groupMetadata.subject}\n🇮🇲
@${nazistas1.id.split('@')[0]}\nCom uma porcentagem de ${porcents}\n🇮🇲
@${nazistas2.id.split('@')[0]}\nCom uma porcentagem de ${porcenn}\n🇮🇲
@${nazistas3.id.split('@')[0]}\nCom uma porcentagem de ${porcll}\n🇮🇲
@${nazistas4.id.split('@')[0]}\nCom uma porcentagem de ${porgg}\n🇮🇲
@${nazistas5.id.split('@')[0]}\nCom uma porcentagem de ${prgg}\n\n⚡${BotName}`
membr.push(nazistas1.id)
membr.push(nazistas2.id)
membr.push(nazistas3.id)
membr.push(nazistas4.id)
membr.push(nazistas5.id)
mentions(ytb, membr, true)
break

case 'pau': 
case 'Pau':
random = `${Math.floor(Math.random() * 35)}` 
const tamanho = random
if (tamanho < 13 ) {pp = 'só o corinho 😳'} else if (tamanho == 13 ) {pp = 'passou do kid beng...'} else if (tamanho == 14 ) {pp = 'passou da média'} else if (tamanho == 15 ) {pp = 'eita peste, vai pegar manga?'} else if (tamanho == 16 ) {pp = 'Chegou nas nuvens '} else if (tamanho == 17 ) {pp = 'calma, a mina não é um poço 😈😳'} else if (tamanho == 18 ) {pp = 'calma man, a mina não é um poço😳'} else if (tamanho == 19 ) {pp = 'calma man, a mina não é um poço😳'} else if (tamanho == 20 ) {pp = 'você tem um poste no meio das pernas'} else if (tamanho == 21 ) {pp = 'você tem um poste no meio das pernas'} else if (tamanho == 22 ) {pp = 'você tem um poste no meio das pernas'} else if (tamanho == 23 ) {pp = 'você tem um poste no meio das pernas'} else if (tamanho == 24 ) {pp = 'você tem um poste ai? rs'} else if (tamanho > 25 ) {pp = 'oq vai procurar com isso? 😳😈'
}
seloko = `SEU PIU PIU TEM ${random}CM\n${pp}` 
env(seloko)
break

case 'morte': 
rate = body.slice(6)
var kkkk = [ '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','88','88','89','90','91','92','93','94','95','96','99','99','99','100','101','102','103','104','105','106','107','108','109','110','111','112','113','114','115','116','117','118','119','120' ] 
  var kkkm = kkkk[Math.floor(Math.random () * kkkk.length)] 
  env(`
┏━━━━━━[『 Sua Morte 』]━━━━━▷
┃•  *Diante meus Cálculos* ☝️🤓
┃•  *Você vai morrer com: ${kkkm} anos*
┗━━━━[ ☠️ ]━━━━━━▷
`)
break

case 'beijo': 
if (!isGroup) return env('"[❗] Comando feito apenas em Grupos') 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0] ? mek.message.extendedTextMessage.contextInfo.mentionedJid[0] : mek.message.extendedTextMessage.contextInfo.participant
const beijo = [`Atacante 🔥! @${sender.split('@')[0]} deu um beijão em @${mentioned.split('@')[0]}, o cara é brabo 🤭`, `Ave Maria 😦. @${sender.split('@')[0]} deu uma linguada no (a) @${mentioned.split('@')[0]} 😈🔥`, `ELE FEZ DENOVO!!! @${sender.split('@')[0]} deu uma beijoca em @${mentioned.split('@')[0]} 😈💦`, `@${sender.split('@')[0]} deu uma beiçada em @${mentioned.split('@')[0]}, calma campeão 🤭`]
eitapeste = beijo[Math.floor(Math.random () * beijo.length)]
conn.sendMessage(from, {video: fs.readFileSync('./database/videos/beijo.mp4'), gifPlayback: true, caption: eitapeste})
break

case 'chute': 
if (!isGroup) return env('[❗] Comando feito apenas em Grupos') 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0] ? mek.message.extendedTextMessage.contextInfo.mentionedJid[0] : mek.message.extendedTextMessage.contextInfo.participant
chute = `Eita peste! @${sender.split('@')[0]} deu uma bicuda em @${mentioned.split('@')[0]} 😨`
conn.sendMessage(from, {video: fs.readFileSync('./database/videos/chute.mp4'), gifPlayback: true, caption: chute})
break

case 'tapa': 
if (!isGroup) return env('[❗] Comando feito apenas em Grupos') 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0] ? mek.message.extendedTextMessage.contextInfo.mentionedJid[0] : mek.message.extendedTextMessage.contextInfo.participant
tapinha = [`Eita 🤭😈! @${sender.split('@')[0]} deu um tapa em @${mentioned.split('@')[0]}, eu não deixava 🤭😈`, `VISH, ${sender.split('@')[0]} deu um tapa na cavala em ${mentioned.split('@')[0]}`, `${sender.split('@')[0]} Deu um tapa na gostosa ${mentioned.split('@')[0]}`]
const papaleg  = tapinha[Math.floor(Math.random () * tapinha.length)]
conn.sendMessage(from, {video: fs.readFileSync('./database/videos/tapa.mp4'), gifPlayback: true, caption: papaleg})
break

case 'calculadora': case 'calcular':  case 'calc':
rsp = q.replace("x", "*").replace('"', ":").replace(new RegExp("[()abcdefghijklmnopqrstwuvxyz]", "gi"), "").replace("÷", "/")
return env(JSON.stringify(eval(`${rsp}`,null,'\t')))
break 

case 'reagir': 
if (!q) return env(`Digite o emoji para o bot reagir, exemplo: ${prefixobot + command} 🦦`) 
const reactionMessage = { 
react: { 
    text: q, 
     key: mek.key 
     }} 
     conn.sendMessage(from, reactionMessage)
break

case "ppt":
if (args.length < 1) return env(`Você deve digitar ${prefixobot}ppt pedra, ${prefixobot}ppt papel ou ${prefixobot}ppt tesoura`)
ppt = ["pedra", "papel", "tesoura"]
ppy = ppt[Math.floor(Math.random() * ppt.length)]
ppg = Math.floor(Math.random() * 1) + 10
pptb = ppy
if ((pptb == "pedra" && args == "papel") ||
(pptb == "papel" && args == "tesoura") ||
(pptb == "tesoura" && args == "pedra")) {
var vit = "vitoria"
} else if ((pptb == "pedra" && args == "tesoura") ||
(pptb == "papel" && args == "pedra") ||
(pptb == "tesoura" && args == "papel")) {
var vit = "derrota"
} else if ((pptb == "pedra" && args == "pedra") ||
(pptb == "papel" && args == "papel") ||
(pptb == "tesoura" && args == "tesoura")) {
var vit = "empate"
} else if (vit = "undefined") {
return env(`Você deve digitar ${prefixobot}ppt pedra, ${prefixobot}ppt papel ou ${prefixobot}ppt tesoura`)
}
if (vit == "vitoria") {
var tes = "Você ganhou 🎉"
}
if (vit == "derrota") {
var tes = "Bot ganhou"
}
if (vit == "empate") {
var tes = "Deu empate 🌟"
}
env(`${BotName} jogou: ${pptb}\nO jogador jogou: ${args}\n\n${tes}`)
if (tes == "Vitória do jogador") {
env(pph)
}
break


case 'cartafof':
if (!isGroup) return enviar('[❗] Comando feito apenas em Grupos')
txt = body.slice(11)
txtt = args.join(" ")
txt1 = txt.split('/')[0];
txt2 = txtt.split("/")[1];
if (!txt) return env('Exemplo: -cartafof +557499237652/oi linda ')
if (!txtt) return env('Exemplo: -cartafof +557499237652/oi linda')
if (txt.includes('-')) return env("Exemplo: -cartafof +557499237652/oi linda ")
if (!txtt.includes('+')) return env('Exemplo: -cartafof +557499237652/oi linda')
if (!txtt.includes('/')) return env(`Exemplo: ${prefixobot + command} 557499237652/Oi linda`)
cla = 
`
CORREIO 📮

ALGUÉM TE MANDOU UMA MENSAGEM ☺️.
Mensagem: ${txt2}`
conn.sendMessage(`${txt1}@s.whatsapp.net`, {text: cla})
break

case 'sn':
if (!isGroup) return env(" [❗] Comando feito apenas em Grupos ") 
if (!text) return env("Exemplo: -bot você já tomou banho hoje")
const sn = ['Sim', 'Não'] 
tata = body.slice(3) 
const akacio = sn[Math.floor(Math.random() * sn.length)] 
bob = `${tata}\n\n Segundo meus cálculos a resposta é ${akacio}`
env(bob) 
break

case 'vesgo': 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos") 
if (budy.includes("@")) { 
mention_id = args.join(" ").replace("@", "") + "@s.whatsapp.net"
var blamention_id = mention_id
}

if (budy.includes("@")) { 
var blamention_id = sender
}

conn.sendMessage(from, {text:`Pesquisando a ficha de vesgo do: @${blamention_id.split("@")[0]}, aguarde... `,mentions: [blamention_id]})
setTimeout( async() => { 
random = `${Math.floor(Math.random() * 110)}`
conn.sendMessage(from, {text: `o quanto você é vesgo\n\n @${blamention_id.split("@")[0]} você é ${random}% Vesgo 👀`, mentions: [blamention_id]}, {quoted: mek})
}, 7000)
break

case 'corno': 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos") 
if (budy.includes("@")) { 
mention_id = args.join(" ").replace("@", "") + "@s.whatsapp.net"
var blamention_id = mention_id
}

if (budy.includes("@")) { 
var blamention_id = sender
}

conn.sendMessage(from, {text:`Pesquisando a ficha de corno do: @${blamention_id.split("@")[0]}, aguarde... `,mentions: [blamention_id]})
setTimeout( async() => { 
random = `${Math.floor(Math.random() * 110)}`
conn.sendMessage(from, {text: `o quanto você é corno\n\n @${blamention_id.split("@")[0]} você é ${random}% corno 🐂`, mentions: [blamention_id]}, {quoted: mek})
}, 7000)
break

case 'gay': 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos") 
if (budy.includes("@")) { 
mention_id = args.join(" ").replace("@", "") + "@s.whatsapp.net"
var blamention_id = mention_id
}

if (budy.includes("@")) { 
var blamention_id = sender
}

conn.sendMessage(from, {text:`Pesquisando a ficha de corno do: @${blamention_id.split("@")[0]}, aguarde... `,mentions: [blamention_id]})
setTimeout( async() => { 
random = `${Math.floor(Math.random() * 110)}`
conn.sendMessage(from, {text: `o quanto você é gay\n\n @${blamention_id.split("@")[0]} você é ${random}% gay 🏳️‍🌈`, mentions: [blamention_id]}, {quoted: mek})
}, 7000)
break

case 'bebado': 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos") 
if (budy.includes("@")) { 
mention_id = args.join(" ").replace("@", "") + "@s.whatsapp.net"
var blamention_id = mention_id
}

if (budy.includes("@")) { 
var blamention_id = sender
}

conn.sendMessage(from, {text:`Pesquisando a ficha de bêbado do: @${blamention_id.split("@")[0]}, aguarde... `,mentions: [blamention_id]})
setTimeout( async() => { 
random = `${Math.floor(Math.random() * 110)}`
conn.sendMessage(from, {text: `o quanto você é gay\n\n @${blamention_id.split("@")[0]} você é ${random}% bêbado 🥴`, mentions: [blamention_id]}, {quoted: mek})
}, 7000)
break

case 'gay2': 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos")
porcengay = ["1%", `2%`, `3%`, `4%`, `5%`, `6%`, `7`, `%`, `9%`, `10`, `11%`, `12%`,`13%`, `14%`, `15%`, `16%`, `17%`, `1%`, `19%`, `20%`, `21%`, `22`, `23%`, `24%`, `25%`, `26%`, `27%`, `2%`, `27%`, `2%`, `29%`, `30%`, `31%`, `32%`, `33%`, `34%`, `35%`, `36%`, `37%`, `3%`, `39%`, `40%`, `41%`, `42%`, `43%`, `44%`, `45%`, `46%`, `47%`, `4%`, `49%`, `50%`, `51%`, `52%`, `53%`, `54%`, `55%`, `56%`, `57%`, `5%`, `59%`, `60%`, `61%`, `62%`, `63%`, `64%`, `65%`, `66%`, `67%`, `6%`, `69%`, `70%`, `71%`, `72%`, `73%`, `74%`, `75%`, `76%`, `77%`, `7%`, `79%`, `0%`, `1%`, `2%`, `5%`, `4%`, `5%`, `6%`, `7%`, `%`, `9%`, `90%`, `91%`, `92%`, `93%`, `94%`, `95%`, `96%`, `97%`, `9%`, `99%`, `100%`]
simon = porcengay[Math.floor(Math.random() * porcengay.length)]
queiss = `Sua porcentagem de gay é ${simon}, gayzão você em`
env(queiss)
break

case 'puta2': 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos")
porcenputa = ["1%", `2%`, `3%`, `4%`, `5%`, `6%`, `7`, `%`, `9%`, `10`, `11%`, `12%`,`13%`, `14%`, `15%`, `16%`, `17%`, `1%`, `19%`, `20%`, `21%`, `22`, `23%`, `24%`, `25%`, `26%`, `27%`, `2%`, `27%`, `2%`, `29%`, `30%`, `31%`, `32%`, `33%`, `34%`, `35%`, `36%`, `37%`, `3%`, `39%`, `40%`, `41%`, `42%`, `43%`, `44%`, `45%`, `46%`, `47%`, `4%`, `49%`, `50%`, `51%`, `52%`, `53%`, `54%`, `55%`, `56%`, `57%`, `5%`, `59%`, `60%`, `61%`, `62%`, `63%`, `64%`, `65%`, `66%`, `67%`, `6%`, `69%`, `70%`, `71%`, `72%`, `73%`, `74%`, `75%`, `76%`, `77%`, `7%`, `79%`, `0%`, `1%`, `2%`, `5%`, `4%`, `5%`, `6%`, `7%`, `%`, `9%`, `90%`, `91%`, `92%`, `93%`, `94%`, `95%`, `96%`, `97%`, `9%`, `99%`, `100%`]
nomin = porcenputa[Math.floor(Math.random() * porcenputa.length)]
queiss = `Sua porcentagem de puta é ${nomin}, putão você em`
env(queiss)
break 

case 'puto': 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos")
porcenputa2 = ["1%", `2%`, `3%`, `4%`, `5%`, `6%`, `7`, `%`, `9%`, `10`, `11%`, `12%`,`13%`, `14%`, `15%`, `16%`, `17%`, `1%`, `19%`, `20%`, `21%`, `22`, `23%`, `24%`, `25%`, `26%`, `27%`, `2%`, `27%`, `2%`, `29%`, `30%`, `31%`, `32%`, `33%`, `34%`, `35%`, `36%`, `37%`, `3%`, `39%`, `40%`, `41%`, `42%`, `43%`, `44%`, `45%`, `46%`, `47%`, `4%`, `49%`, `50%`, `51%`, `52%`, `53%`, `54%`, `55%`, `56%`, `57%`, `5%`, `59%`, `60%`, `61%`, `62%`, `63%`, `64%`, `65%`, `66%`, `67%`, `6%`, `69%`, `70%`, `71%`, `72%`, `73%`, `74%`, `75%`, `76%`, `77%`, `7%`, `79%`, `0%`, `1%`, `2%`, `5%`, `4%`, `5%`, `6%`, `7%`, `%`, `9%`, `90%`, `91%`, `92%`, `93%`, `94%`, `95%`, `96%`, `97%`, `9%`, `99%`, `100%`]
krlei = porcenputa2[Math.floor(Math.random() * porcenputa2.length)]
queiss = `Sua porcentagem de puta é ${krlei}, putão você em`
env(queiss)
break

case 'macaco': 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos")
porcengado = ["1%", `2%`, `3%`, `4%`, `5%`, `6%`, `7`, `%`, `9%`, `10`, `11%`, `12%`,`13%`, `14%`, `15%`, `16%`, `17%`, `1%`, `19%`, `20%`, `21%`, `22`, `23%`, `24%`, `25%`, `26%`, `27%`, `2%`, `27%`, `2%`, `29%`, `30%`, `31%`, `32%`, `33%`, `34%`, `35%`, `36%`, `37%`, `3%`, `39%`, `40%`, `41%`, `42%`, `43%`, `44%`, `45%`, `46%`, `47%`, `4%`, `49%`, `50%`, `51%`, `52%`, `53%`, `54%`, `55%`, `56%`, `57%`, `5%`, `59%`, `60%`, `61%`, `62%`, `63%`, `64%`, `65%`, `66%`, `67%`, `6%`, `69%`, `70%`, `71%`, `72%`, `73%`, `74%`, `75%`, `76%`, `77%`, `7%`, `79%`, `0%`, `1%`, `2%`, `5%`, `4%`, `5%`, `6%`, `7%`, `%`, `9%`, `90%`, `91%`, `92%`, `93%`, `94%`, `95%`, `96%`, `97%`, `9%`, `99%`, `100%`]
simoni = porcengado[Math.floor(Math.random() * porcengado.length)]
queisss = `Sua porcentagem de macaco é ${simoni}, macacão você em`
env(queisss)
break

case 'corno2': 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos")
porcencorno = ["1%", `2%`, `3%`, `4%`, `5%`, `6%`, `7`, `%`, `9%`, `10`, `11%`, `12%`,`13%`, `14%`, `15%`, `16%`, `17%`, `1%`, `19%`, `20%`, `21%`, `22`, `23%`, `24%`, `25%`, `26%`, `27%`, `2%`, `27%`, `2%`, `29%`, `30%`, `31%`, `32%`, `33%`, `34%`, `35%`, `36%`, `37%`, `3%`, `39%`, `40%`, `41%`, `42%`, `43%`, `44%`, `45%`, `46%`, `47%`, `4%`, `49%`, `50%`, `51%`, `52%`, `53%`, `54%`, `55%`, `56%`, `57%`, `5%`, `59%`, `60%`, `61%`, `62%`, `63%`, `64%`, `65%`, `66%`, `67%`, `6%`, `69%`, `70%`, `71%`, `72%`, `73%`, `74%`, `75%`, `76%`, `77%`, `7%`, `79%`, `0%`, `1%`, `2%`, `5%`, `4%`, `5%`, `6%`, `7%`, `%`, `9%`, `90%`, `91%`, `92%`, `93%`, `94%`, `95%`, `96%`, `97%`, `9%`, `99%`, `100%`]
comoli = porcencorno[Math.floor(Math.random() * porcencorno.length)]
vici = `Sua porcentagem de corno é ${comoli}, cornãovocê em`
env(vici)
break

case 'macaca': 
if (!isGroup) return env("Apenas em grupos")
porcencorn = ["1%", `2%`, `3%`, `4%`, `5%`, `6%`, `7`, `%`, `9%`, `10`, `11%`, `12%`,`13%`, `14%`, `15%`, `16%`, `17%`, `1%`, `19%`, `20%`, `21%`, `22`, `23%`, `24%`, `25%`, `26%`, `27%`, `2%`, `27%`, `2%`, `29%`, `30%`, `31%`, `32%`, `33%`, `34%`, `35%`, `36%`, `37%`, `3%`, `39%`, `40%`, `41%`, `42%`, `43%`, `44%`, `45%`, `46%`, `47%`, `4%`, `49%`, `50%`, `51%`, `52%`, `53%`, `54%`, `55%`, `56%`, `57%`, `5%`, `59%`, `60%`, `61%`, `62%`, `63%`, `64%`, `65%`, `66%`, `67%`, `6%`, `69%`, `70%`, `71%`, `72%`, `73%`, `74%`, `75%`, `76%`, `77%`, `7%`, `79%`, `0%`, `1%`, `2%`, `5%`, `4%`, `5%`, `6%`, `7%`, `%`, `9%`, `90%`, `91%`, `92%`, `93%`, `94%`, `95%`, `96%`, `97%`, `9%`, `99%`, `100%`]
snooey = porcencorn[Math.floor(Math.random() * porcencorn.length)]
vishzxz = `Sua porcentagem de macaca é ${snooey}, macacona você em 😂`
env(vishzxz)
break
     
//=====[COMANDOS DE FIGURINHAS]=====\\

case 'attp1': {
if (!q) return env("cade o txt")
env('aguarda ai')
const buff = await getBuffer(`https://marcos025.onrender.com/api/maker/attp1?texto=${q}&apikey=DpfJFRv3Tx`)
conn.sendMessage(from, { sticker: buff, packname: global.packname, author: global.author })
}
break

case 'attp2': {
    if (!q) return env('Cade o texto?')
    const attp2 = await getBuffer(`https://marcos025.onrender.com/api/maker/attp2?texto=${q}&apikey=DpfJFRv3Tx`)
conn.sendMessage(from, {sticker: attp2})
}
break 

case 'attp3' : { 
    if (!q) return env('Cade o texto bobão')
    const attp3 = await getBuffer(`https://marcos025.onrender.com/api/maker/attp3?texto=${q}&apikey=DpfJFRv3Tx`)
conn.sendMessage(from, { sticker: attp3})
}
break

case 'attp4' : { 
    if (!q) return env('Cade o texto bobão')
    const attp4 = await getBuffer(`https://marcos025.onrender.com/api/maker/attp4?texto=${q}&apikey=DpfJFRv3Tx`)
conn.sendMessage(from, { sticker: attp4})
}
break

case 'attp5' : { 
    if (!q) return env('Cade o texto bobão')
    const attp5 = await getBuffer(`https://marcos025.onrender.com/api/maker/attp5?texto=${q}&apikey=DpfJFRv3Tx`)
conn.sendMessage(from, { sticker: attp5})
}
break

case 'attp6' : { 
    if (!q) return env('Cade o texto bobão')
    const attp6 = await getBuffer(`https://marcos025.onrender.com/api/maker/attp6?texto=${q}&apikey=DpfJFRv3Tx`)
conn.sendMessage(from, { sticker: attp6})
}
break

case 'attp7' : { 
    if (!q) return env('Cade o texto bobão')
    const attp7 = await getBuffer(`https://marcos025.onrender.com/api/maker/attp7?texto=${q}&apikey=DpfJFRv3Tx`)
conn.sendMessage(from, { sticker: attp7})
}
break

//===[JOGOS]===\\

case 'anagrama':
if (!isGroup) return env('Só em Grupo')
if (args.length < 1) return env(`Exemplo: ${prefixobot}anagrama 1`)
if(!isGroup) return env(dialogo.grupo)
const anaaleatorio = Math.floor(Math.random() * palavrasANA.length)
if(args.length == 0) return env(dialogo.semnull)
if (args.join(' ') === '1') {
if(fs.existsSync(`./database/jogos/anagrama/anagrama-${from}.json`)) {
let dataAnagrama2 = JSON.parse(fs.readFileSync(`./database/jogos/anagrama/anagrama-${from}.json`))
env(`o jogo já foi iniciado neste grupo:
palavra: ${dataAnagrama2.embaralhada}
dica: ${dataAnagrama2.dica}
`
)} else {
fs.writeFileSync(`./database/jogos/anagrama/anagrama-${from}.json`, `${JSON.stringify(palavrasANA[anaaleatorio])}`)
conn.sendMessage(from, {text: `
│────────────
│ *「 ANAGRAMA 」*      
│────────────
│
╔────── ¤ ◎ 𐂡 ◎ ¤ ──────╗
┃Descubra A Palavra 
┃
┃ANAGRAMA: ${palavrasANA[anaaleatorio].embaralhada}
┃
┃DICA: ${palavrasANA[anaaleatorio].dica}
╚────── ¤ ◎ 𐂡 ◎ ¤ ──────╝`
})
}
} else if (args.join(' ') ==='0') {
if(!fs.existsSync(`./database/jogos/anagrama/anagrama-${from}.json`)) return env('não tem como desativar o jogo do anagrama pôs ele não foi ativado')
fs.unlinkSync(`./database/jogos/anagrama/anagrama-${from}.json`)
env("desativado com sucesso") 
}
break

case 'status': 
if (!isMemberAdmin && mek.key.fromMe) return env("...")
statuss = 
` Infor Grupo ❗

🏷️ Nome: ${groupName}
👤 Criador do Grupo: @${from.split('@')[0]}
👥 Participantes: ${groupMembers.length}
👨‍💻 Admins: ${getAdmins.length}

 === Segurança ===

✒ Anti-Link: ${isAntilink? '✅' : '❌'}
✒ Anti-Figurinhas: ❌
✒ Anti-Documento: ❌
✒ Anti-Audio: ${isAntiaudio? '✅' : '❌'}
✒ Anti-Imagem: ${isAntiimg? '✅' : '❌'}
✒ Anti-Video: ${isAntivideo? '✅' : '❌'}
✒ Bem-Vindo: ❌
`
conn.sendMessage(from, {text: statuss})
break


//===[PORCENTAGEM]===\\

//PACK STCKER\\..
case 'packfig': {
env(`
" ☘️ 𝙋𝘼𝘾𝙆 𝘿𝙀 𝘼𝙉𝙄𝙈𝙀𝙎 ☘️ = ${prefixobot}packanime"
" ☘️ 𝙋𝘼𝘾𝙆 𝘿𝙀 𝘼𝙉𝙄𝙈𝘼𝙄𝙎 ☘️ = ${prefixobot}packanimais"
" ☘️ 𝙋𝘼𝘾𝙆 𝘿𝙀 𝙀𝙈𝙊𝙅𝙄𝙎 ☘️ = ${prefixobot}packemojis "
 " ☘️ 𝙋𝘼𝘾𝙆 𝘿𝙀 𝙈𝙀𝙈𝙀𝙎 ☘️ = ${prefixobot}packmemes"
`,
mek)}
break

case 'packemoji': case 'Packemoji': case 'packemojis': case 'Packemojis': {
var dkeysee = ['Aqui está']
var zalts = dkeysee[Math.floor(Math.random() * dkeysee.length)]
var badin =['1','23','24','25','26','27','40','42','43','44','45','46']
var oto = badin[Math.floor(Math.random() * dkeysee.length)]
var bladin =['28','29','30','31','32','33','34','10','11','12','13','14','15','16','17','18','19','20']
var otu = bladin[Math.floor(Math.random() * dkeysee.length)]
var bdin =['20','19','18','17','16','15','14','13','12','11','10','9','8','7','6','5','4','3','2','1']
var o = bdin[Math.floor(Math.random() * dkeysee.length)]
var badn =['33','34','35','36','37','38','39','40','42','43','44','45','46']
var oo = badn[Math.floor(Math.random() * dkeysee.length)]
env(`${dkeysee}`);
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack de emojis/${oto}.webp`)}, {quoted: mek});
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack de emojis/${otu}.webp`)}, {quoted: mek});
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack de emojis/${oo}.webp`)}, {quoted: mek});
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack de emojis/${o}.webp`)}, {quoted: mek});
}
break

case 'packanime': case 'packanimes': case 'Packanime': case 'Packanimes': {
var dkeyse = ['Aqui está']
var zalts = dkeyse[Math.floor(Math.random() * dkeyse.length)]
var badin =['1','23','24','25','26','27','40','42','43','44','45','46']
var oto = badin[Math.floor(Math.random() * dkeyse.length)]
var bladin =['28','29','30','31','32','33','34','10','11','12','13','14','15','16','17','18','19','20']
var otu = bladin[Math.floor(Math.random() * dkeyse.length)]
var bdin =['20','19','18','17','16','15','14','13','12','11','10','9','8','7','6','5','4','3','2','1']
var o = bdin[Math.floor(Math.random() * dkeyse.length)]
var badn =['33','34','35','36','37','38','39','40','42','43','44','45','46']
var oo = badn[Math.floor(Math.random() * dkeyse.length)]
env(`${dkeyse}`);
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack anime/${oto}.webp`)}, {quoted: mek});
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack anime/${otu}.webp`)}, {quoted: mek});
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack anime/${oo}.webp`)}, {quoted: mek});
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack anime/${o}.webp`)}, {quoted: mek});
}
break

case 'packanimal': case 'Packanimal': {
var valeria = ["Aqui está"]
var keyse = valeria[Math.floor(Math.random() * valeria.length)]
var badin =['23','24','25','26','27','40','42','43','44','45','46']
var oto = badin[Math.floor(Math.random() * valeria.length)]
var bladin =['28','29','30','31','32','33','34','10','11','12','13','14','15','16','17','18','19','20']
var otu = bladin[Math.floor(Math.random() * valeria.length)]
var bdin =['20','19','18','17','16','15','14','13','12','11','10','9','8','7','6','5','4','3','2','1']
var o = bdin[Math.floor(Math.random() * valeria.length)]
var badn =['33','34','35','36','37','38','39','40','42','43','44','45','46']
var oo = badn[Math.floor(Math.random() * valeria.length)]
env(`${valeria}`);
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack de animaizinhos/${oto}.webp`)}, {quoted: mek});
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack de animaizinhos/${otu}.webp`)}, {quoted: mek});
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack de animaizinhos/${oo}.webp`)}, {quoted: mek});
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack de animaizinhos/${o}.webp`)}, {quoted: mek});
}
break

case 'packmemes': case 'Packmemes': {
var electro = ['Aqui está']
var electro = electro[Math.floor(Math.random() * electro.length)]
var badin =['23','24','25','26','27','40','42','43','44','45','46']
var oto = badin[Math.floor(Math.random() * electro.length)]
var bladin =['20','21','37','1','19','18','12','19']
var otu = bladin[Math.floor(Math.random() * electro.length)]
var bdin =['20','35','29','23','22','19','18','17','16','15','14','23','47','13','12','11','10','9','8','7','6','5','4','3','2','1','1']
var o = bdin[Math.floor(Math.random() * electro.length)]
var badn =['33','34','36','37','38','39','40','42','43','44','45','46','12','11','10','9','8','7','1','20','12']
var oo = badn[Math.floor(Math.random() * electro.length)]
env(`${electro}`);
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack de memes/${oto}.webp`)}, {quoted: mek});
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack de memes/${otu}.webp`)}, {quoted: mek});
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack de memes/${oo}.webp`)}, {quoted: mek});
conn.sendMessage(from, {sticker: fs.readFileSync(`./database/fig/pack/pack de memes/${o}.webp`)}, {quoted: mek});
}
break

case 'perfil':
const getLevel = getLevelingLevel(sender)
try { 
ppimagem = await conn.profilePictureUrl(`${sender.split('@')[0]}@c.us`, 'image')
} catch { 
ppimagem = 'https://telegra.ph/file/fbcaecd10c0e98ace010b.jpg'
}
const conselho = ['O importante não é vencer todos os dias, mas lutar sempre.', 'Não desista de um sonho apenas pelo tempo que levará para realizá-lo. O tempo passará de qualquer forma.', 'Aqueles que não fazem nada estão sempre dispostos a criticar os que fazem algo.', 'Quando surgirem os obstáculos, mude a sua direção para alcançar a sua meta, mas não a decisão de chegar lá.', 'Não deixe dominar-se pelo passado, você vive no presente, caminhando para o futuro.']
complicadoiss = conselho[Math.floor(Math.random () * conselho.length)]

var bixaa = ["1%", `2%`, `3%`, `4%`, `5%`, `6%`, `7`, `%`, `9%`, `10`, `11%`, `12%`,`13%`, `14%`, `15%`, `16%`, `17%`, `1%`, `19%`, `20%`, `21%`, `22`, `23%`, `24%`, `25%`, `26%`, `27%`, `2%`, `27%`, `2%`, `29%`, `30%`, `31%`, `32%`, `33%`, `34%`, `35%`, `36%`, `37%`, `3%`, `39%`, `40%`, `41%`, `42%`, `43%`, `44%`, `45%`, `46%`, `47%`, `4%`, `49%`, `50%`, `51%`, `52%`, `53%`, `54%`, `55%`, `56%`, `57%`, `5%`, `59%`, `60%`, `61%`, `62%`, `63%`, `64%`, `65%`, `66%`, `67%`, `6%`, `69%`, `70%`, `71%`, `72%`, `73%`, `74%`, `75%`, `76%`, `77%`, `7%`, `79%`, `0%`, `1%`, `2%`, `5%`, `4%`, `5%`, `6%`, `7%`, `%`, `9%`, `90%`, `91%`, `92%`, `93%`, `94%`, `95%`, `96%`, `97%`, `9%`, `99%`, `100%`]
snao = bixaa[Math.floor(Math.random () * bixaa.length)]

var gadoo = ["1%", `2%`, `3%`, `4%`, `5%`, `6%`, `7`, `%`, `9%`, `10`, `11%`, `12%`,`13%`, `14%`, `15%`, `16%`, `17%`, `1%`, `19%`, `20%`, `21%`, `22`, `23%`, `24%`, `25%`, `26%`, `27%`, `2%`, `27%`, `2%`, `29%`, `30%`, `31%`, `32%`, `33%`, `34%`, `35%`, `36%`, `37%`, `3%`, `39%`, `40%`, `41%`, `42%`, `43%`, `44%`, `45%`, `46%`, `47%`, `4%`, `49%`, `50%`, `51%`, `52%`, `53%`, `54%`, `55%`, `56%`, `57%`, `5%`, `59%`, `60%`, `61%`, `62%`, `63%`, `64%`, `65%`, `66%`, `67%`, `6%`, `69%`, `70%`, `71%`, `72%`, `73%`, `74%`, `75%`, `76%`, `77%`, `7%`, `79%`, `0%`, `1%`, `2%`, `5%`, `4%`, `5%`, `6%`, `7%`, `%`, `9%`, `90%`, `91%`, `92%`, `93%`, `94%`, `95%`, `96%`, `97%`, `9%`, `99%`, `100%`]
teusla = gadoo[Math.floor(Math.random() * gadoo.length)]

var programa = ["1$", `2$`, `3$`, `4$`, `5$`, `6$`, `7`, `$`, `9$`, `10`, `11$`, `12$`,`13$`, `14$`, `15$`, `16$`, `17$`, `1$`, `19$`, `20$`, `21$`, `22`, `23$`, `24$`, `25$`, `26$`, `27$`, `2$`, `27$`, `2$`, `29$`, `30$`, `31$`, `32$`, `33$`, `34$`, `35$`, `36$`, `37$`, `3$`, `39$`, `40$`, `41$`, `42$`, `43$`, `44$`, `45$`, `46$`, `47$`, `4$`, `49$`, `50$`, `51$`, `52$`, `53$`, `54$`, `55$`, `56$`, `57$`, `5$`, `59$`, `60$`, `61$`, `62$`, `63$`, `64$`, `65$`, `66$`, `67$`, `6$`, `69$`, `70$`, `71$`, `72$`, `73$`, `74$`, `75$`, `76$`, `77$`, `7$`, `79$`, `0$`, `1$`, `2$`, `5$`, `4$`, `5$`, `6$`, `7$`, `$`, `9$`, `90$`, `91$`, `92$`, `93$`, `94$`, `95$`, `96$`, `97$`, `9$`, `99$`, `100$`]
slateu = programa[Math.floor(Math.random  () * programa.length)]
var bio = await conn.fetchStatus(sender)
var bioo = bio.status

const padaria = ` 

 「 Meu Perfil 」
 
🙋 Nome: ${pushname}

🪀 Número: @${sender.split("@")[0]} 

🏦 Banco: ${checkATMuser(sender)}

🌟 Level: ${getLevel}

🗯 *SUA BIO* : ${bioo}

🏳️‍🌈 Porc de bixaa: ${snao}

🐂 Porc de gado: ${teusla}

💲 Valor do Programa: ${slateu}

🪞 Conselho: ${complicadoiss}
`
conn.sendMessage(from, {image: {url: ppimagem}, caption: padaria, mek})
break

case 'simi1':
if (!isMemberAdmin) return env("apenas adms")
if (args.length < 1) return env('Hmmmm')
if (Number(args[0]) === 1) {
if (isSimi) return env('O modo Simi está ativo')
samih.push(from)
fs.writeFileSync('./db/json/simi.json', JSON.stringify(samih))
env('Ativado com sucesso o modo simi neste grupo 😗')
} else if (Number(args[0]) === 0) {
if(!isSimi) return env('Já está Desativado.')
samih.splice(from, 1)
fs.writeFileSync('./db/json/simi.json', JSON.stringify(samih))
env('Desativado modo simi com sucesso neste grupo 😡️')
} else {
env('1 para ativar, 0 para desativar, lerdao vc em')
}
break

case 'leveling':
if (!isGroup) return env('*🚫 Recursos Apenas para grupos*')
if (!isMemberAdmin) return env('Você precisa ser adm')
if (args.length < 1) return env('Ative pressione 1, Desativar pressione 0')
if (Number(args[0]) === 1) {
if (isLevelingOn) return env('*O recurso de nível já estava ativo antes*')
leveling.push(from)
env('Level acaba de ser ativado ✔️')
fs.writeFileSync('./db/json/leveling.json', JSON.stringify(leveling))
} else if (Number(args[0]) === 0) {
if (!isLevelingOn) return env(`O recurso de level já está Desativado neste grupo.`)
leveling.splice(from, 1)
fs.writeFileSync('./db/json/leveling.json', JSON.stringify(leveling))
env('Level acaba de ser desativado ❌')
} else {
env('「* Adicionar parâmetro 1 ou 0 ')
}
break

case 'level':
if (!isLevelingOn) return env("Leveling desativado, para ativar digite -leveling 1")
env( `
┏━━━━━━[『 LEVEL 』]━━━━
┃• *Nome*: ${pushname}
└┬💫
 ┃• *Número*: ${sender.split('@')[0]}
 ┃• *Level*: ${getLevelingLevel(sender)}
 ┃• *Xp*: ${getLevelingXp(sender)}
 ┃• *Patente*: ${patt}
 ┗━━━━━━[💫]━━━━━━━━ 
`,
mek)
break

case 'ganharlevel': 
if (isOwner) return env('𝗔𝗽𝗲𝗻𝗮𝘀 𝗺𝗲𝘂 𝗗𝗼𝗻𝗼 𝗽𝗼𝗱𝗲 𝘂𝘀𝗮𝗿 𝗲𝘀𝘁𝗲 𝗖𝗼𝗺𝗮𝗻𝗱𝗼.')
addLevelingLevel(sender, 100000000000)
env("Foi adicionado 10000 mil leveis para você")
break

case 'ganharxp': 
if (isOwner) return env('𝗔𝗽𝗲𝗻𝗮𝘀 𝗺𝗲𝘂 𝗗𝗼𝗻𝗼 𝗽𝗼𝗱𝗲 𝘂𝘀𝗮𝗿 𝗲𝘀𝘁𝗲 𝗖𝗼𝗺𝗮𝗻𝗱𝗼.')
addLevelingXp(sender, 10000)
env("Foi adicionado 10000 mil de Xp para você ")
break

//===[Premium]===\\

case 'listonline': case 'lista-online': {
if (!isPremium) return env('Apenas user premium')
if (!isGroup) return env("gp")
let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
let online = [...Object.keys(store.presences[id]), botNumber]
let liston = 1
conn.sendMessage(from, '     「 lista Online 」\n\n' + online.map(v => `${liston++} . @` + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
}
break
    
case 'cep':
if (!isPremium) return env('Apenas user premium')
if (args.length < 1) return env('digite o cep que deseja buscar')
cep = body.slice(4)
hehe = await fetchJson(`https://brasilapi.com.br/api/cep/v1/${cep}`)
if (hehe.error) return env(hehe.error)
ccg =
` INFORMAÇÕES DO CEP
‣ Cep: ${hehe.cep}
‣ Estado: ${hehe.state}
‣ Cidade: ${hehe.city}`
conn.sendMessage(from, {text: ccg}, {quoted:mek})
break
    
case 'ddd':
if (!isPremium) return env('Apenas user premium')
if (args.length < 1) return env('digite o ddd que deseja buscar')
ddd = body.slice(4)
ddds = await fetchJson(`https://brasilapi.com.br/api/ddd/v1/${ddd}`)
if (hehe.error) return env(hehe.error)
ccg =
` INFORMAÇÕES DO DDD
‣ Estado: ${ddds.data.state}
‣ Cidades: 
${ddds.cities}\n`
conn.sendMessage(from, {text: ccg}, {quoted:mek})
break

case 'imgneko': {
if (!isPremium) return env('Apenas Usuarios premium')
waifuddd = await axios.get('https://waifu.pics/api/sfw/neko')
templateMassage = {
image: {url:waifuddd.data.url,
quoted: mek},
caption: 'Ceci Bot!',
footer: "Shelly Bot",
//templateButtons: templateButtons 
}
conn.sendMessage(from, templateMassage)
}
break
    
case 'loli': {
if (!isPremium) return env('Apenas Usuarios premium')
lolii = await axios.get('https://waifu.pics/api/sfw/shinobu')
templateMeinssage = {
image: {url:lolii.data.url,
quoted: mek},
caption: 'Ceci Bot!',
footer: "Shelly Bot",
//templateButtons: templateButtons 
 }
conn.sendMessage(from, templateMeinssage)
}
break
    
case 'imgwaifu': {
if (!isPremium) return env('Apenas Usuarios premium')
waifuddd = await axios.get('https://waifu.pics/api/sfw/waifu')
templateMassage = {
image: {url:waifuddd.data.url,
quoted: mek},
caption: 'Ceci Bot!',
footer: "Shelly Bot",
    //templateButtons: templateButtons 
}
conn.sendMessage(from, templateMassage)
}
break
    
case 'neko': {
if (!isPremium) return env('Apenas Usuarios premium')
nekonov = await axios.get('https://waifu.pics/api/nsfw/neko')
templateMessageee2 = {
image: {url: nekonov.data.url, 
quoted: mek}, 
caption: 'Ceci Bot 2.0', 
//templateButtons: templateButtons 
}
conn.sendMessage(from, templateMessageee2)
}
break 

case 'waifu': {
if (!isPremium) return env('Apenas Usuarios premium')
    waifoi = await axios.get('https://waifu.pics/api/nsfw/waifu')
templateMessaage = { 
    image: {url: waifoi.data.url,
    quoted: mek}, 
    caption: "Ceci Bot 2.0", 
    //templateButtons: templateButtons 
}
conn.sendMessage(from, templateMessaage)
}
break


case 'addpremium':
if (isOwner) return env('*😤 Você tá sabendo demais!*')
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
if (!budy.includes("@55")) {
mentioned = mek.message.extendedTextMessage.contextInfo.participant 
bla = premium.includes(mentioned)
if(bla) return env("*Este número já está incluso..*")  
premium.push(`${mentioned}`)
fs.writeFileSync('./db/json/premium.json', JSON.stringify(premium))
conn.sendMessage(from, {text: `👑@${mentioned.split("@")[0]} foi adicionado à lista de usuários premium com sucesso👑`}, {quoted: mek})  
} else { 
mentioned = args.join(" ").replace("@", "") + "@s.whatsapp.net"
bla = premium.includes(mentioned)
if(bla) return env("*Este número já está incluso..*")  
premium.push(`${mentioned}`)
fs.writeFileSync('./db/json/premium.json', JSON.stringify(premium))
tedtp = args.join(" ").replace("@", "")
conn.sendMessage(from, {text: `👑@${tedtp} foi adicionado à lista de usuários premium com sucesso👑`, mentions: [mentioned]}, {quoted: mek})
}
break 

case 'listavip':
if (isOwner) return env('*😤 Você tá sabendo demais!*')
tkks = '╭────⟮ Lista De Premium⟯ 👑\n'
for (var V of premium) {
tkks += `│ ⊱─⊳${V.split('@')[0]}\n`
}
tkks += `│ Total : ${premium.length}\n╰────*「 *${BotName}* 」*───═༻`
env(tkks.trim())
break

case 'listban': 
if (isOwner) return env("Você sabe demais 🕴️ ") 
tkkj = '╭────⟮ Lista De Banimento⟯ 🚫 \n' 
for (let V of ban) { 
tkkj +=  `│ ➜ ${V.split('@')[0]}\n`
}
tkkj += `│ Total : ${ban.length}\n╰────*「 *Lista De Banimento 🚫* 」*───═`
env(tkkj.trim())
break 

case 'rempremium': 
if (isOwner) return env('*😤 Você tá sabendo demais!*')
if (!budy.includes("@55")){
num = mek.message.extendedTextMessage.contextInfo.participant
bla = premium.includes(num)
if(!bla) return env("Este número já esta na lista de usuários Premium'")
pesquisar = num
processo = premium.indexOf(pesquisar)
while(processo >= 0){
premium.splice(processo, 1)
processo = premium.indexOf(pesquisar)
}
fs.writeFileSync('./db/json/premium.json', JSON.stringify(premium))
conn.sendMessage(from, {text: ` ${num.split("@")[0]} Acaba de ser removido da lista de Premium com 𝚂𝚞𝚌𝚎𝚜𝚜𝚘 `},
{quoted: mek}) 
} else {
mentioned = args.join(" ").replace("@", "") + "@s.whatsapp.net"
bla = premium.includes(mentioned)
if(!bla) return env("Este número já esta na lista de Usuários Premium")
pesquisar = mentioned
processo = premium.indexOf(pesquisa)
while(processo >= 0){
premium.splice(processo, 1)
processo = premium.indexOf(pesquisar)
}
fs.writeFileSync('./db/json/premium.json'), JSON.stringify(premium)
conn.sendMessage(from, {text: `@${mentioned.split("@")[0]} Foi removido da lista de Usuários Premium com sucesso ✔️`}, {quoted: mek})
}
break

case 'sgif':
case 'stikerin':
case 's':
case 'sticker':
case 'stiker':
(async function () {
env("aguarde")
var legenda = q ? q?.split("/")[0] : `🍀 CRIADOR DA FIG:
🍀 BOT:
`
var autor = q ? q?.split("/")[1] : q?.split("/")[0] ? '' : `${pushname}
conn - Bot
`
if (isMedia && !mek.message.videoMessage || isQuotedImage) {
var encmedia = isQuotedImage ? mek.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage : mek.message.imageMessage
rane = getRandom('.'+await getExtension(encmedia.mimetype))
buffimg = await getFileBuffer(encmedia, 'image')
fs.writeFileSync(rane, buffimg)
rano = getRandom('.webp')
exec(`ffmpeg -i ${rane} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${rano}`, (err) => {
fs.unlinkSync(rane)
// "android-app-store-link": "https://play.google.com/store/search?q=%2B55%2094%209147-2796%20%F0%9F%94%A5%F0%9F%94%A5%F0%9F%94%A5%F0%9F%94%A5%F0%9F%94%A5&c=apps",
var json = {
"sticker-pack-name": legenda,
"sticker-pack-publisher": autor
}
var exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
var jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
var exif = Buffer.concat([exifAttr, jsonBuff])
exif.writeUIntLE(jsonBuff.length, 14, 4)
let nomemeta = Math.floor(Math.random() * (99999 - 11111 + 1) + 11111)+".temp.exif"
fs.writeFileSync(`./${nomemeta}`, exif) 
exec(`webpmux -set exif ${nomemeta} ${rano} -o ${rano}`, () => {
conn.sendMessage(from, {sticker: fs.readFileSync(rano)}, {quoted: mek})
fs.unlinkSync(nomemeta)
fs.unlinkSync(rano)
})
})
} else if (isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 35) {
var encmedia = isQuotedVideo ? mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage : mek.message.videoMessage
rane = getRandom('.'+await getExtension(encmedia.mimetype))
buffimg = await getFileBuffer(encmedia, 'video')
fs.writeFileSync(rane, buffimg)
rano = getRandom('.webp')
await ffmpeg(`./${rane}`)
.inputFormat(rane.split('.')[1])
exec(`ffmpeg -i ${rane} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 200:200 ${rano}`, (err) => {
fs.unlinkSync(rane)
let json = {
"sticker-pack-name": legenda,
"sticker-pack-publisher": autor
}
let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
let jsonBuff = Buffer.from(JSON.stringify(json), "utf-8")
let exif = Buffer.concat([exifAttr, jsonBuff])
exif.writeUIntLE(jsonBuff.length, 14, 4)
let nomemeta = "temp.exif"
fs.writeFileSync(`./${nomemeta}`, exif) 
exec(`webpmux -set exif ${nomemeta} ${rano} -o ${rano}`, () => {
conn.sendMessage(from, {sticker: fs.readFileSync(rano)}, {quoted: mek})
fs.unlinkSync(nomemeta)
fs.unlinkSync(rano)
})
})
} else {
env(`Você precisa env ou marcar uma imagem ou vídeo com no máximo 10 segundos`)
}
})().catch(e => {
console.log(e)
env("Hmm deu erro")
try {
if (fs.existsSync("temp.exif")) fs.unlinkSync("temp.exif");
if (fs.existsSync(rano)) fs.unlinkSync(rano);
if (fs.existsSync(media)) fs.unlinkSync(media);
} catch {}
})
break

case 'ping': {
    const used = process.memoryUsage()
    const cpus = os.cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
    })
    const cpu = cpus.reduce((last, cpu, _, { length }) => {
     last.total += cpu.total
     last.speed += cpu.speed / length 
     last.times.user += cpu.times.user
     last.times.sys += cpu.times.sys
     last.times.idle += cpu.times.idle
     last.times.irq += cpu.times.irq
    return last
    }, {
     speed: 0,
        total: 0,
        times: {
            user: 0,
            nice: 0,
            sys: 0,
            idle: 0, 
            irq: 0
         }
         })
      var timestamp = speed()
      var latensi = speed () - timestamp
      neww = performance.now()
      oldd = performance.now()
     respon = `

╭─「 *INFORMAÇÕES DO PING ❗* 」
│   
│ => Nome: ${BotName}
│ 
│ => Tempo Ativo: ${runtime(process.uptime())}
│
│ => Tempo Resposta: ${latensi.toFixed(4)} _segundos_
│
│ => Grupo: ${groupMetadata.subject}
╰───────────⪧
`.trim()
env(respon)
}
{quoted: selo}
break

//====[IMAGENS]===\
				
case 'areia': 
					if (args.length < 1) return env("Precisa do Texto amigo")
					teks = body.slice(5)
					if (teks.length > 10) return env('O texto é longo, até 10 caracteres')
					env('*Estou fazendo, se der erro tente novamente.*')
					buffer = await getBuffer(`https://marcos025.onrender.com/api/ephoto/areia?nome=${teks}&apikey=yOCSpNOwKw`)
					conn.sendMessage(from, {image: buffer, mek, thumbnail: null, caption: '*linktr.ee/makima.bot*'})
					break
					
case 'blackpink': 
					if (args.length < 1) return env("Precisa do Texto amigo")
					teks = body.slice(5)
					if (teks.length > 10) return env('O texto é longo, até 10 caracteres')
					env('*Estou fazendo, se der erro tente novamente*')
					buffer = await getBuffer(`https://marcos025.onrender.com/api/ephoto/blackpinkepo?nome=${teks}&apikey=yOCSpNOwKw`)
					conn.sendMessage(from, {image: buffer, mek, thumbnail: null, caption: '*linktr.ee/makima.bot*'})
					break
					
case 'pinkv2': 
					if (args.length < 1) return env("Precisa do Texto amigo")
					teks = body.slice(5)
					if (teks.length > 10) return env('O texto é longo, até 10 caracteres')
					env('*Estou fazendo, se der erro tente novamente.*')
					buffer = await getBuffer(`https://marcos025.onrender.com/api/ephoto/balckpingv2?nome=${teks}&apikey=yOCSpNOwKw`)
					conn.sendMessage(from, {image: buffer, mek, thumbnail: null, caption: '*linktr.ee/makima.bot*'})
					break
					
case 'tapete': 
					if (args.length < 1) return env("Precisa do Texto amigo")
					teks = body.slice(5)
					if (teks.length > 10) return env('O texto é longo, até 10 caracteres')
					env('*Estou fazendo, se der erro tente novamente.*')
					buffer = await getBuffer(`https://marcos025.onrender.com/api/ephoto/tela?nome=${teks}&apikey=yOCSpNOwKw`)
					conn.sendMessage(from, {image: buffer, mek, thumbnail: null, caption: '*linktr.ee/makima.bot*'})
					break
					
case 'brotoluz': 
					if (args.length < 1) return env("Precisa do Texto amigo")
					teks = body.slice(5)
					if (teks.length > 10) return env('O texto é longo, até 10 caracteres')
					env('*Estou fazendo, se der erro tente novamente.*')
					buffer = await getBuffer(`https://marcos025.onrender.com/api/ephoto/brotoluz?nome=${teks}&apikey=yOCSpNOwKw`)
					conn.sendMessage(from, {image: buffer, mek, thumbnail: null, caption: '*linktr.ee/makima.bot*'})
					break
					
case 'borracha': 
					if (args.length < 1) return env("Precisa do Texto amigo")
					teks = body.slice(5)
					if (teks.length > 10) return env('O texto é longo, até 10 caracteres')
					env('*Estou fazendo, se der erro tente novamente.*')
					buffer = await getBuffer(`https://marcos025.onrender.com/api/ephoto/borracha?nome=${teks}&apikey=yOCSpNOwKw`)
					conn.sendMessage(from, {image: buffer, mek, thumbnail: null, caption: '*linktr.ee/makima.bot*'})
					break
					
case 'brilhante': 
					if (args.length < 1) return env("Precisa do Texto amigo")
					teks = body.slice(5)
					if (teks.length > 10) return env('O texto é longo, até 10 caracteres')
					env('*Estou fazendo, se der erro tente novamente.*')
					buffer = await getBuffer(`https://marcos025.onrender.com/api/ephoto/brilhante?nome=${teks}&apikey=yOCSpNOwKw`)
					conn.sendMessage(from, {image: buffer, mek, thumbnail: null, caption: '*linktr.ee/makima.bot*'})
					break

case 'papel': 
if (args.length < 1) return env("Precisa do Texto amigo")
teks = body.slice(5)
if (teks.length > 10) return env('O texto é longo, até 10 caracteres')
env('*Estou fazendo, se der erro tente novamente.*')
buffer = await getBuffer(`https://marcos025.onrender.com/api/ephoto/papel?nome=${teks}&apikey=yOCSpNOwKw`)
conn.sendMessage(from, {image: buffer, mek, thumbnail: null, caption: '*linktr.ee/makima.bot*'})
break

case 'diablo': 
					if (args.length < 1) return env("Precisa do Texto amigo")
					teks = body.slice(5)
					if (teks.length > 10) return env('O texto é longo, até 10 caracteres')
					env('*Estou fazendo, se der erro tente novamente.*')
					buffer = await getBuffer(`https://marcos025.onrender.com/api/ephoto/diabo?nome=${teks}&apikey=yOCSpNOwKw`)
					conn.sendMessage(from, {image: buffer, mek, thumbnail: null, caption: '*linktr.ee/makima.bot*'})
					break

                    case 'urso': 
					if (args.length < 1) return env("Precisa do Texto amigo")
					teks = body.slice(5)
					if (teks.length > 10) return env('O texto é longo, até 10 caracteres')
					env('*Estou fazendo, se der erro tente novamente.*')
					buffer = await getBuffer(`https://marcos025.onrender.com/api/ephoto/urso?nome=${teks}&apikey=yOCSpNOwKw`)
					conn.sendMessage(from, {image: buffer, mek, thumbnail: null, caption: '*linktr.ee/makima.bot*'})
					break

                    case 'blur': 
					if (args.length < 1) return env("Precisa do Texto amigo")
					teks = body.slice(5)
					if (teks.length > 10) return env('O texto é longo, até 10 caracteres')
					env('*Estou fazendo, se der erro tente novamente.*')
					buffer = await getBuffer(`https://marcos025.onrender.com/api/ephoto/blur?nome=${teks}&apikey=yOCSpNOwKw`)
					conn.sendMessage(from, {image: buffer, mek, thumbnail: null, caption: '*linktr.ee/makima.bot*'})
					break
					
//====[BANCO]===\\

case 'wmoney': 
if (isOwner) return env("So dono") 
addKoinUser(sender, 100000000000000000000000000000000)
env("1000000$ Adicionados em sua conta")
break

case 'buyprem': 
if (premium.includes(sender)) return env("[ ❌ ] Só pode ser obtido uma vez!")
paypal = 1 
const koinPerlo = 10000
const buyPrem = koinPerlo * paypal
if ( checkATMuser(sender) <= buyPrem) return env("[ ❌ ] Opss! Você não tem Dinheiro suficiente\n Valor Suficiente: 10000 mil") 
if ( checkATMuser(sender) >= buyPrem) {
confirmATM(sender, buyPrem)
premium.push(`${sender}`)
fs.writeFileSync('./db/json/premium.json', JSON.stringify(premium))
await env(` 💸 COMPRA SUCEDIDA COM SUCESSO \n\n 👤 Fornecedor: K\n🔖 Comprador: *${pushname}*\n 💲 VALOR DO PREMIUM: *${koinPerlo}*`)
}
break

case 'pix':
case 'transferir':             			
if (!q.includes('/')) return  env(`[❗] Use assim : ${prefixobot}transferir @/2500`)
const tujuan = q.substring(0, q.indexOf('/') - 1)
const jumblah = q.substring(q.lastIndexOf('/') + 1)
if(isNaN(jumblah)) return await env('[❗] PRECISA SER UM NÚMERO')
if (jumblah < 100) return env(`transfrência mínima e de 100 reais`)
if (checkATMuser(sender) < jumblah) return env(`[❗] você não tem dinheiro suficiente para fazer uma transferência, você precisa ter no minímo 100 de dinhero`)
const tujuantf = `${tujuan.replace("@", '')}@s.whatsapp.net`
//fee = 0.010 *  jumblah 
hasiltf = jumblah 
confirmATM(sender, jumblah)
addKoinUser(tujuantf, hasiltf)
addKoinUser(`${tujuantf}@s.whatsapp.net`)
env(`TRANSFERÊNCIA \n\n⃟👤️ Transferidor: wa.me/${sender.split("@")[0]}\n Recebidor : ${tujuan}\n Valor Da Transferência : ${jumblah}\nTaxa : 0`)
break

case 'darmoney':

if (isOwner) return env("Só meu dono")
const numeroUang = args[0].replace('@','')
const uangLimite1 = args[1]
const darmoneyUang = mek.message.extendedTextMessage.contextInfo.mentionedJid
if (uangLimite1 <= 1) return env(`Precisa dar no minímo 1 limit`)
if (isNaN(uangLimite1)) return env(`[❗] USE ASSIM\n ${p + comando} @557499237652 5`)
if (!numeroUang) return env(`[❗] DIGITE ASSIM\n ${p + comando} @557499237652 5`)
const idUang = numeroUang + '@s.whatsapp.net'
var found = false
Object.keys(uang).forEach((i) => {
if(uang[i].id === idUang){
found = i
}
})
if (found !== false) {
uang[found].uang += Number(uangLimite1)
const updated = uang[found]
fs.writeFileSync('./db/json/banco.json',JSON.stringify(uang))
const verMoney = checkATMuser(darmoneyUang)
const result = `
╭ 「 Sucesso 」
├ *iD : *${from}*
├ *Horário : *${moment().format('DD/MM/YY HH:mm:ss')}*
├ Usúario : *@${updated.id.replace('@s.whatsapp.net','')}*
├ Dinheiro:* ${verMoney}
└`
console.log(uang[found]);
env(result)
} else {
env(`[❗] Desculpe ${pushname}, este ${numeroUang} número não está registrado no bot...`)
}
break

case 'dinheiro':
case 'money':
case 'cartao':
const testeDinheiro = checkATMuser(sender)
const checkDinheiro = checkATMuser(sender, testeDinheiro)
bancoCeci = `SEU CARTÃO 💳 

NOME: ${pushname}
HORA E DATA: ${hora}/${data}
SALDO: ${checkATMuser(sender)}
ID: ${from}
CÓDIGO: 777
SALDO NEGATIVO: -99999` 
env(bancoCeci)
break

case 'rankmoney':
bo = args[0]
_level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
uang.sort((a, b) => (a.uang < b.uang) ? 1 : -1)
let rankDinheiro = '🏆【DINHEIRO】🏆\n\n'
let nomNumberRank = 0
try {
for (let i = 0; i < 5; i++) {
nomNumberRank++
rankDinheiro += `
*${nomNumberRank}º*🥇 : @${uang[i].id.replace('@s.whatsapp.net', '')}
╭╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╸
│  Nome: _${uang[i].nome}_
│  Dinheiro: _${uang[i].uang}_ 💸
╰╾╾╾╾╾╾╾╾╾╾╾╾╾╾╾╸\n\n`
}
await env(rankDinheiro)
} catch (err) {
console.error(err)
await env(`Precisa ter mais Usuários registrados`)
}
break

case 'apostar': 
if (!isGroup) return env("Apenas em Grupos") 
const dinheiro = checkATMuser(sender)
const checkxpr = checkATMuser(sender, dinheiro)
const quantidader = '50' 
if (checkxpr <= quantidader) return env("[❗] Você não possui dinheiro suficiente para apostar. Mínimo: 100$")
if (args.length !== 1) return env("Especifique a quantidade para sua apostar") 
if (Number(args[0]) >= checkxpr || Number(args[0]) >= dinheiro) return env("Você não pode apostar uma quantidade de dinheiro maior do que você tem.")
if (Number(args[0]) < 50) return env("Quantidade máxima de aposta é 50") 
if (isNaN(args[0])) return env("Use apenas números, nada de letras ou virgulas!")
const double = Math.floor(Math.random() * 7) + 1 
const nrolxp = Number(-args[0])
const prolxp = double + Number(args[0])
if (double == 1) { 
await env(`BANG!!!\n\nVocê Perdeh na *Roleta-Russa*, sua perca é de ${nrolxp} em seu dinheiro`)
addKoinUser(sender, nrolxp, dinheiro)
addKoinUser(`557499237652@s.whatsapp.net`, prolxp)
} else if (double == 2) { 
await env(`UFAA 🙏\n\nO tiro passou bem longe e você ganhou ${prolxp} em dinheiro`)
addKoinUser(sender, prolxp, dinheiro)
} else if (double == 3) { 
await env(`💥 NÃO TEVE MUITA SORTE.\n\nVocê Perdeu *${nrolxp}*, Continua apostando igual os otários na blaze 😈`)
addKoinUser(sender, nrolxp, dinheiro)
addKoinUser(`557499237652@s.whatsapp.net`, prolxp)
} else if (double == 4) {
await env(`UM CARA DE SORTE 🍀\n\nJudeu conseguiu se salvar. Sua recompensa por isso: ${prolxp}, continue assim!`)
addKoinUser(sender, prolxp, dinheiro)
} else if (double == 5) { 
await env(`FOI POR POUCO\n\nVocê perdeu ${nrolxp} em seu saldo, continue apostando mais que vai sair cartinha 👀`)
addKoinUser(sender, nrolxp, dinheiro)
addKoinUser(`557499237652@s.whatsapp.net`, prolxp)
} else if (double == 6) {
await env(` 🏆 PARABÉNS 🏆\n\nVocê Finalmente ganhou, Sua recompensa: ${prolxp} em dinheiro`)
addKoinUser(sender, prolxp, dinheiro)
}
break

//===[fim]===\\

case 'owner': case 'dono': 
env(` 「 Numero do meu Dono 」
 🍭 - Smoke Arkhipov: wa.me//557499237652
`) 
break
               
  /*  case 'exec':
if (isOwner) return env("so dono")
let exexv = texto || 'ls';
// const { exec } = require('child_process');
exec(exexv, (err, msg) => {
 if (err) return env(err.message);
 if (msg) return env(msg);
});
break*/

     case 'mek':
    if (isOwner) return env("so dono")
     conn.sendMessage(from, {text: JSON.stringify(updateM, null, '\t')}, {quoted: mek});
     break;

case 'reiniciar':
case 'restart':
 if (isOwner) return env("so dono")
  env(`*Reiniciando*`) 
       setTimeout(() => {       
                        process.exit(1)
                        env(`Prontinho`);
                    }, 3000)	
break

case 'sairgp': 
if (isOwner) return env('Você sabe demais 🕴️')
conn.groupLeave(from) 
break

case 'mute': 
if (!isMemberAdmin) return env("Comando apenas para admins") 
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return 
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid 
pru = '.\n' 
for (var _ of mentioned) {
pru += `@${_.split('@')[0]}\n` 
}
ban.push(`${mentioned}`)
fs.writeFileSync('./lib/banned.json', JSON.stringify(ban)) 
susp = ` ❗ ${mentioned[0].split('@')[0]} foi banido de usar comandos ❗` 
mentions(`${susp}`, mentioned, true)
break

case 'unmute': 
if (isOwner) return env("Você sabe demais 🕴️") 
if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid 
pru = '.\n' 
for (let _ of mentioned) {
pru += `@${_.split('@')[0]}\n` 
}
ban.splice(`${mentioned}`) 
fs.writeFileSync('./lib/banned.json', JSON.stringify(ban)) 
susp = ` 💫 @${mentioned[0].split('@')[0]} Acabou de ser desbloqueado e você pode reutilizar os comandos do bot 💫` 
mentions(`${susp}`, mentioned, true)
break
 
case 'vcase':
try{
if (isOwner) return env (`*😤 Você tá sabendo demais!*`)
const getCase = (cases) => {
return "case"+`'${cases}'`+fs.readFileSync("main.js").toString().split('case \''+cases+'\'')[1].split("break")[0]+"break"
}
env(`${getCase(q)}`)
} catch(e) {
console.log(e)
env('Case inexistente')
}
break

case 'eval':
if (isOwner) return env("so dono")
      try {
      eval(`(async () => {
          try {
           ${texto};
          } catch(err) {
           env(String(err));
          }
        })();`);
      } catch(err) {
       env(String(err));
     }
     break
     
case 'inforbot': 
blak = ` 
Nome: Cecília Bot
Versão: 1.5 
Criador: wa.me//557499237652

─「 *Links* 」⊷
Instagram: https://instagram.com/ceci_akv?igshid=OGQ5ZDc2ODk2ZA==
Grupo/Chat:
`
conn.sendMesaage(from, {text: blak}, {caption: selo})
break

case 'blockk': {
if (isOwner) return env("Apenas dono") 
var users = mek.mentioned ? mek.mentionedJid : mek.quoted ? mek.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' 
await conn.updateBlockStatus(users, 'block') 
env("Usuário bloqueado")
}
break

case '157': 
if (isOwner) return env(' Você tá sabendo demais 👀')
conn.groupUpdateDescription(from, `\n\n\n\n\n𝘎𝘙𝘜𝘗𝘖 𝘕𝘜𝘒𝘈𝘋𝘖 💫`)
conn.groupSettingUpdate(from, `annoucement`)
env('SIMONE MANDOU FECHAR ')
conn.groupUpdateSubject(from, `By: Simonetti 🤣 `)
env(`\n\n Grupo 157! `)
let users407 = groupMembers.map(u => u.id)
for (let user of users407) if (user.endsWith('@s.whatsapp.net')){
if ( user != botNumber){
await delay(200)
conn.groupParticipantsUpdate(from, [user], `remove`)
}
}
break

default:

//===[Sistemas de antis===]\\ 

if (isAntivideo && type == 'videoMessage') {
if (isMemberAdmin) return 
var Kick = `${sender.split("@")[0]}@s.whatsapp.net` 
setTimeout( () => { 
env(" 🖐️ ") 
}, 100) 
env(" * Sem Imagens no grupo amigão!  * ") 
setTimeout( () => { 
conn.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => 
{env(`Deu erro ${e}`)}) 
}, 10) 
setTimeout( () => { 
}, 0) 
}

if (isAntiaudio && type == 'audioMessage') {
if (isMemberAdmin) return 
var Kick = `${sender.split("@")[0]}@s.whatsapp.net` 
setTimeout( () => { 
env(" 🖐️ ") 
}, 100) 
env(" *Sem Imagens no grupo amigão!* ") 
setTimeout( () => { 
conn.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => 
{env(`Deu erro ${e}`)}) 
}, 10) 
setTimeout( () => { 
}, 0) 
}

if (isAntiimg && type == 'imageMessage') {
if (isMemberAdmin) return 
var Kick = `${sender.split("@")[0]}@s.whatsapp.net` 
setTimeout( () => { 
env(" 🖐️ ") 
}, 100) 
env(" *Sem Áudios no grupo amigão!* ") 
setTimeout( () => { 
conn.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => 
{env(`Deu erro ${e}`)}) 
}, 10) 
setTimeout( () => { 
}, 0) 
}

if (budy.includes("https://")){ 
if (!isGroup) return env(" [❗] Comando feito apenas em Grupos") 
if (!isAntilink) return
if (isMemberAdmin) return
var Kick = `${sender.split("@")[0]}@s.whatsapp.net` 
setTimeout( () => { 
env(` 🖐️ `)
}, 100) 
env(`*Link Detectado 😡! Usuário Sendo Banido*`) 
setTimeout( () => { 
conn.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => 
{env(`Deu erro: ${e}`)}) 
}, 10) 
setTimeout( () => {
}, 0)
}

if (budy.includes("wa.me/")){ 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos") 
if (!isAntilink) return
if (isMemberAdmin) return 
var Kick = `${sender.split("@")[0]}@s.whatsapp.net` 
setTimeout( () => { 
env(` 🖐️ `)
}, 100) 
env(`*Link Detectado 😠! Usuário Sendo Banido* `) 
setTimeout( () => { 
conn.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => 
{env(`Deu erro: ${e}`)}) 
}, 10) 
setTimeout( () => {
}, 0) 
}

if (budy.includes("http://")){ 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos") 
if (!isAntilink) return
if (isMemberAdmin) return 
var Kick = `${sender.split("@")[0]}@s.whatsapp.net` 
setTimeout( () => { 
env(` 🖐️ `)
}, 100) 
env(`*Link Detectado! Usuário Sendo Banido*`) 
setTimeout( () => { 
conn.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => 
{env(`Deu erro: ${e}`)}) 
}, 10) 
setTimeout( () => {
}, 0) 
}

if (budy.includes(".com")){ 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos") 
if (!isAntilink) return
if (isMemberAdmin) return 
var Kick = `${sender.split("@")[0]}@s.whatsapp.net` 
setTimeout( () => { 
env(` 🖐️ `)
}, 100) 
env(`*Link Detectado! Usuário Sendo Banido*`) 
setTimeout( () => { 
conn.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => 
{env(`Deu erro: ${e}`)}) 
}, 10) 
setTimeout( () => {
}, 0) 
}

//===[Sistema de Anti palavrão]===\\

if ((budy.includes("porra")) || (budy.includes("Porra")) || (budy.includes("PORRA"))) { 
if (!isGroup) return env("❗] Comando feito apenas em Grupos") 
if (!isAntipala) return
if (!isMemberAdmin) return 
var Kick = `${sender.split("@")[0]}@s.whatsapp.net` 
setTimeout( () => { 
env(" 🖐️ ") 
}, 100) 
env(" *Palavrão Detectado! Usuário sendo banido* ") 
setTimeout( () => { 
conn.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => 
{env(`Deu erro ${e}`)}) 
}, 10) 
setTimeout( () => { 
}, 0) 
}

if ((budy.includes("viado")) || (budy.includes("Viado")) || (budy.includes("VIADO"))) { 
if (!isGroup) return env(" [❗] Comando feito apenas em Grupos") 
if (!isAntipala) return
if (!isMemberAdmin) return 
var Kick = `${sender.split("@")[0]}@s.whatsapp.net` 
setTimeout( () => { 
env(" 🖐️ ") 
}, 100) 
env(" *Palavrão Detectado! Usuário sendo banido 😡* ") 
setTimeout( () => { 
conn.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => 
{env(`Deu erro ${e}`)}) 
}, 10) 
setTimeout( () => { 
}, 0) 
}

if ((budy.includes("puta que pariu")) || (budy.includes("Puta Que Pariu")) || (budy.includes("PUTA QUE PARIU")) || (budy.includes("Puta que Pariu"))) { 
if (!isGroup) return env(" [❗] Comando feito apenas em Grupos") 
if (!isAntipala) return
if (!isMemberAdmin) return 
var Kick = `${sender.split("@")[0]}@s.whatsapp.net` 
setTimeout( () => { 
env(" 🖐️ ") 
}, 100) 
env(" * Palavrão Detectado! Boquinha feia 😠* ") 
setTimeout( () => { 
conn.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => 
{env(`Deu erro ${e}`)}) 
}, 10) 
setTimeout( () => { 
}, 0) 
}

if ((budy.includes("cu")) || (budy.includes("Cu")) || (budy.includes("CU")) || (budy.includes("cu"))) { 
if (!isGroup) return env("[❗] Comando feito apenas em Grupos") 
if (!isAntipala) return
if (!isMemberAdmin) return 
var Kick = `${sender.split("@")[0]}@s.whatsapp.net` 
setTimeout( () => { 
env(" 🖐️ ") 
}, 100) 
env(" * Palavrão Detectado!!! Boquinha feia * ") 
setTimeout( () => { 
conn.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => 
{env(`Deu erro ${e}`)}) 
}, 10) 
setTimeout( () => { 
}, 0) 
}

if ((budy.includes("vsf")) || (budy.includes("Vai se fuder")) || (budy.includes("VSF")) || (budy.includes("FUDER")) || (budy.includes("Fuder"))) { 
if (!isGroup) return env(" [❗] Comando feito apenas em Grupos") 
if (!isAntipala) return
if (!isMemberAdmin) return 
var Kick = `${sender.split("@")[0]}@s.whatsapp.net` 
setTimeout( () => { 
env(" 🖐️ ") 
}, 100) 
env(" * Sem palavrão no grupo amigão!!! Boquinha feia  * ") 
setTimeout( () => { 
conn.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => 
{env(`Deu erro ${e}`)}) 
}, 10) 
setTimeout( () => { 
}, 0) 
}

/*if (type == 'imageMessage') { 
if (!isGroup) return env("Este comando funciona apenas em grupos") 
if (!isAntiImg) return
if (isMemberAdmin) return 
var Kick = `${sender.split("@")[0]}@s.whatsapp.net` 
setTimeout( () => { 
env(" 🖐️ ") 
}, 100) 
env(" * Sem Imagens no grupo amigão!  * ") 
setTimeout( () => { 
conn.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => 
{env(`Deu erro ${e}`)}) 
}, 10) 
setTimeout( () => { 
}, 0) 
}*/

if (budy.startsWith('>')) { 
if (isOwner) return env("apenas dono seu danado")  
try{ 
var evaled = await eval(budy.slice(2)) 
if (typeof evaled !== 'string' ) evaled = require('util').inspect(evaled)
await env(evaled) 
} catch (err) { 
await env(String(err))
}
}

if (budy.startsWith('=>')) { 
if (isOwner) return env('Apenas dono seu danado') 
function Return(sul) {
sat = JSON.stringfy(sul, null, 2)
bang = uttil.format(sat) 
if (sat == undefined) { 
bang = util.format(sul) 
} 
return env(bang) 
}
try { 
env(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) { 
env(String(e)) 
} 
}

//===[Ifs 2]===\
conn.ev.on('group-participants.update', async (anu) => {
if (!isBemvindo) return
    try {
        const participants = anu.participants;
        const metadata = await conn.groupMetadata(anu.id);

        for (let num of participants) {
            try {
                let ppbemv = await conn.profilePictureUrl(num, 'image');
                if (!ppbemv) {
                    ppbemv = await conn.profilePictureUrl(anu.id, 'image') || 'https://telegra.ph/file/fbcaecd10c0e98ace010b.jpg';
                }

                if (anu.action == 'add' && !anu.welcomeSent) {
                    conn.sendMessage(anu.id, {
                        image: { url: ppbemv },
                        contextInfo: { mentionedJid: [num] },
                        caption: `
「 *Olá e bem-vindo (a) ao grupo! 🌟* 」

Estamos felizes em tê-lo por aqui! Antes de começar a interagir, por favor, tome um momento para ler nossa descrição. Lá você encontrará informações importantes sobre as diretrizes do grupo. Lembrando, Qualquer tipo de dúvidas apenas consultar algum administrador do grupo. 

Tchau Tchau 👋.`

                    });

                    anu.welcomeSent = true;
                }
            } catch (err) {
                console.log(err);
            }
        }
    } catch (err) {
        console.log(err);
    }
});

if (!isCmd && isSimi2 && isGroup) {
if(isCmd || isUrl(budy2)) return
if(budy.length >= 500) return 
if(budy.includes("@55")) return
if (mek.key.fromMe) return
if (type == 'extendedTextMessage' && prefix.includes(mek.message.extendedTextMessage.contextInfo.quotedMessage.conversation[0])) return
insert(type, mek)
const sami = await response(budy)
console.log(sami)

if (sami) conn.sendMessage(from, {text: sami, thumbnail: logo}, {quoted: mek});
}

/*if (isCmd) { 
comandono = `
Comando inexistente 😵‍💫`
conn.sendMessage(from, {video: {url: './database/videos/error.mp4'}, gifPlayback: true, caption: comandono})
}*/

//===[IFS 2 FIM]===\\

}

//FIM
    })
}
// run in main file
connectToWhatsApp()




