var canvas;
var context;
var width
var height;
var keyCoords = [[60, 400], [120, 400], [180, 400], [240, 400], [300, 400], [360, 400], [420, 400], [480, 400]];
var fakeX = [52, 300, 252];
var fakeY = [127, 350, 273];
var keyWidth;
var keyGapSize;

var noteData = [
[{  //1st eigth note
    "note": 0,
    "duration": 2
},
{
    "note": 1,
    "duration": 2
}], 

[],

[{  //1st eigth note
    "note": 2,
    "duration": 2
},
{  //1st eigth note
    "note": 3,
    "duration": 2
}],

[],

[{
    "note": 7,
    "duration": 4
}]]

window.onload = function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = canvas.width;
    height = canvas.height;
    keyWidth = 120;
    context.fillStyle = "#aaaaaa";
    context.fillRect(0,0,width,height);
    keyGapSize = (width - 10 * keyWidth) / 9.0;
    drawKeys(keyCoords);
    //drawFingerMarkers(fakeX, fakeY);
    //updateNotes();
}



function drawFingerMarkers(xCoords, yCoords) {
    var radius = 5;
    for(var i = 0; i < xCoords.length; i++) {
       // if(xCoords[i] < -80) {
       //    continue;
        //}
        xVal = normalizeX(xCoords[i]);
        yVal = normalizeY(yCoords[i]);
        //console.log(yCoords);
        context.beginPath();
        context.arc(xVal, yVal, radius, 0, 2* Math.PI, false);
        context.fillStyle = "rgba(0, 0, 0, 0.8)";
        context.fill();

        context.lineWidth = 2;
        context.strokeStyle = '#000000';
        context.stroke();
    }
}


function drawKeys(keyCoords) {
    var xPointer = keyGapSize + keyWidth;
   //console.log(keyGapSize);
    for(var i = 1; i < 9; i++) {
        context.beginPath();
        //console.log(xPointer);
        context.rect(xPointer, height*.8, keyWidth, 400);
        xPointer += keyGapSize + keyWidth;
        //context.rect(keyCoords[i][0]+keyGapSize/2, keyCoords[i][1], keyCoords[0][0]-keyGapSize, 100);
        var on = keypress[i-1] * 255;
        context.fillStyle = "rgba(70, 0, " + on + ", .5)";
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.stroke();
    }
}


function update() {
    //draw white canvas
    context.beginPath();
    context.rect(0, 0, width, height);
    context.fillStyle = "#aaaaaa";
    context.fill();
    drawKeys(keyCoords);
    drawFingerMarkers(xmen, ymen);
    for(var i = 0; i < notesToDraw.length; i++) {
        notesToDraw[i].updatePosition();
        notesToDraw[i].draw();
    }
    console.log(keypress);
    //console.log(xmen);
    //console.log(notesToDraw);
}


var notesToDraw = new Array();

var beatCounter = 0;

function updateNotes() {
    if(beatCounter >= noteData.length) {
        return;
    }
    var data = noteData[beatCounter];

   //console.log(data[0]["note"], data[0]["duration"]);
    for(var i = 0; i < data.length; i++) { //add new notes specified by this beat in the song.
        notesToDraw.push(new Note(data[i]["note"], data[i]["duration"]));
    }
    //console.log(notesToDraw);
    beatCounter ++;
}
var bpm = 120;
setInterval(update, 20);

setInterval(updateNotes, 60*1000/bpm);


var Note = function(keyIndex, duration) {
    this.keyIndex = keyIndex;
    this.duration = duration;
    this.x =  keyGapSize +  keyWidth + this.keyIndex * (keyWidth+keyGapSize);
    
    this.noteHeight = duration*(119);
    this.y = -this.noteHeight;
    this.updatePosition = function() {
        this.y += 5;
    }

    this.draw = function() {
        context.beginPath();
        context.rect(this.x, this.y, keyWidth, this.noteHeight);
        context.fillStyle = "rgba(0, 0, 0, 0.9)";
        context.fill();
    }
}

function normalizeX(val) {
    //console.log(val);
   //val += 80;
    //val = val / 160.0 * width;
    //console.log(val);

    return (val+150)*6;
}

function normalizeY(val) {
    //val += 80;
    //val += height*.7;
    //val = val / 160.0 * (height * .3);
    return (val+400)*2;
}