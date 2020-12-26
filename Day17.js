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
			startingCube.set(`x${x}y${y}z0w0`, char);
		});
	});

	function getCount(x, y, z, w) {
		let count = 0;

		for (let wPrime = w-1; wPrime <= w + 1; wPrime++) {
			for (let zPrime = z-1; zPrime <= z + 1; zPrime++) {
				for (let yPrime = y - 1; yPrime <= y + 1; yPrime++) {
					for (let xPrime = x - 1; xPrime <= x + 1; xPrime++) {
						if ( z === zPrime && y === yPrime && x === xPrime && w === wPrime) {
							// do nothing, this is the cube we are deciding to toggle
						}
						else {
							if (startingCube.get(`x${xPrime}y${yPrime}z${zPrime}w${wPrime}`) === '#') {
								count++;
								if (count > 3) return count;
							}
						}
					}
				}
			}
		}

		return count;
	}

	function isShuttingOff(x, y, z, w) {
		let count = getCount(x, y, z, w);
		return count !== 2 && count !== 3; // turns off if count is not 2 or 3
	}

	function isTurningOn(x, y, z, w) {
		let count = getCount(x, y, z, w);
		return count === 3; // turns on if count is 3
	}
	

	let newCube = new Map(),
		cubeHalved = Math.floor(lines.length/2),
		cubeZLower = 0 - cubeHalved,
		cubeZUpper = lines.length,
		iterations = 0;

	while (iterations < 6) {
		for (let w = cubeZLower; w <= cubeZUpper; w++) {
			for (let z = cubeZLower; z <= cubeZUpper; z++) {
				for (let y = cubeZLower; y <= cubeZUpper; y++ ) {
					for (let x = cubeZLower; x <= cubeZUpper; x++) {
						if (startingCube.get(`x${x}y${y}z${z}w${w}`) === "#") {
							let toggle = isShuttingOff(x,y,z,w);
							newCube.set(`x${x}y${y}z${z}w${w}`, toggle ? '.' : '#');
						}
						else {
							let toggle = isTurningOn(x,y,z,w)
							newCube.set(`x${x}y${y}z${z}w${w}`, toggle ? '#' : '.');
						}
					}
				}
	
			}
		}

		for (let [key, val] of newCube.entries()) {
			startingCube.set(key, val);
		}
		iterations++;
		cubeZLower--;
		cubeZUpper++;
	}

	let onTotal = 0;
	startingCube.forEach(point => {
		if (point === '#') onTotal++;
	});

	console.log("P2:", onTotal);
});
