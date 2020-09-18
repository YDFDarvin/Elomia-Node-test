require('dotenv').config();
const express = require("express");
const app = express();
const jsonParser = express.json();

const serverPort = process.env.PORT || 9999;

app.use(express.static(__dirname + "/public"));

const {
    getMessages,
} = require("./src/api/controllers/MongoDBController");

//routes
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

/*app.get("/api/users/:id", function(req, res){

    const id = req.params.id;
    User.findOne({_id: id}, function(err, user){

        if(err) return console.log(err);
        res.send(user);
    });
});

app.post("/api/users", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    const user = new User({name: userName, age: userAge});

    user.save(function(err){
        if(err) return console.log(err);
        res.send(user);
    });
});*/

//Server launch
app.listen(serverPort, function(){
    console.log(`Server Has been started on ${serverPort}`);
});