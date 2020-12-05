fs = require('fs');
fs.readFile('Day5.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	data = data.replace(/(B|R)/g, 1).replace(/(F|L)/g, 0); // just convert it all to binary
	let lines = data.split('\n');
	
	let seats = {};
	let highestId = 0;

	lines.forEach(pass=> {
		let passData = /^(\d{7})(\d{3})$/.exec(pass);
		let row = parseInt(passData[1], 2),
			seat = parseInt(passData[2], 2);

		//seat ID
		let seatId = row * 8 + seat;
		seats[`${seatId}`] = { row,seat };
		if (seatId > highestId) highestId = seatId;
	});

	console.log("P1", highestId);

	for (let row = 1; row < 127; row++) {
		for(let seat = 0; seat < 8; seat ++) {
			let currentSeatId = row * 8 + seat;

			if (!seats[`${currentSeatId}`] && seats[`${currentSeatId + 1}`] && seats[`${currentSeatId - 1}`]) {
				console.log("P2", currentSeatId);
				process.exit();
			}
		}
	}
});
