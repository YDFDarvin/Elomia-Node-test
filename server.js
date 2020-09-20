require('dotenv').config();
const express = require("express");
const events = require('events');

const app = express();

const messageEventEmitter = new events.EventEmitter();

const serverPort = process.env.PORT || 9999;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
    GETMessagesRoute,
    GETLastMessageRoute,
    POSTMessage
} = require("./src/routes");

//ROUTE get messages of SELECTED used by user_id from field 'user'
app.get("/api/:user/messages", GETMessagesRoute);

//ROUTE get last new message with long-polling
app.get("/api/:user/messages/new", GETLastMessageRoute(messageEventEmitter));

//ROUTE post message of user
app.post("/api/send", POSTMessage(messageEventEmitter));

//Server launch
app.listen(serverPort, function(){
    console.log(`Server Has been started on ${serverPort}`);
});