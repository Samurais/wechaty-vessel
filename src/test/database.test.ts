/**
 *
 */
import { test } from 'ava';
import { database } from '../services/database.service';
// import config from '../config/environment';

test.skip.cb('Database Test', t => {
    console.log(typeof database);
    console.log('foo');
});