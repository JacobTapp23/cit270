const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs')

const port = 443;
const md5 = require('md5');

const app = express();

let badLoginAttempts = 0;

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello HTTPS');
});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app).listen(port, () => {
    console.log('Listening...')
  });

app.post('/login', (req,res) =>{
    console.log(JSON.stringify(req.body));
    if(req.body.userName == "A" && md5(req.body.password) == "9d5ed678fe57bcca610140957afab571"){
        res.send("Welcome!")
    } else{
        badLoginAttempts ++;
        console.log(badLoginAttempts + " invalid attempts")
        res.status(401);//no good
        res.send("New API who dis?");
    }
});

// app.listen(port, ()=>{});