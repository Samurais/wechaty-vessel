/**
 * Message Model
 */
// https://github.com/Appsilon/styleguide/wiki/mongoose-typescript-models
import {mongoose} from '../services/database.service';
import * as timestamps from 'mongoose-timestamp';

interface IMessage {
    sender: string;
    recipient: string;
    group: string;
    channel: string;
    agent: string;
    textMessage: string;
};

interface IMessageModel extends IMessage, mongoose.Document { }

var messageSchema = new mongoose.Schema({
    sender: String,
    recipient: String,
    group: String,
    channel: String,
    agent: String,
    textMessage: String
});

messageSchema.plugin(timestamps);

var Message = mongoose.model<IMessageModel>("Message", messageSchema);

export {IMessage, IMessageModel, Message};