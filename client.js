const rps = ["ROCK", "PAPER", "SCISSOR"];

var single_or_multi;
var firstName = "";
var secondName = "";
var playerPoint1 = 0;
var playerPoint2 = 0;
var computer = 0;
var playerOne;
var playerTwo;
var onePressed = false;
var twoPressed = false;
//var url = "http://indigo.eecs.yorku.ca:3000/post";
var url = "http://localhost:3000/post";



var myName;

window.onload = function()
{
    $("button").click(function(){
        var newDiv = document.createElement("div");
        $("#container").replaceWith(newDiv);
        $(newDiv).attr("id", "container");
        $(newDiv).append("<h1>1P or 2P</h1>")
        var buttonDiv = document.createElement("div");
        $(newDiv).append(buttonDiv);
        $(buttonDiv).attr("class", "buttonContainer");
        var buttonDiv2 = document.createElement("div"); 
        $(buttonDiv).append(buttonDiv2);
        $(buttonDiv2).attr("class", "inner-buttonContainer");
        //create Two buttons for selecting numbers of players
        for(i = 1; i <= 2; i ++){
            var newButton = document.createElement("button");
            $(buttonDiv2).append(newButton);
            $(newButton).attr("id", i);
            $(newButton).html(i + " Player");
        }
        $("button").click(function(event){
            playerNumberSelection(event.target.id);
        });
    });
    
}

function playerNumberSelection(playerChoice){
    single_or_multi = playerChoice;
    if(playerChoice==1){
        var newDiv = document.createElement("div");
        $("#container").replaceWith(newDiv);
        $(newDiv).attr("id", "container");
        var newNav = document.createElement("nav");
        $(newDiv).append(newNav);
        var scoreboardDiv = document.createElement("div");
        $(scoreboardDiv).attr("class", "scoreBoard");
        $(newNav).append(scoreboardDiv);
        //create scoreboard
        var playerPoint = document.createElement("h1");
        $(playerPoint).attr("id", "playerPoint");
        var divider = document.createElement("h1");
        var computerPoint = document.createElement("h1");
        $(computerPoint).attr("id", "computerPoint");
        $(scoreboardDiv).append(playerPoint);
        $(scoreboardDiv).append(divider);
        $(scoreboardDiv).append(computerPoint);
        $(playerPoint).html("0");
        $(divider).html(":");
        $(computerPoint).html("0");
        //create image of hands
        var leftImg = document.createElement("img");
        $(leftImg).attr("src","img/ROCK_L.png");
        $(leftImg).attr("class", "left_img")
        $(leftImg).attr("id", "left_img")
        $(newDiv).append(leftImg);
        var rightImg = document.createElement("img");
        $(rightImg).attr("src","img/ROCK_R.png");
        $(rightImg).attr("class", "right_img")
        $(rightImg).attr("id", "right_img")
        $(newDiv).append(rightImg);


        //create div buttons for rock paper scissor
        var newDiv2 = document.createElement("div");
        $(newDiv2).attr("class", "singleSelection");
        $(newDiv).append(newDiv2);
        var buttonDiv = document.createElement("div");
        $(newDiv2).append(buttonDiv);
        $(buttonDiv).attr("class", "buttonContainer");
        $(buttonDiv).css("top", "90%");
        for(i = 1; i <= 3; i ++){
            var newButton = document.createElement("button");
            $(buttonDiv).append(newButton);
            $(newButton).attr("id", i);
            $(newButton).html(rps[i-1]);
        }
        $("button").click(function(event){
            singlePlayer(event.target.id);
            console.log(rps[event.target.id]);
        });

    }else{
        var newDiv = document.createElement("div");
        $("#container").replaceWith(newDiv);
        $(newDiv).attr("id", "container");
        var newDiv2 = document.createElement("div");
        $(newDiv2).attr("class", "singleSelection");
        $(newDiv).append(newDiv2);
        var buttonDiv = document.createElement("div");
        $(newDiv2).append(buttonDiv);
        $(buttonDiv).attr("class", "buttonContainer");
        //create input for player name
        var label1 = document.createElement("label");
        $(label1).attr("for", "fname");
        $(label1).html("1: ")
        $(buttonDiv).append(label1);
        var newinput = document.createElement("input");
        $(newinput).attr("type", "text");
        $(newinput).attr("name", "fname");
        $(newinput).attr("placeholder", "Player1 Name");
        $(newinput).attr("id", "firstPlayerName");
        $(buttonDiv).append(newinput);
        $(newinput).keyup(function(){
            firstName = $(this).val();
        })

        $(buttonDiv).append("</br>");
        $(buttonDiv).append("</br>");
        //create input for second player name
        var label2 = document.createElement("label");
        $(label2).attr("for", "sname");
        $(label2).html("2: ")
        $(buttonDiv).append(label2);
        var newinput2 = document.createElement("input");
        $(newinput2).attr("type", "text");
        $(newinput2).attr("name", "sname");
        $(newinput2).attr("placeholder", "Player2 Name");
        $(newinput2).attr("id", "secondPlayerName");
        $(buttonDiv).append(newinput2);
        $(newinput2).keyup(function(){
            secondName = $(this).val();
        })
        $(buttonDiv).append("</br>");
        $(buttonDiv).append("</br>");

        var newButton = document.createElement("button");
        $(newButton).html("START GAME");
        $(buttonDiv).append(newButton);
        $("button").click(function(){
            if(firstName==""||secondName==""){
                alert("Please type in a name for both players!");
            }else{
                multiPlayerGame();
            }
        });
    }


}

