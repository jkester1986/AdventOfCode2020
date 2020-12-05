fs = require('fs');
fs.readFile('Day5.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
	let length = lines.length;
	
	let seats = {};
	let highestId = 0;

	lines.forEach(pass=> {

		let min = 0;
		let max = 127;
		for(let i = 0; i < 7; i++) {

			let half = (max - min - 1)/2 + 1;
			switch(pass.charAt(i)) {
				case 'B':
					min += half;
					break;
				case 'F':
					max -= half;
					break;
			}
		}

		let seatMin =0;
		let seatMax = 7;
		for(let i = 7; i < 10; i++) {

			let half = (seatMax - seatMin - 1)/2 + 1;
			switch(pass.charAt(i)) {
				case 'R':
					seatMin += half;
					break;
				case 'L':
					seatMax -= half;
					break;
			}
		}

		//seat ID
		let seatId = min*8+seatMin
		seats[`${seatId}`] = {
			row: min,
			seat: seatMin
		};
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
