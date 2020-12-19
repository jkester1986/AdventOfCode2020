fs = require('fs');
fs.readFile('Day17.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n'),
		startingCube = new Map();

	lines.forEach((line, y) => {
		let chars = line.split('');
		chars.forEach((char, x) => {
			startingCube.set(`x${x}y${y}z0`, char);
		});
	});

	function getCount(x, y, z) {
		let count = 0;

		for (let zPrime = z-1; zPrime <= z + 1; zPrime++) {
			for (let yPrime = y - 1; yPrime <= y + 1; yPrime++) {
				for (let xPrime = x - 1; xPrime <= x + 1; xPrime++) {
					if ( z === zPrime && y === yPrime && x === xPrime) {
						// console.log(`x${xPrime}y${yPrime}z${zPrime} is empty`);
					}
					else {
						if (startingCube.get(`x${xPrime}y${yPrime}z${zPrime}`) === '#') {
							count++;
							if (count > 3) return count;
						}
					}
				}
			}
		}

		return count;
	}

	function isShuttingOff(x, y, z) {
		let count = getCount(x, y, z);
		return count !== 2 && count !== 3; // turns off if count is not 2 or 3
	}

	function isTurningOn(x, y, z) {
		let count = getCount(x, y, z);
		return count === 3; // turns on if count is 3
	}
	

	let newCube = new Map(),
		cubeHalved = Math.floor(lines.length/2),
		cubeZLower = 0 - cubeHalved,
		cubeZUpper = lines.length,
		iterations = 0;

	while (iterations < 6) {
		for (let z = cubeZLower; z <= cubeZUpper; z++) {
			for (let y = cubeZLower; y <= cubeZUpper; y++ ) {
				let row = '';
				for (let x = cubeZLower; x <= cubeZUpper; x++) {
					// console.log({x, y, z});
					if (startingCube.get(`x${x}y${y}z${z}`) === "#") {
						let toggle = isShuttingOff(x,y,z);
						// console.log("isShuttingOff", toggle);
						newCube.set(`x${x}y${y}z${z}`, toggle ? '.' : '#');
					}
					else {
						let toggle = isTurningOn(x,y,z)
						// console.log("isTurrningOn", toggle);
						newCube.set(`x${x}y${y}z${z}`, toggle ? '#' : '.');
					}
					row += newCube.get(`x${x}y${y}z${z}`);
				}
				// console.log(row);
			}

			// console.log();
		}

		for (let [key, val] of newCube.entries()) {
			startingCube.set(key, val);
		}
		iterations++;
		cubeZLower--;
		cubeZUpper++;
	}

	// console.log(startingCube);

	let onTotal = 0;
	startingCube.forEach(point => {
		if (point === '#') onTotal++;
	});

	console.log("P1:", onTotal);
});
