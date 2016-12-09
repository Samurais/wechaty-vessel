/**
 *
 */
import { test } from 'ava';
import davidapi from '../services/davidapi.service';

test('QA', t => {
  let a = davidapi.getAnswer('soo');
  console.log('Get answer', a);
  t.pass();
})