const {
    newMessageEvent
} = require('../consts');

const {
    getMessages,
    postMessage,
} = require("../api/controllers/MongoDBController");

module.exports.GETMessagesRoute = (req, res) => {
    //GET messages Mongo API method
    const user_id = req.params.user;
    const messages = getMessages(user_id);

    messages
        .then((data) => res.status(200).send(data))
        .catch(err => {
            console.trace(err)
            res.status(500).send("Can not to get messages!");
        })
}

module.exports.GETLastMessageRoute = (messageEventEmitter) => (req, res) => {
    //GET messages Mongo API method
    const user_id = Number.parseInt(req.params.user);

    messageEventEmitter.once(newMessageEvent, (message) => {
        if (user_id === message.user_id) {
            res.status(200).send(message);
        } else {
            res.status(404).send();
        }
    });
}

module.exports.POSTMessage = (messageEventEmitter) =>  (req, res) => {
    const body = req.body;

    if (body.text && body.created_on && body.user_id) {
        postMessage({
            user_id: body.user_id,
            text: body.text,
            created_on: body.created_on
        })
            .then(() => {
                messageEventEmitter.emit(newMessageEvent, body);
                res.status(200).send("Successfully added!")
            })
            .catch((err) => {
                console.trace(err);
                res.status(500).send("Saving was dumped!")
            })
    } else {
        res.status(400).send("Wrong Data");
    }
}