const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const md5 = require('md5');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello browser');
});

app.post('/login', (req,res) =>{
    console.log(JSON.stringify(req.body));
    if(req.body.userName == "A" && md5(req.body.password) == "9d5ed678fe57bcca610140957afab571"){
        res.send("Welcome!")
    } else{
        res.send("who are you?");
    }
});

app.listen(port, ()=>{});
