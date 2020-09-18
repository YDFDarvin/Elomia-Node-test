require('dotenv').config();
const express = require("express");
const app = express();
const jsonParser = express.json();

const serverPort = process.env.PORT || 9999;

app.use(express.static(__dirname + "/public"));

const {
    getMessages,
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

});



//Server launch
app.listen(serverPort, function(){
    console.log(`Server Has been started on ${serverPort}`);
});