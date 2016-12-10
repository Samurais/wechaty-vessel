/**
 *
 */
import { test } from 'ava';
import davidapi from '../services/davidapi.service';

test.cb('QA', t => {
  davidapi.getAnswer('soo')
    .then(function (res) {
      console.log('Get answer', res);
      t.pass();
      t.end();
    })
    .catch(function (err) {
      t.fail(err);
      t.end();
    });
})