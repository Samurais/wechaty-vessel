/**
 * Database management
 */
import * as mongoose from 'mongoose';
import logging from './logging.service';
import config from '../config/environment';
const logger = logging.getLogger('database.service');

// 链接数据库
mongoose.connect(config.mongo.uris, config.mongo.options);
let database = mongoose.connection;
database.on('connected', function() {
    logger.info('[MonoDB]:连接');
});
database.once('open', function() {
    logger.info('[MonoDB]:打开'); /*global.gfs = Grid(database.db);*/
});
database.on('error', function(err) {
    logger.error(err);
});
database.on('disconnected', function() {
    logger.warn('[MonoDB]:断开');
});
database.on('reconnected', function() {
    logger.info('[MonoDB]:重连');
});
process.on('SIGINT', function() {
    database.close(function() {
        logger.info('[MonoDB]: APP中断');
        process.exit(0);
    });
});

export {database, mongoose};