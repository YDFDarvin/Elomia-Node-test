require('dotenv').config();
const express = require("express");
const events = require('events');

const app = express();
const messageEventEmitter = new events.EventEmitter();

const serverPort = process.env.PORT || 9999;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
    getMessages,
    postMessage,
} = require("./src/api/controllers/MongoDBController");

//ROUTE get messages of SELECTED used by user_id from field 'user'
app.get("/api/:user/messages", (req, res) => {
    //GET messages Mongo API method
    const user_id = req.params.user;
    const messages = getMessages(user_id);

    messages
        .then((data) => res.status(200).send(data))
        .catch(err => {
            console.trace(err)
            res.status(500).send("Can not to get messages!");
        })
});

//ROUTE get last new message with long-polling
app.get("/api/:user/messages/new", (req, res) => {
    //GET messages Mongo API method
    const user_id = Number.parseInt(req.params.user);

    messageEventEmitter.once('newMessage', (message) => {
        if (user_id === message.user_id) {
            console.log('resending')
            res.status(200).send(message);
        } else {
            res.status(404).send();
        }
    });
});

//ROUTE post message of user
app.post("/api/send", (req, res) => {
    const body = req.body;

    if (body.text && body.created_on && body.user_id) {
        postMessage({
            user_id: body.user_id,
            text: body.text,
            created_on: body.created_on
        })
            .then(() => {
                messageEventEmitter.emit('newMessage', body);
                res.status(200).send("Successfully added!")
            })
            .catch((err) => {
                console.trace(err);
                res.status(500).send("Saving was dumped!")
            })
    } else {
        res.status(400).send("Wrong Data");
    }
});

//Server launch
app.listen(serverPort, function(){
    console.log(`Server Has been started on ${serverPort}`);
});