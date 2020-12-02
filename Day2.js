fs = require('fs');
fs.readFile('Day2.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data;
	lines = lines.split('\n');
	let count = 0,
		count2 = 0;
	
	lines.forEach(line => {
		let info = line.split(' ');
		let range = info[0].split('-');
		let min = parseInt(range[0]), // discovered today I don't need parseInt...bc...reasons? *shrug*. Kept for clarity though
			max = parseInt(range[1]),
			letter = info[1].charAt(0),
			pw = info[2];

		if(pw.split(letter).length-1 >= min && pw.split(letter).length-1 <=max ) {
			count++;
		}

		if((pw.charAt(min-1) == letter || pw.charAt(max-1) == letter)
			&& !(pw.charAt(min-1) == letter && pw.charAt(max-1) == letter)
		)
			count2++;
	});

	console.log("Part 1:", count);
	console.log("Part 2:", count2);

});
