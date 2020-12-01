fs = require('fs');
fs.readFile('Day1.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data;
	lines = lines.split('\n');
	let length = lines.length;

	for(i = 0; i < length - 2; i++) {
		for (j = i + 1; j < length - 1; j++ ) {
			for(k = j; k < length; k++) {
				let num1 = parseInt(lines[i]);
				let num2 = parseInt(lines[j]);
				let num3 = parseInt(lines[k]);
				if((num1 + num2 + num3) == 2020) {
					console.log(num1 * num2 * num3);
				}
			}
		}
	}

});
