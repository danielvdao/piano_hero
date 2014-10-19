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

  // Display Frame object data
  //var frameOutput = document.getElementById("frameData");

  var frameString = "Frame ID: " + frame.id  + "<br />"
                  + "Timestamp: " + frame.timestamp + " &micro;s<br />"
                  + "Hands: " + frame.hands.length + "<br />"
                  + "Fingers: " + frame.fingers.length + "<br />"
                  + "Tools: " + frame.tools.length + "<br />"
                  + "Gestures: " + frame.gestures.length + "<br />";

  // Frame motion factors
  if (previousFrame && previousFrame.valid) {
    var translation = frame.translation(previousFrame);
    frameString += "Translation: " + vectorToString(translation) + " mm <br />";

    var rotationAxis = frame.rotationAxis(previousFrame);
    var rotationAngle = frame.rotationAngle(previousFrame);
    frameString += "Rotation axis: " + vectorToString(rotationAxis, 2) + "<br />";
    frameString += "Rotation angle: " + rotationAngle.toFixed(2) + " radians<br />";

    var scaleFactor = frame.scaleFactor(previousFrame);
    frameString += "Scale factor: " + scaleFactor.toFixed(2) + "<br />";
  }
  //frameOutput.innerHTML = "<div style='width:300px; float:left; padding:5px'>" + frameString + "</div>";

  // Display Hand object data
  //var handOutput = document.getElementById("handData");
  var handString = "";
  if (frame.hands.length > 0) {
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];

      handString += "<div style='width:300px; float:left; padding:5px'>";
      handString += "Hand ID: " + hand.id + "<br />";
      handString += "Type: " + hand.type + " hand" + "<br />";
      handString += "Direction: " + vectorToString(hand.direction, 2) + "<br />";
      handString += "Palm position: " + vectorToString(hand.palmPosition) + " mm<br />";
      handString += "Grab strength: " + hand.grabStrength + "<br />";
      handString += "Pinch strength: " + hand.pinchStrength + "<br />";
      handString += "Confidence: " + hand.confidence + "<br />";
      handString += "Arm direction: " + vectorToString(hand.arm.direction()) + "<br />";
      handString += "Arm center: " + vectorToString(hand.arm.center()) + "<br />";
      handString += "Arm up vector: " + vectorToString(hand.arm.basis[1]) + "<br />";

      // Hand motion factors
      if (previousFrame && previousFrame.valid) {
        var translation = hand.translation(previousFrame);
        handString += "Translation: " + vectorToString(translation) + " mm<br />";

        var rotationAxis = hand.rotationAxis(previousFrame, 2);
        var rotationAngle = hand.rotationAngle(previousFrame);
        handString += "Rotation axis: " + vectorToString(rotationAxis) + "<br />";
        handString += "Rotation angle: " + rotationAngle.toFixed(2) + " radians<br />";

        var scaleFactor = hand.scaleFactor(previousFrame);
        handString += "Scale factor: " + scaleFactor.toFixed(2) + "<br />";
      }

      // IDs of pointables associated with this hand
      if (hand.pointables.length > 0) {
        var fingerIds = [];
        for (var j = 0; j < hand.pointables.length; j++) {
          var pointable = hand.pointables[j];
            fingerIds.push(pointable.id);
        }
        if (fingerIds.length > 0) {
          handString += "Fingers IDs: " + fingerIds.join(", ") + "<br />";
        }
      }

      handString += "</div>";
    }
  }
  else {
    handString += "No hands";
  }
  //handOutput.innerHTML = handString;

  // Display Pointable (finger and tool) object data
 // var pointableOutput = document.getElementById("pointableData");
  var pointableString = "";
  if (frame.pointables.length > 0) {
    var fingerTypeMap = ["Thumb", "Index finger", "Middle finger", "Ring finger", "Pinky finger"];
    var boneTypeMap = ["Metacarpal", "Proximal phalanx", "Intermediate phalanx", "Distal phalanx"];
    for (var i = 0; i < frame.pointables.length; i++) {
      var pointable = frame.pointables[i];
      var hands = frame.hands; 

      pointableString += "<div style='width:250px; float:left; padding:5px'>";

      if (!pointable.tool) {
        pointableString += "Pointable ID: " + pointable.id + "<br />";
        pointableString += "Type: " + fingerTypeMap[pointable.type] + "<br />";
        pointableString += "Belongs to hand with ID: " + pointable.handId + "<br />";
        // pointableString += "Direction: " + vectorToString(pointable.direction, 2) + "<br />";
        // pointableString += "Extended?: "  + pointable.extended + "<br />";
        
        // pointable.tipPosition gives a vector array of the directions 
        var x_coord = pointable.tipPosition[0];
        var y_coord = pointable.tipPosition[1];
        var z_coord = pointable.tipPosition[2];

        if(x_coord >= -80 && x_coord <= 80){
          // // Check for the depression for the finger  
          if (y_coord < 100){
            keypress[parseInt((x_coord + 80)/20)] = true;
            // console.log("frack you");
          }

          else{
            keypress[parseInt((x_coord + 80)/20)] = false;
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


        // Make the JSON object which keeps track of x coordinate, z coordinate, and whether or not it was pushed down 
        

        // Data we're feeding back to frontend to see coordinates and shit 
        // finger_coord[parseInt((x_coord + 80) / 20)] = finger;

        pointableString += "Tip position: " + vectorToString(pointable.tipPosition) + " mm<br />";
        pointableString += "</div>";
      }
    }
  }
  else {
    pointableString += "<div>No pointables</div>";
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