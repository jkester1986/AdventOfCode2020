fs = require('fs');
fs.readFile('Day9.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let values = data.split('\n').map(Number),
		length = values.length,
		preamble = 25,
		invalidNumber;
	
	for (let i = preamble; i < length; i++) { // i = the index of number to check the validity for
		let subArray = values.slice(i - preamble, i);

		let found = false;
		subArray.forEach(val => {

			if (subArray.includes(values[i] - val)) found = true;
		});

		if (!found) {
			invalidNumber = values[i];
			break;
		}
	}

	console.log("P1:", invalidNumber);

	let sum = 0,
		set = [];
	for (let i = 0; i < length; i++) {
		sum += values[i];
		set.push(values[i]);
		
		checkSum();

		while(sum > invalidNumber && set.length != 0) {
			sum -= set.shift();
			checkSum();
		}
	}

	function checkSum() {
		if(sum === invalidNumber) {
			set.sort((a,b) => a - b);
			console.log("P2:", set[0] + set[set.length - 1]);
			process.exit();
		}
	}
});