/**
 * @param {1, 2, or 3 depending on what the user choose} choice 
 * Post: outputs who wins
 */
function singlePlayer(choice){
    var winner;
    //attempt on requesting data from server which did not work as attempted
     $.post(
        url+'?data='+JSON.stringify({
        'action':'singlePlayer', 
        'player_Choice':choice,
        }),
        response
      );
    var comp = randomGenerator();
    if(choice==comp){
        console.log("TIE");
    }else if(choice==1&&comp==2||choice==2&&comp==3||choice==3&&comp==1){
        console.log("LOSE");
        computer++;
        $("#computerPoint").html(computer);
    }else{
        console.log("WIN");
        playerPoint1++;
        console.log(playerPoint1)
        $("#playerPoint").html(playerPoint1);
    }
    //displays the right image for the chosen rock paper or scissor
    $("#left_img").attr("src","img/"+rps[choice - 1]+"_L.png");
    $("#right_img").attr("src","img/"+rps[comp - 1]+"_R.png");

    if(computer == 3){
        winner = "COMPUTER";
    }else{
        winner = "YOU"
    }

    //checks if the points are full
    if(computer==3||playerPoint1==3){
        setTimeout(() => {  endGame(winner); }, 500);
    }

}

/**
* Post: Returns random number between [1, 3]
*/
function randomGenerator(){
    return Math.floor(Math.random()*3 + 1);
}
  
