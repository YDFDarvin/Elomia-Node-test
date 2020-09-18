require('dotenv').config();
const express = require("express");
const app = express();
const jsonParser = express.json();

const mongoose = require("./src/api/controllers/MongoDBController")

const mongoURL = process.env.MONGODB_URL;
const serverPort = process.env.PORT || 9999;

app.use(express.static(__dirname + "/public"));

const {
    getMessages,
} = require("./src/api/controllers/MongoDBController");

//Starting mongo connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) return console.log(err);

    console.log(`MongoDB connected successfully ${mongoURL}`)
});

//routes
app.get("/api/messages", (req, res) => {
    //GET messages Mongo API method
    const messages = getMessages()

    console.log(messages)

/*
    if(err) return console.log(err);
    res.send(users)*/

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