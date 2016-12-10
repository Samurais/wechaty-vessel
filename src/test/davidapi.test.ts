/**
 *
 */
import { test } from 'ava';
import { DavidAPI } from '../services/davidapi.service';
import config from '../config/environment';

let davidapi = new DavidAPI(config.davidapi.baseUrl,
  config.davidapi.username,
  config.davidapi.password);

test.skip.cb('DavidAPI Test#getAnswer', t => {
  let question: string = 'yes';
  davidapi.getAnswer(question)
    .then(function (res) {
      console.log(`Get answer of "${question}": `, res);
      t.pass();
      t.end();
    })
    .catch(function (err) {
      t.fail(err);
      t.end();
    });
});