function multiPlayerGame(){

    //create html side
    var newDiv = document.createElement("div");
    $("#container").replaceWith(newDiv);
    $(newDiv).attr("id", "container");
    var scoreboardDiv = document.createElement("div");
    $(scoreboardDiv).attr("class", "scoreBoard");
    $(newDiv).append(scoreboardDiv);
    //create scoreboard
    var p1Point = document.createElement("h1");
    $(p1Point).attr("id", "playerPoint1");
    var divider = document.createElement("h1");
    var p2Point = document.createElement("h1");
    $(p2Point).attr("id", "playerPoint2");
    $(scoreboardDiv).append(p1Point);
    $(scoreboardDiv).append(divider);
    $(scoreboardDiv).append(p2Point);
    $(p1Point).html("0");
    $(divider).html(":");
    $(p2Point).html("0");

    //create image of hands
    var leftImg = document.createElement("img");
    $(leftImg).attr("src","img/ROCK_L.png");
    $(leftImg).attr("class", "left_img")
    $(leftImg).attr("id", "left_img")
    $(newDiv).append(leftImg);
    var rightImg = document.createElement("img");
    $(rightImg).attr("src","img/ROCK_R.png");
    $(rightImg).attr("class", "right_img")
    $(rightImg).attr("id", "right_img")
    $(newDiv).append(rightImg);

    //create images for inputs
    var leftInputImg = document.createElement("img");
    $(leftInputImg).attr("src","img/left_input.png");
    $(leftInputImg).attr("class", "leftInputImg")
    $(newDiv).append(leftInputImg);
    var rightInputImg = document.createElement("img");
    $(rightInputImg).attr("src","img/right_input.png");
    $(rightInputImg).attr("class", "rightInputImg")
    $(newDiv).append(rightInputImg);


    onePressed = false;
    twoPressed = false;
    window.addEventListener('keydown', function(event){
      keyPressed = event.key;
      if(!onePressed){
        if(keyPressed == 'a'||keyPressed == 's'||keyPressed == 'd'){
          playerOne = keyPressed;
          console.log(playerOne);
          onePressed = true;
        }
      }
      if(!twoPressed){
        if(keyPressed == 'j'||keyPressed == 'k'||keyPressed == 'l'){
          playerTwo = keyPressed;
          console.log(playerTwo);
          twoPressed = true;
        }
      }
      if(onePressed&&twoPressed){
        if(playerOne =='a'&& playerTwo == 'j'||playerOne =='s'&& playerTwo == 'k'||playerOne =='d'&& playerTwo == 'l'){
            console.log("TIE");
            onePressed = false;
            twoPressed = false;
        }else if(playerOne =='a'&&playerTwo=='l'||playerOne =='s'&&playerTwo =='j'||playerOne =='d'&&playerTwo =='k'){
            console.log(firstName + " WINS");
            onePressed = false;
            twoPressed = false;
            playerPoint1++;
            $("#playerPoint1").html(playerPoint1);
        }else{
            console.log(secondName + " WINS");
            onePressed = false;
        twoPressed = false;
            playerPoint2++;
            $("#playerPoint2").html(playerPoint2);
        }
        

        //displays the right image for the chosen rock paper or scissor
        $("#left_img").attr("src","img/"+rps[getNumber(playerOne)]+"_L.png");
        $("#right_img").attr("src","img/"+rps[getNumber(playerTwo)]+"_R.png");
        onePressed = false;
        twoPressed = false;

        if(playerPoint1 == 3){
            winner = firstname;
        }else{
            winner = secondName;
        }
    
        //checks if the points are full
        if(playerPoint2>=3||playerPoint1>=3){
            setTimeout(() => {  endGame(winner); }, 500);
        }
      }
    });
}

/**
 * 
 * @param {a, s, d, j, k, or l} input 
 * Post: returns the coresponding rock paper or scissor for key pressed
 */
function getNumber(input){
    if(input == 'a'||input == 'j'){
        return 0;
    }else if(input == 's'||input == 'k'){
        return 1;
    }else{
        return 2;
    }
}

function endGame(winner){
    playerPoint1 = 0;
    playerPoint2 = 0;
    computer = 0;
    playerOne = '';
    playerTwo = '';
    onePressed = false;
    twoPressed = false;

    var newDiv = document.createElement("div");
    $("#container").replaceWith(newDiv);
    $(newDiv).attr("id", "container");
    var newH2 = document.createElement("h1");
    $(newH2).html(winner+" WIN!");
    $(newH2).css("text-align", "center");
    $(newDiv).append(newH2);
    var buttonDiv = document.createElement("div");
    $(newDiv).append(buttonDiv);
    $(buttonDiv).attr("class", "buttonContainer");
    var buttonDiv2 = document.createElement("div"); 
    $(buttonDiv).append(buttonDiv2);
    $(buttonDiv2).attr("class", "inner-buttonContainer");
    $(buttonDiv2).append("<h2>BACK TO MENU?</h2>")
    
    //create Two buttons for go to menu
    var newButton = document.createElement("button");
    $(newButton).attr("id", "toMenu");
    $(buttonDiv2).append(newButton);
    $("#toMenu").html("BACK TO MENU");
    $("#toMenu").click(function(){
        location.reload();
    });
}

/*
 * Event handler for server's response
 * @param data is the json format string sent from the server
 */
function response(data, status){
    var response = JSON.parse(data);
    console.log(data);
    if(response['action']=='singlePlayer'){
        computerPoint = response['computerPoint'];
        playerPoint1 = response['playerPoint1'];
        //display the result for each points
        $("#playerPoint").html(playerPoint1);
        $("#computerPoint").html(computer);
      }
}

function help(){
    alert("How to play:");
    alert("A rock beats scissors, scissors beat paper, and paper beats rock.")
    alert("Single player: Press on icon. Computer will also choose a random one out of: rock, paper, and scissor");
    alert("Multiplayer: Player 1 uses keyboard ASD, and Player 2 uses keyboard JKL for rock, paper, and scissor accordingly. *Make sure that both players press button at the same time!");
}