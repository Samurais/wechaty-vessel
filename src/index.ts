/**
 * Index 
 */

/* tslint:disable:variable-name */
import config from './config/environment';
import logging from './services/logging';
import { Wechaty, log, Config, Message } from 'wechaty';
const logger = logging.getLogger('app');
const QrcodeTerminal = require('qrcode-terminal')
const nodeCleanup = require('node-cleanup')
const welcome = `
                   _           _                                      _ 
__      _____  ___| |__   __ _| |_ _   _     __   _____  ___ ___  ___| |
\\ \\ /\\ / / _ \/ __|  '_ \\ / _\` | __| | | |____\\ \\ / \\/ _ \\/ __/ __|/ _ \\ |
 \\ V  V /  __/ (__| | | | (_| | |_| |_| |_____\\ V /  __/\\__ \\__ \\  __/ |
  \\_/\\_/ \\___|\\___|_| |_|\\__,_|\\__|\\__, |      \\_/ \\___||___/___/\\___|_|
                                   |___/                                
=============== Powered by wechaty-vessel ===============
-------- https://github.com/Samurais/wechaty-vessel--------
__________________________________________________

Hope you like it, and you are very welcome to
upgrade me for more super powers!

Please wait... I'm trying to login in...

`

logger.info(welcome)
const bot = Wechaty.instance({ profile: Config.DEFAULT_PROFILE })

bot
    .on('login', user => log.info('Bot', `${user.name()} logined`))
    .on('logout', user => log.info('Bot', `${user.name()} logouted`))
    .on('error', e => log.info('Bot', 'error: %s', e))
    .on('scan', (url, code) => {
        if (!/201|200/.test(String(code))) {
            let loginUrl = url.replace(/\/qrcode\//, '/l/')
            QrcodeTerminal.generate(loginUrl)
        }
        logger.info(`${url}\n[${code}] Scan QR Code in above url to login: `)
    })
    .on('message', m => {
        try {
            const room = m.room()
            logger.debug((room ? '[' + room.topic() + ']' : '')
                + '<' + m.from().name() + '>'
                + ':' + m.toStringDigest()
            )

            if (/^(ding|ping|bing)$/i.test(m.content()) && !m.self()) {
                m.say('dong')
                logger.info('Bot', 'REPLY: dong')
            }
        } catch (e) {
            logger.error('Bot', 'on(message) exception: %s', e)
        }
    })

bot.init()
    .then(() => {
        bot.say('Wechaty init')
    })
    .catch(e => {
        log.error('Bot', 'init() fail: %s', e)
        bot.quit()
        process.exit(-1)
    })

nodeCleanup((reason, code) => {
    const exitMsg = `Wechaty exit ${code} because of ${reason} `
    logger.info(exitMsg)
    bot.say(exitMsg)
})
