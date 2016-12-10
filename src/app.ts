/**
 * Index 
 */

/* tslint:disable:variable-name */
import config from './config/environment';
import logging from './services/logging.service';
import { Wechaty, log, Config, Message } from 'wechaty';
import { DavidAPI } from './services/davidapi.service';
const logger = logging.getLogger('app');
const _ = require('lodash');
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
let davidapi = new DavidAPI(config.davidapi.baseUrl,
    config.davidapi.username,
    config.davidapi.password);
logger.info(welcome);
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
    .on('message', (m: Message) => {
        try {

            if (m.self()) { return }
            const room = m.room();
            logger.debug((room ? '[' + room.topic() + ']' : '')
                + '<' + m.from().name() + '>'
                + ':' + m.toStringDigest()
            );
            if (room && _.includes(m.content(), '@' + config.botName)) {
                // a group message and @me
                let plainMessage = _.trim(_.replace(m.content(), '@' + config.botName, ''));
                davidapi.getAnswer(plainMessage).then(function(result: string) {
                    m.say(result);
                })
                    .catch(function(err) {
                        logger.error('davidapi.getAnswer', err);
                    });
            } else if (!room) {
                // just a private message
                davidapi.getAnswer(m.content()).then(function(result: string) {
                    m.say(result);
                })
                    .catch(function(err) {
                        logger.error('davidapi.getAnswer', err);
                    });
            } else {
                // a group message but not @me
                logger.debug('keep slient.');
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
