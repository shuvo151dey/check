
var currPos = 0;
var step = 59.5;
var currcolor = "";
var NumOfToken = "";
var num = 0;
var clicked = false;
var currtoken = "";
var colors = ["green","blue"];
var tokenOut = {green:0,blue:0}
function HaveHover() {
    var count = 0;
    var toKill = "";
    for (var i = 0; i < colors.length; i++) {
        for (var n = 1; n <= 2; n++) {
            var firstToken = document.getElementById(colors[i] + "token" + n);
            var secondToken=document.getElementById(currtoken);
            if (firstToken.style.top==secondToken.style.top&&firstToken.style.left==secondToken.style.left&&currcolor!=colors[i]&&currPos+num<28) {
                count++;
                toKill = colors[i] + "token" + n;
                return toKill;
            }
        }
    }
    return false;
}
function Stuck() {
    var text = document.getElementsByClassName('player')[0];
    if (onboard[currtoken] == 0||currPos+num>28) {
        if (DontHaveOtherFree()||currPos+num>28) {
            var badtext = document.getElementById('badtext');
            badtext.innerText = "you cant move";
            clicked = false;
            var dice = document.getElementById('dice');
            dice.style.backgroundImage = "url(Pictures/dicerll.gif)";
            window.setTimeout(changePlayer, 1000);
        }
    }
}
function changePlayer() {
    if (num != 6){
    var text = document.getElementsByClassName('player')[0];
    switch (text.innerText) {

        case "green": text.innerText = text.style.color = "blue"; break;
        case "blue" : text.innerText = text.style.color = "green"; break;
    }
    }

    var badtext = document.getElementById('badtext');
    badtext.innerText = "";
    var dice = document.getElementById('dice');
    dice.style.backgroundImage = "url(Pictures/dicerll.gif)";
}
var positions = {
    bluetoken1: 0,
    bluetoken2: 0,
    greentoken1: 0,
    greentoken2: 0
    
};
var onboard = {
    
    bluetoken1: 0, bluetoken2: 0,
    greentoken1: 0, greentoken2: 0
    
};
function DontHaveOtherFree() {
    var text = document.getElementsByClassName('player')[0];
    for (var i = 1; i <=2; i++) {
        if (onboard[text.innerText + "token" + i] == 1 || positions[text.innerText + "token" + i]+num>=28) return false;
    }
    return true;
}
function CheckForWinner() {
    if (tokenOut[currcolor] == 2) {
        var dice = document.getElementById("dice");
        var player = document.getElementsByClassName('player')[0];
        var uselesstext1 = document.getElementById("uselesstext1");
        var uselesstext2 = document.getElementById("uselesstext2");
        dice.innerText = "";
        dice.style.visibility = "hidden";
        uselesstext1.innerText = "";
        uselesstext2.innerText = "";
        player.innerText = "The Winner is the "+currcolor+" player";
    }
}
function stepDown() {
    var doc = document.getElementById(currcolor + "token"+NumOfToken);
    var curr = Number(doc.style.top.replace(/[a-z]/g, ''));
    doc.style.top = (curr+step)+'px';
    currPos++;
}
function stepUp() {
    var doc = document.getElementById(currtoken);
    var curr = Number(doc.style.top.replace(/[a-z]/g, ''));
    doc.style.top = (curr - step) + 'px';
    currPos++;
}
function stepLeft() {
    var doc = document.getElementById(currtoken);
    var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.left = (curr - step) + 'px';
    currPos++;
}
function stepRight() {
    var doc = document.getElementById(currtoken);
    var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.left = (curr + step) + 'px';
    currPos++;
}
var stepsBlue =[];
var stepsGreen =[];
function pushSteps(value, steps, count) {
    for (i = 0; i < count; i++) steps.push(value);
}


//Blue pawns path
pushSteps(stepLeft, stepsBlue,7);
pushSteps(stepUp, stepsBlue,7);
pushSteps(stepRight, stepsBlue,7);
pushSteps(stepDown, stepsBlue,6);

//Green pawns path
pushSteps(stepRight, stepsGreen,7);
pushSteps(stepDown, stepsGreen,7);
pushSteps(stepLeft, stepsGreen,7);
pushSteps(stepUp, stepsGreen,6);
const ResetToken=function (victim) {
    onboard[victim] = 0;
    positions[victim] = 0;
    var tokenToMove = document.getElementById(victim);
    switch (victim) {
        
        case "bluetoken1": tokenToMove.style.top = 60 + "px"; tokenToMove.style.left = 15 + "px"; break;
        case "bluetoken2": tokennToMove.style.top = 60 + "px"; tokenToMove.style.left = 30 + "px"; break;
        case "greentoken1": tokenToMove.style.top = 350 + "px"; tokenToMove.style.left = 670 + "px"; break;
        case "greentoken2": tokenToMove.style.top = 350 + "px"; tokenToMove.style.left = 695 + "px"; break;
    }
}
const randomNum = function () {
    if (!clicked) {
        var num = Math.floor((Math.random() * 6) + 1);;
        var dice = document.getElementById('dice');
        dice.style.backgroundImage = "url(Pictures/dice"+num.toString()+".jpg)";
        clicked = true;
    }
    if (num != 6 && DontHaveOtherFree()) {
        var bad = document.getElementById('badtext');
        bad.innerText = "you cant move";
        window.setTimeout(changePlayer, 1000);
        clicked = false;
    }
}
const randomMove = function (Color, token) {
    console.log('Sucess');
    var text = document.getElementsByClassName('player')[0];
    NumOfToken = token;
    currcolor = Color;
    currtoken = currcolor + "token" + NumOfToken;
    currPos = this.positions[currtoken];
    if (num + currPos > 28) 
    {
        Stuck();
    }
    else {
        if (clicked) {
            var position = currPos;
            if (text.innerText == currcolor) {
                if (onboard[currtoken] === 1 || num === 6) {
                    if (onboard[currtoken] === 0) {
                        var doc = document.getElementById(currtoken);
                        var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
                        switch (Color) {
                       
                            case "blue":
                                doc.style.left = 570 + 'px';
                                doc.style.top = 275 + "px";
                                break;

                            case "green":
                                doc.style.left = 60 + 'px';
                                doc.style.top = 65 + "px";
                                break;
                        }
                        onboard[currtoken] = 1;
                    }
                    else {
                        switch (Color) {
                         
                            case "blue":
                                for (i = currPos; i < position + num; i++) {
                                    stepsBlue[i]();
                                }
                                break;

                            case "green":
                                for (i = currPos; i < position + num; i++) {
                                    stepsGreen[i]();
                                }
                                break;
                        }
                        positions[currtoken] = currPos;
                        var victim = HaveHover();
                        if (victim != false) {
                            ResetToken(victim);
                        }
                        if (currPos == 28) { tokenOut[currcolor]++; onboard[currtoken] = 0; positions[currtoken] = 0; document.getElementById(currtoken).style.visibility = "hidden"; };
                        CheckForWinner();
                        changePlayer();
                    }
                    num = 0;
                    clicked = false;
                    var dice = document.getElementById('dice');
                    dice.style.backgroundImage = "url(Pictures/dicerll.gif)";
                }
                else Stuck();
            }
        }
    }
}