
// Corresponds to whether key was pressed 
var keypress = [false, false, false, false, false, false, false, false];  
var xmen = [0,0,0,0,0,0,0,0,0,0];
var ymen = [0,0,0,0,0,0,0,0,0,0];
// Corresponds to the fingers, giving the coordinates of each finger 
var finger_coord = new Array (8);
// Store frame for motion functions
var previousFrame = null;
var paused = false;
var pauseOnGesture = false;

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

// to use HMD mode:
// controllerOptions.optimizeHMD = true;

Leap.loop(controllerOptions, function(frame) {
  if (paused) {
    return; // Skip this update
  }

  if (previousFrame && previousFrame.valid) {
    var translation = frame.translation(previousFrame);
    var rotationAxis = frame.rotationAxis(previousFrame);
    var rotationAngle = frame.rotationAngle(previousFrame);
    var scaleFactor = frame.scaleFactor(previousFrame);

  }

  var pointableString = "";
  if (frame.pointables.length > 0) {
    var fingerTypeMap = ["Thumb", "Index finger", "Middle finger", "Ring finger", "Pinky finger"];
    var boneTypeMap = ["Metacarpal", "Proximal phalanx", "Intermediate phalanx", "Distal phalanx"];
    var keytemp = [false, false, false, false, false, false, false, false];

    for (var i = 0; i < frame.pointables.length; i++) {
      var pointable = frame.pointables[i];
      var hands = frame.hands; 

      if (!pointable.tool) {
        // pointable.tipPosition gives a vector array of the directions 
        var x_coord = pointable.tipPosition[0];
        var y_coord = pointable.tipPosition[1];
        var z_coord = pointable.tipPosition[2];

        if(x_coord >= -80 && x_coord <= 80){
          // // Check for the depression for the finger  
          if (y_coord < 100) {
            keytemp[parseInt((x_coord + 80)/20)] = true;
          }
        }

        //console.log(keypress);

        // Store right and left hand!!!! :D <3333
        for (var j = 0; j < hands.length; ++j) {
          if(parseInt(pointable.id / 10) == hands[j].id){
            if(hands[j].type === "left"){
              xmen[4-pointable.type] = x_coord;
              ymen[4-pointable.type] = z_coord;
              // console.log("left hand");
              // console.log(xmen);
            }

            else{
              xmen[pointable.type+5] = x_coord;
              ymen[pointable.type+5] = z_coord;
              // console.log("right hand");
              // console.log(xmen);
            }
          } 

        };


      }
      


    }

    for(var i = 0; i < keytemp.length; ++i){
      if(keypress[i]){
        if(!keytemp[i]){
          keypress[i] = false;
        }
      }

      else{
        if(keytemp[i]){
          keypress[i] = true;
          /* Play sound here, detect the state change. */
        }
      } 
    }

  }
  else {
  }
  //pointableOutput.innerHTML = pointableString;
  previousFrame = frame;
})

function vectorToString(vector, digits) {
  if (typeof digits === "undefined") {
    digits = 1;
  }
  return "(" + vector[0].toFixed(digits) + ", "
             + vector[1].toFixed(digits) + ", "
             + vector[2].toFixed(digits) + ")";
}

function togglePause() {
  paused = !paused;

  if (paused) {
   // document.getElementById("pause").innerText = "Resume";
  } else {
   // document.getElementById("pause").innerText = "Pause";
  }
}

function pauseForGestures() {
 /* if (document.getElementById("pauseOnGesture").checked) {
    pauseOnGesture = true;
  } else {
    pauseOnGesture = false;
  }*/
}