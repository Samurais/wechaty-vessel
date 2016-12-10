/**
 * Message Model
 */
// https://github.com/Appsilon/styleguide/wiki/mongoose-typescript-models
import {mongoose} from '../services/database.service';

interface IMessage {
    from: string;
    to: string;
    group: string;
};

interface IMessageModel extends IMessage, mongoose.Document { }

var messageSchema = new mongoose.Schema({
    from: String,
    to: String,
    group: String
});

var Message = mongoose.model<IMessageModel>("Message", messageSchema);

export {IMessage, IMessageModel, Message};