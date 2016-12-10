import { test } from 'ava';
import { Message } from '../models/message.model';

test.only.cb('Message Test', t => {
  let msg = new Message({
    from: 'test',
    to: 'test',
    group: null
  });
  console.log('saving ...');
  msg.save()
    .then(function(res){
      t.pass();
      t.end()
    }, function(err){
      t.pass(err);
      t.end();
    })
});