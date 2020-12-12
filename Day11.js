fs = require('fs');
fs.readFile('Day11.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let seats = data.split('\n'),
		seatsp2 = data.split('\n'),
		rowsLength = seats.length,
		seatsLength = seats[1].length;

	seats.forEach((row, i) => seats[i] = row.split(''));
	seatsp2.forEach((row, i) => seatsp2[i] = row.split(''))

	function getAdjacentSeats(x, y) {
		let seatCount = 0;

		if(seats[x-1]?.[y-1] === '#') seatCount++;
		if(seats[x-1]?.[y] === '#') seatCount++;
		if(seats[x-1]?.[y+1] === '#') seatCount++;
		if(seats[x][y-1] === '#') seatCount++;
		if(seats[x][y+1] === '#') seatCount++;
		if(seats[x+1]?.[y-1] === '#') seatCount++;
		if(seats[x+1]?.[y] === '#') seatCount++;
		if(seats[x+1]?.[y+1] === '#') seatCount++;

		return seatCount;
	}

	function changeSeats() {
		let seatsToChange = [];

		for (let x = 0; x < rowsLength; x++) {
			for (let y = 0; y < seatsLength; y++) {
				if (seats[x][y] === 'L') {
					if (getAdjacentSeats(x, y) === 0) seatsToChange.push([x, y, '#']);
				}
				else if (seats[x][y] === '#') {
					if (getAdjacentSeats(x, y) >= 4) seatsToChange.push([x, y, 'L']);
				}
			}
		}

		seatsToChange.forEach(seat => {
			seats[seat[0]][seat[1]] = seat[2];
		});

		return seatsToChange.length;
	}

	let iterations = 0;
	while(changeSeats() > 0) {}

	let finalOccupiedCount = 0;
	for (let x = 0; x < rowsLength; x++) {
		for (let y = 0; y < seatsLength; y++) {
			if (seats[x][y] === '#') finalOccupiedCount++
		}
	}

	console.log("P1:", finalOccupiedCount);

	/*-------------------------------------------- P2 ---------------------------------------------------*/

	function getFarSeats(x, y) {
		let seatsFilled = [false, false, false, false, false, false, false, false],
			seatCount = 0;

		// diagonal up and left
		let x1 = x - 1;
		let y1 = y - 1;
		while (x1 > -1 && y1 > - 1 && !seatsFilled[0]) {
			if (seatsp2[x1][y1] === 'L')  {
				x1 = 0;
				y1 = 0;
			}
			else if(seatsp2[x1][y1] === '#') {
				seatCount++;
				seatsFilled[0] = true;
			}
			x1--;
			y1--;
		}

		// vertical up
		let x2 = x - 1;
		while (x2 > -1 && !seatsFilled[1]) {
			if (seatsp2[x2][y] === 'L')  {
				x2 = 0;
			}
			else if(seatsp2[x2][y] === '#') {
				seatCount++;
				seatsFilled[1] = true;
			}
			x2--;
		}

		// diagonal up and right
		let x3 = x-1;
		let y3 = y+1;
		while (x3 > -1 && y3 < seatsLength && !seatsFilled[2]) {
			if (seatsp2[x3][y3] === 'L')  {
				x3 = 0;
				y3 = seatsLength;
			}
			else if (seatsp2[x3][y3] === '#') {
				seatCount++;
				seatsFilled[2] = true;
			}
			x3--;
			y3++;
		}

		// horizontal left
		let y4 = y-1;
		while(y4 > -1 && !seatsFilled[3]) {
			if (seatsp2[x][y4] === 'L')  {
				y4 = 0;
			}
			else if (seatsp2[x][y4] === '#') {
				seatCount++;
				seatsFilled[3] = true;
			}
			y4--;
		}

		// horizontal right
		let y5 = y+1;
		while(y5 < seatsLength  && !seatsFilled[4]) {
			if (seatsp2[x][y5] === 'L')  {
				y5 = seatsLength;
			}
			else if(seatsp2[x][y5] === '#') {
				seatCount++;
				seatsFilled[4] = true;
			}
			y5++
		}

		// diagonal down and left
		let x6 = x+1;
		let y6 = y-1;
		while(x6 < rowsLength && y6 > -1 && !seatsFilled[5]) {
			if (seatsp2[x6][y6] === 'L')  {
				x6 = rowsLength;
				y6 = 0;
			}
			else if(seatsp2[x6][y6] === '#') {
				seatCount++;
				seatsFilled[5] = true;
			}
			x6++;
			y6--;
		}

		// vertical down
		let x7 = x+1;
		while(x7 < rowsLength && !seatsFilled[6]) {
			if (seatsp2[x7][y] === 'L')  {
				x7= rowsLength;
			}
			else if(seatsp2[x7][y] === '#') {
				seatCount++;
				seatsFilled[6] = true;
			}
			x7++;
		}

		// diagonal down and right
		let x8 = x+1;
		let y8 = y+1;
		while (x8 < rowsLength && y8 < seatsLength && !seatsFilled[7]) {
			if (seatsp2[x8][y8] === 'L')  {
				x8 = rowsLength;
				y8 = seatsLength;
			}
			else if(seatsp2[x8][y8] === '#') {
				seatCount++;
				seatsFilled[7] = true;
			}
			x8++;
			y8++
		}

		return seatCount;
	}

	function changeSeatsFarther() {

		let seatsToChange = [];

		for (let x = 0; x < rowsLength; x++) {
			for (let y = 0; y < seatsLength; y++) {
				if (seatsp2[x][y] === 'L') {
					if (getFarSeats(x, y) === 0) seatsToChange.push([x, y, '#']);
				}
				else if (seatsp2[x][y] === '#') {
					if (getFarSeats(x, y) >= 5) seatsToChange.push([x, y, 'L']);
				}
			}
		}

		seatsToChange.forEach(seat => {
			seatsp2[seat[0]][seat[1]] = seat[2];
		});

		return seatsToChange.length;
	}

	while(changeSeatsFarther() > 0) {}

	let finalOccupiedCount2 = 0;
	for (let x = 0; x < rowsLength; x++) {
		for (let y = 0; y < seatsLength; y++) {
			if (seatsp2[x][y] === '#') finalOccupiedCount2++;
		}
	}

	console.log("P2:", finalOccupiedCount2)
});
