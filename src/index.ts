/**
 * Index 
 */
import config from './config/environment';
const log4js = require('log4js');
const logger = log4js.getLogger();

logger.info('log4js', config.env);