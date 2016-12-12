/**
 * Database management
 */
import * as mongoose from 'mongoose';
import logging from './logging.service';
import config from '../config/environment';
const logger = logging.getLogger('database.service');
mongoose.Promise = Promise;

// 链接数据库
mongoose.connect(config.mongo.uris, config.mongo.options);
let database = mongoose.connection;
database.on('connected', function() {
    logger.info('[MongoDB]: connected.');
});
database.once('open', function() {
    logger.info('[MongoDB]: opened.'); /*global.gfs = Grid(database.db);*/
});
database.on('error', function(err) {
    logger.error(err);
});
database.on('disconnected', function() {
    logger.warn('[MongoDB]: disconnected.');
});
database.on('reconnected', function() {
    logger.info('[MongoDB]: reconnected.');
});
process.on('SIGINT', function() {
    database.close(function() {
        logger.info('[MongoDB]: App exits.');
        process.exit(0);
    });
});

export {database, mongoose};