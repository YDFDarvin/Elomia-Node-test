const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageScheme = new Schema({name: String, age: Number}, {versionKey: false});
const MessageModel = mongoose.model("Message", messageScheme);

module.exports = MessageModel;