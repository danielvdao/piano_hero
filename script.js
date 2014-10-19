$(document).ready(function() {
	$("audio").addClass("hidden");
})

var x = 0

document.onkeydown = function(e) {
	console.log(e.which);

	tone = '';

	if (e.which == 65){
		tone += 'tone-3A';
	}
	else if (e.which == 83){
		tone += 'tone-3B';
	}
	else if (e.which == 68){
		tone += 'tone-3C';
	}
	else if (e.which == 70){
		tone += 'tone-3Cs';
	}
	else if (e.which == 71){
		tone += 'tone-3D';
	}
	else if (e.which == 72){
		tone += 'tone-3E';
	}
	else if (e.which == 74){
		tone += 'tone-3F';
	}
	else {
		tone += 'tone-3G';
	}
	

	file_mp3 = 'audio/' + tone + '.mp3';
	file_ogg = 'audio/' + tone + '.ogg';

	var sound = new Howl({
		urls: [file_mp3, file_ogg]
	}).play();
}

document.onkeyup = function(e) {
	console.log('up');
}


var channel_max = 32;
audiochannels = new Array();

for (var a = 0; a < channel_max; a++){
	audiochannels[a] = new Array();
	audiochannels[a]['channel'] = new Audio();
	audiochannels[a]['finished'] = -1;
	audiochannels[a]['keyvalue'] = '';
}


function play_sound(s) {
	for (var i = 0; i < audiochannels.length; i++) {
		thistime = new Date();
		if (audiochannels[i]['finished'] < thistime.getTime()) {
			try{
				audiochannels[i]['finished'] = thistime.getTime() + document.getElementById(s).duration*1000;
				audiochannels[i]['channel'] = document.getElementById(s);
				audiochannels[i]['channel'].currentTime = 0;
				audiochannels[i]['channel'].volume = 1;
				audiochannels[i]['channel'].play();
				audiochannels[i]['keyvalue'] = s;
			}
			catch(v){
				console.log(v.message);
			}
		};
	};
}


function stop_sound(s, sender) {
	for (var i = 0; i < audiochannels.length; i++) {
		if (audiochannels[i]['keyvalue'] == s) {
			try{
				audiochannels[i]['channel'] = document.getElementById(s);
				audiochannels[i]['channel'].pause();
				// if(sender != undefined && sender == 'keyboard'){
				// 	console.log('yes');
				// 	setTimeout("audiochannels[i]['channel'].pause()", 2500);
				// 	setTimeout("audiochannels[i]['channel'].currentTime = 0", 2500);
				// }
				// else{
				// 	console.log('no');
				// 	setTimeout("audiochannels[i]['channel'].pause()", 2500);
				// 	setTimeout("audiochannels[i]['channel'].currentTime = 0", 2500);
				// }
			}
			catch(v){
				console.log(v.message);
			}
		};
	};
}