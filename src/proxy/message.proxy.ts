/**
 * Message management
 */

import config from '../config/environment';
import logging from '../services/logging.service';
import { DavidAPI } from '../services/davidapi.service';
import * as Wechaty from 'wechaty';
// Message Database Access Object
import * as MessageDAO from '../models/message.model';
const _ = require('lodash');

const logger = logging.getLogger('message.proxy');
let davidapi = new DavidAPI(config.davidapi.baseUrl,
  config.davidapi.username,
  config.davidapi.password);

const channel = 'weixin-agent';

/**
 * @param {Wechaty.Message} m
 */
export function save(botName: string, m: Wechaty.Message) {
  const room = m.room();
  const sender = m.from().name();
  const group = room ? room.topic() : null;
  const recipient = null;
  const textMessage = m.content();
  (new MessageDAO.Message({
    agent: botName,
    channel: channel,
    sender: sender,
    recipient: recipient,
    group: group,
    textMessage: textMessage
  })).save(() => {
    logger.debug('save', 'done');
  }, function (err) {
    logger.error('save', err);
  });
}

/**
 * @param {Wechaty.Message} m
 */
export async function reply(botName: string, m: Wechaty.Message) {
  const room = m.room();
  try {
    let response: any = null;
    if (room && _.includes(m.content(), '@' + botName)) {
      // a group message and @me
      let plainMessage = _.trim(_.replace(m.content(), '@' + botName, ''));
      response = await davidapi.getAnswer(plainMessage);
    } else if (!room) {
      // just a private message
      response = await davidapi.getAnswer(m.content());
    } else {
      // a group message but not @me
      logger.debug('keep slient.');
    }

    if (response)
      m.say(response);
    logger.debug('reply', (room ? '[' + room.topic() + ']' : '')
      + '<' + m.from().name() + '>'
      + ':' + m.toStringDigest() 
      + '<< ' + response
    );
  } catch (e) {
    logger.error('reply', e);
  }
}