require('dotenv').config();
const mongoose = require("mongoose");
const mongoURL = process.env.MONGODB_URL;

const MessageModel = require("../models/Message");
const getMessages = (user_id) => MessageModel.find({
    user_id
}).then(res => res).catch(err => console.log(err));

//Starting mongo connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) return console.log(err);

    console.log(`MongoDB connected successfully ${mongoURL}`)
});

module.exports = {
    getMessages
}