import { test } from 'ava';
import *  as  MessageModel from '../models/message.model';
let Message = MessageModel.Message;

test.only('Message Test', async t => {
  console.log('saving ...');
  try {
    let msg = await (new Message({
      agent: 'foo',
      channel: 'bar',
      sender: 'send',
      recipient: 'foo',
      group: 'ss',
      textMessage: 'foo'
    })).save();
    console.log('saved', JSON.stringify(msg));
    t.pass();
  } catch (e) {
    t.fail(e);
  }
});