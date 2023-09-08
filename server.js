var express = require('express');
var app = express();
var playerPoint1 = 0;
var playerPoint2 = 0;
var computer = 0;

var express = require('express');
var app = express();
var idCounter = 0;

app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("New express client");
    console.log("Received: ");
    console.log(JSON.parse(req.query['data']));
    var z = JSON.parse(req.query['data']);
    if (z['action']=='singlePlayer') {
        var player_Choice = z['player_Choice'];
        singlePlayer(player_Choice);
        var jsontext = JSON.stringify({
            'action':singlePlayer,
            'computerPoint': computer,
            'playerPoint1': playerPoint1
        });
    } else {
        res.send(JSON.stringify({ 'msg': 'error!!!' }));
    }
    res.send(jsontext);
}).listen(3000);
console.log("Server is running!");

function singlePlayer(player_Choice){
    var comp = randomGenerator();
        if(player_Choice==comp){
            console.log("TIE");
        }else if(player_Choice==1&&comp==2||player_Choice==2&&comp==3||player_Choice==3&&comp==1){
            console.log("LOSE");
            computer++;
        }else{
            console.log("WIN");
            playerPoint1++;
          }
}

function randomGenerator(){
    return Math.floor(Math.random()*3 + 1);
}