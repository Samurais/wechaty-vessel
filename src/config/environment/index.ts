'use strict';

const path = require('path');
const _ = require('lodash');

let env = process.env.NODE_ENV || 'development';
env = env.toLowerCase();

var all = {
    env: env,
    root: path.normalize(__dirname + '/../..'),
    botName: "Aaron",
    davidapi: {
        baseUrl: '',
        username: '',
        password: ''
    }
};

export default _.merge(all, require('./' + env).default || {});