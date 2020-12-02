fs = require('fs');
fs.readFile('Day1.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n').map(Number);
	let length = lines.length;

	for(i = 0; i < length - 2; i++) {
		for (j = i + 1; j < length - 1; j++ ) {
			for(k = j; k < length; k++) {
				let num1 = lines[i];
				let num2 = lines[j];
				let num3 = lines[k];
				if((num1 + num2 + num3) == 2020) {
					console.log(num1 * num2 * num3);
				}
			}
		}
	}

});
