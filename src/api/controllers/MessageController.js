
const MessageModel = require("../models/Message");

const getMessages = (user_id) => MessageModel.find({
    user_id
})

const postMessage = ({
    user_id,
    text,
    created_on
}) => MessageModel.create({
    user_id,
    text,
    created_on,
    updated_at: null
})

module.exports = {
    getMessages,
    postMessage
}