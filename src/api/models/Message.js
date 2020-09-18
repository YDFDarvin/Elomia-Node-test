const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageScheme = new Schema({
    user_id: String,
    text: String,
    created_on: Date,
    updated_at: Date
}, {versionKey: false});

const MessageModel = mongoose.model("Messages", messageScheme);

module.exports = MessageModel;