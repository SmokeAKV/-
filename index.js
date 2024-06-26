const { 
default:
makeWASocket, AnyMessageContent, BinaryInfo, delay, DisconnectReason, encodeWAM, fetchLatestBaileysVersion, getAggregateVotesInPollMessage, makeCacheableSignalKeyStore, jidDecode, makeInMemoryStore, PHONENUMBER_MCC, proto, useMultiFileAuthState, WAMessageContent, WAMessageKey } = require('@whiskeysockets/baileys')
const { Boom }  = require("@hapi/boom");

const axios = require("axios");

const crypto = require("crypto");

const util = require("util");

const NodeCache = require("node-cache");

const readline = require('readline')

const linkfy = require("linkifyjs");

const chalk = require('chalk');

const request = require("request");

const ms = require("ms");

const FileType = require('file-type');

const ffmpeg = require("fluent-ffmpeg");

const { exec, spawn, execSync } = require("child_process");

const moment = require("moment-timezone");

const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./db/js/exif')

const time = moment.tz("America/Sao_Paulo").format("HH:mm:ss");

const hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss");

const date = moment.tz("America/Sao_Paulo").format("DD/MM/YY");

const P = require('pino')

const MAIN_LOGGER = P({ timestamp: () => `,"time":"${new Date().toJSON()}"` })

const fs = require('fs')

const pino = require('pino')

const cfonts = require('cfonts')

const useMobile = process.argv.includes('--mobile')

const logger = MAIN_LOGGER.child({})

logger.level = 'trace'

const banner = cfonts.render(('Ceci|bot'), {
                font: 'block',
                color: 'system',
                align: 'center',
                gradient: ["red","yellow"],
                lineHeight: 2
                })


const msgRetryCounterCache = new NodeCache();
const usePairingCode = process.argv.includes("--use-pairing-code")

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

// start a connection
async function connectToWhatsApp() {
	const { state, saveCreds } = await useMultiFileAuthState('./db/conexão')
	// fetch latest version of WA Web
	const { version, isLatest } = await fetchLatestBaileysVersion()

console.log(banner.string)
	const conn = makeWASocket({
		version,
		logger: pino({level: "silent"}),
		printQRInTerminal: !usePairingCode,
		mobile: useMobile,
		auth: state,
		msgRetryCounterCache,
		patchMessageBeforeSending: (message) => {
         const requiresPatch = !!(
            message?.interactiveMessage
         );
         if (requiresPatch) {
            message = {
               viewOnceMessage: {
                  message: {
                     messageContextInfo: {
                        deviceListMetadataVersion: 2,
                        deviceListMetadata: {},
                     },
                     ...message,
                  },
               },
            };
         }
         return message;
      }
		
	})

	// Pairing code for Web clients
	if (usePairingCode && !conn.authState.creds.registered) {
      const phoneNumber = await question(`\nDigite seu número do WhatsApp:\nEx: ${chalk.green("5574999237652")}\n${chalk.yellow("➜")} `);
      const code = await conn.requestPairingCode(phoneNumber);
      console.log(`Seu código de conexão é: ${chalk.red(code)}\n`);
      console.log(`Abra seu WhatsApp, vá em ${chalk.yellow("Aparelhos Conectados > Conectar um novo Aparelho > Conectar usando Número.")}`)
   }

		

	conn.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
        mek = chatUpdate.messages[0]
        if (!mek.message) return
        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return
        if (!conn.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
        if (mek.key.id.startsWith('FatihArridho_')) return
        require("./main")(conn, mek, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    });
    
        // responde comandos de enquete
    async function getMessage(key){
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message
        }
        return {
            conversation: "Ola sou a ceci bot"
        }
    }
    conn.ev.on('messages.update', async chatUpdate => {
        for(const { key, update } of chatUpdate) {
			if(update.pollUpdates && key.fromMe) {
				const pollCreation = await getMessage(key)
				if(pollCreation) {
				    const pollUpdate = await getAggregateVotesInPollMessage({
							message: pollCreation,
							pollUpdates: update.pollUpdates,
						})
	                var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
	                if (toCmd == undefined) return
                    var prefCmd = prefix+toCmd
	                conn.appenTextMessage(prefCmd, chatUpdate)
				}
			}
		}
    })
    
        // configuracoes
    conn.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    conn.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = conn.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })
    
    conn.public = true

    
    conn.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    const shouldReconnect = new Boom(lastDisconnect?.error)?.output.statusCode
    if (connection === 'close') {
          
                let reason = new Boom(lastDisconnect?.error)?.output.statusCode
                    if (reason === DisconnectReason.badSession) { console.log(`Arquivo de sessão inválido, exclua a sessão e verifique novamente ${chalk.red(`${reason}|${lastDisconnect?.error}`)}`); conn.logout(); }
                    else if (reason === DisconnectReason.connectionClosed) { console.log("Conexão encerrada, reconectando...."); startZyon(); }
                    else if (reason === DisconnectReason.connectionLost) { console.log("Conexão perdida do servidor, reconectando..."); startZyon(); }
                    else if (reason === DisconnectReason.connectionReplaced) { console.log("Conexão substituída, outra nova sessão aberta, feche a sessão atual primeiro"); conn.logout(); }
                    else if (reason === DisconnectReason.loggedOut) { console.log(`Dispositivo desconectado, verifique novamente e execute.`); conn.logout(); }
                    else if (reason === DisconnectReason.restartRequired) { console.log("Nessesario reiniciar, reiniciando..."); startZyon(); }
                    else if (reason === DisconnectReason.timedOut) { console.log("Nessesario reiniciar, reiniciando..."); startZyon(); }
                    else if (reason === DisconnectReason.Multidevicemismatch) { console.log("Erro escaneie novamente"); conn.logout(); }
                    else conn.end(`Motivo Desconectado Desconhecido: ${reason}|${connection}`)
                } 
                 if (update.connection == "open" || update.receivedPendingNotifications == "true") {
        console.log(`${chalk.red("➜")} ${chalk.yellow("conectado ao conn")}`);
    }
  });
  
  
conn.ev.on('group-participants.update', async (anu) => {
try {
let metadata = await conn.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
                // pega foto do usuario
                try {
                    ppuser = await conn.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://tinyurl.com/yx93l6da'
                }

                // pega foto do grupo
                try {
                    ppgroup = await conn.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://tinyurl.com/yx93l6da'
                }
                prefix = '/'
                marca = `@${num.split('@')[0]}`
                grupo = `${metadata.subject}`
               

                if (anu.action == 'add') {
                   conn.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `Seja bem vindo(a) ao nosso grupo @${num.split('@')[0]}`})
                } else if (anu.action == 'remove') {
                   conn.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `「💡」 Tchau @${num.split("@")[0]}  👋\ntomara q nao se arrependa😔~~` })
                }
            }
        } catch (err) {
            console.log(err)
        }
    })
  
  

  conn.ev.on("creds.update", saveCreds);
  
  
  conn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
	let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // salva alteracoes e arquios
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }
    
    conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
    
    
  rl.close()
  return conn;
}

connectToWhatsApp()