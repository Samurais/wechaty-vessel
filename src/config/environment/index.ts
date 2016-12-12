'use strict';

const path = require('path');
const _ = require('lodash');

let env = process.env.NODE_ENV || 'development';
env = env.toLowerCase();

var all = {
    env: env,
    root: path.normalize(__dirname + '/../..'),
    davidapi: {
        baseUrl: '',
        username: '',
        password: ''
    },
    mongo:{
        uris: '',
        options: {}
    }
};

export default _.merge(all, require('./' + env).default || {});