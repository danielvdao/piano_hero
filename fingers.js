var canvas;
var context;
var width;
var height;
var keyWidth;
var keyGapSize;

var EDGE_GAP_PERCENT = 0.05;
var KEY_HEIGHT_PERCENT = .7;
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
    keyWidth = (1-2*EDGE_GAP_PERCENT)*canvas.width / 9; //9 comes from keys
    keyGapSize = keyWidth / 9;
    context.fillStyle = "#aaaaaa";
    context.fillRect(0,0,width,height);
    
    drawKeys(keyCoords);
    //drawFingerMarkers(fakeX, fakeY);
    //updateNotes();
}



function drawFingerMarkers(xCoords, yCoords) {
    var radius = 15;

    for(var i = 0; i < xCoords.length; i++) {
       // if(xCoords[i] < -80) {
       //    continue;
        //}
        xVal = normalizeX(xCoords[i]);
        yVal = normalizeY(yCoords[i]);
        //console.log(yCoords);
        var grd=context.createLinearGradient(0,height-200,width,height);
        grd.addColorStop(0,"rgba(152, 84, 192, 0.8)");
        grd.addColorStop(1,"#64B785");

        context.beginPath();
        context.arc(xVal, yVal, radius, 0, 2* Math.PI, false);
        context.fillStyle = "rgba(152, 84, 192, 0.8)";
        context.fill();

        context.lineWidth = 2;
        context.strokeStyle = '#602184';
        context.stroke();
    }
}


function drawKeys() {
    var xPointer = width * EDGE_GAP_PERCENT + keyGapSize;
   //console.log(keyGapSize);
    for(var i = 1; i < 9; i++) {
        
        //console.log(xPointer);
        //context.rect(keyCoords[i][0]+keyGapSize/2, keyCoords[i][1], keyCoords[0][0]-keyGapSize, 100);
        var on = 80 + keypress[i-1] * 70;
        
        context.beginPath();
        //here we draw the lanes for the 
        var grd=context.createLinearGradient(0,0,0,height/2);
        grd.addColorStop(0,"black");
        grd.addColorStop(1,"white");

        context.fillStyle=grd;

        context.rect(xPointer, 0, keyWidth, height);
        context.fillStyle = grd;
        context.fill();
        
        context.beginPath();
        context.rect(xPointer, height*KEY_HEIGHT_PERCENT, keyWidth, height*1-KEY_HEIGHT_PERCENT);
        context.fillStyle = "rgba(70, 70, " + on + ", 1)";
        context.fill();
        context.lineWidth = 6;
        context.strokeStyle = 'white';
        context.stroke();

        xPointer += keyGapSize + keyWidth;

    }


}


function update() {
    //draw white canvas
    context.beginPath();
    context.rect(0, 0, width, height);
    context.fillStyle = "#000000";
    context.fill();
    drawKeys();
    drawFingerMarkers(xmen, ymen);
    for(var i = 0; i < notesToDraw.length; i++) { //remove notes from this list eventually
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
    this.x =  .05 * width + keyGapSize + this.keyIndex * (keyWidth+keyGapSize);
    
    this.noteHeight = duration*(119);
    this.y = -this.noteHeight;
    this.updatePosition = function() {
        this.y += 5;
    }

    this.draw = function() {
        context.beginPath();

        var grd=context.createLinearGradient(0,0,0,height);
        grd.addColorStop(0,"#6BA986");
        grd.addColorStop(.33,"#81C37C");
        grd.addColorStop(.66, "#50CBBF");
        grd.addColorStop(1, "#84EEAE");

        context.fillStyle=grd;
        context.rect(this.x, this.y, keyWidth, this.noteHeight);
        //context.fillStyle = "rgba(94, 82, 200, 0.7)";
        context.fill();
        context.strokeStyle = "#ffffff";
        context.stroke();
    }
}

function normalizeX(val) {
    //console.log(val);
   //val += 80;
    //val = val / 160.0 * width;
    //console.log(val);

    return (val+150)*7;
}

function normalizeY(val) {
    //val += 80;
    //val += height*.7;
    //val = val / 160.0 * (height * .3);
    return (val+400)*2;
}