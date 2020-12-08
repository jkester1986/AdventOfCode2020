fs = require('fs');
fs.readFile('Day8.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n'),
		length = lines.length;
		processedDirections = {},
		index = 0,
		accumulator = 0;

	function changeIndex(direction, amount) {
		switch(direction) {
			case 'acc':
				accumulator += amount;
				index ++;
				break;
			case 'jmp':
				index += amount;
				break;
			default:
				index ++;
				break;
		}
	}

	function goThroughDirections() {
		while(!processedDirections[`${index}`] && index < length) {
			let direction = lines[index].split(' '),
				distance = /^(\+|\-)(\d+)$/.exec(direction[1]);
	
			processedDirections[`${index}`] = true;
	
			changeIndex(direction[0], distance[1] === '+' ? parseInt(distance[2]) : -parseInt(distance[2]));
		}
	}

	goThroughDirections();
	console.log("P1:", accumulator);

	for(let i = 0; i < length; i++) {
		processedDirections = {};
		index = 0;
		accumulator = 0;

		let jumpOrNop = /(jmp|nop)/.exec(lines[i]);
		if(jumpOrNop) {
			// change the direction
			lines[i] = jumpOrNop[1] === "jmp" ? lines[i].replace('jmp', 'nop') : lines[i].replace('nop', 'jmp');
			goThroughDirections();
			// reset the modified direction
			lines[i] = jumpOrNop[1] === "jmp" ? lines[i].replace('nop', 'jmp') : lines[i].replace('jmp', 'nop');

			if (index >= length) {
				console.log("P2", accumulator);
				process.exit();
			}
		}
	}

});
