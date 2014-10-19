function play_sound(key) {
	tone = '';
	ocatave = '3';

	if (key == 0){
		tone += 'tone-' + ocatave +'A';
	}
	else if (key == 1){
		tone += 'tone-' + ocatave +'B';
	}
	else if (key == 2){
		tone += 'tone-' + ocatave +'C';
	}
	else if (key == 3){
		tone += 'tone-' + ocatave +'Cs';
	}
	else if (key == 4){
		tone += 'tone-' + ocatave +'D';
	}
	else if (key == 5){
		tone += 'tone-' + ocatave +'E';
	}
	else if (key == 6){
		tone += 'tone-' + ocatave +'F';
	}
	else if (key == 7){
		tone += 'tone-' + ocatave +'G';
	}
	else{
		console.log('invalid key index');
	}
	

	file_mp3 = 'audio/' + tone + '.mp3';
	file_ogg = 'audio/' + tone + '.ogg';

	var sound = new Howl({
		urls: [file_mp3, file_ogg]
	}).play();
}