require('dotenv').config();
const express = require("express");
const app = express();

const serverPort = process.env.PORT || 9999;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

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
        .then((data) => res.send(data))
        .catch(err => {
            console.trace(err)
            res.status(500).send("Can not to get messages!");
        })
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
            .then((res) => res.status(200).send("Successfully added!"))
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