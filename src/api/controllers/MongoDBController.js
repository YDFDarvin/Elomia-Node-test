const MessageModel = require("../models/Message");

const getMessages = () => MessageModel.find({}).then(res => res).catch(err => throw Error(err));

module.exports = mongoose;