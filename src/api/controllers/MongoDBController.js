require('dotenv').config();
const mongoose = require("mongoose");
const mongoURL = process.env.MONGODB_URL;

//Starting mongo connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) return console.log(err);

    console.log(`MongoDB connected successfully ${mongoURL}`)
});

const MessageController = require('./MessageController');

module.exports = {
    ...MessageController,
}