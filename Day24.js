fs = require('fs');
fs.readFile('Day24.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
	
	let hexMap = new Map(),
		highest = 0,
		lowest = 0;
	lines.forEach(line => {
		let coordinates = {
			x: 0,
			y: 0,
			z: 0
		}
		
		while (line) {
			let substring = line[0];
			if(substring === 's' || substring === 'n') {
				substring += line[1];
				line = line.substr(2);
			}
			else {
				line = line.substr(1);
			}

			/**
			 * e => 1, 0, -1
			 * se => 0, -1, -1
			 * sw => -1, -1, 0
			 * 
			 * w => -1, 0, 1
			 * nw => 0, 1, 1
			 * ne => 1, 1, 0
			 */
			switch(substring) {
				case "e":
					coordinates.x++;
					coordinates.z--;
					break;
				case "se":
					coordinates.y--;
					coordinates.z--;
					break;
				case "sw":
					coordinates.x--;
					coordinates.y--;
					break;
				case "w":
					coordinates.x--;
					coordinates.z++;
					break;
				case "nw":
					coordinates.y++;
					coordinates.z++;
					break;
				case "ne":
					coordinates.x++;
					coordinates.y++;
			}
		}

		let {x, y, z} = coordinates;
		if (hexMap.has(`x${x}y${y}z${z}`)) {
			hexMap.set(`x${x}y${y}z${z}`, {
				flipped: !hexMap.get(`x${x}y${y}z${z}`).flipped
			});
		}
		else {
			hexMap.set(`x${x}y${y}z${z}`, {
				flipped: true
			});
		}
		if (x < lowest) lowest = x;
		if (x > highest) highest = x;
		if (y < lowest) lowest = y;
		if (y > highest) highest = y;
		if (z < lowest) lowest = z;
		if (z > highest) highest = z;
	});

	highest++, lowest--;

	let total = 0;
	for (let [_, val] of hexMap.entries()) {
		if (val.flipped) total++;
	}
	console.log("P1:", total);

	function getFlippedCount(x, y, z) {
		let count = 0;

		/**
		 * e => 1, 0, -1
		 * se => 0, -1, -1
		 * sw => -1, -1, 0
		 * 
		 * w => -1, 0, 1
		 * nw => 0, 1, 1
		 * ne => 1, 1, 0
		 */
		if (hexMap.get(`x${x+1}y${y}z${z-1}`)?.flipped) count++;
		if (hexMap.get(`x${x}y${y-1}z${z-1}`)?.flipped) count++;
		if (hexMap.get(`x${x-1}y${y-1}z${z}`)?.flipped) count++;
		if (hexMap.get(`x${x-1}y${y}z${z+1}`)?.flipped) count++;
		if (hexMap.get(`x${x}y${y+1}z${z+1}`)?.flipped) count++;
		if (hexMap.get(`x${x+1}y${y+1}z${z}`)?.flipped) count++;

		return count;
	}

	// tile is black, check if it needs to flip
	function isFlippingToWhite(x, y, z) {
		let count = getFlippedCount(x, y, z);
		return count === 0 || count > 2; // flips to white if no black tiles, or at least 2 touching
	}

	// tile is white, see if it needs to flip
	function isFlippingToBlack(x, y, z) {
		let count = getFlippedCount(x, y, z);
		return count === 2; // flips to black if 2 touching blacks
	}

	let day = 0,
		flipGroup = new Map();
	while (day < 100) {
		for (let z = lowest; z <= highest; z++) {
			for (let y = lowest; y <= highest; y++ ) {
				for (let x = lowest; x <= highest; x++) {
					if (hexMap.get(`x${x}y${y}z${z}`)?.flipped) {
						let flipToWhite = isFlippingToWhite(x,y,z);
						if (flipToWhite) flipGroup.set(`x${x}y${y}z${z}`, { flipped: false });
					}
					else {
						let flipToBlack = isFlippingToBlack(x,y,z)
						if (flipToBlack) flipGroup.set(`x${x}y${y}z${z}`, { flipped: true });
					}
				}
			}
		}

		for (let [key, val] of flipGroup.entries()) {
			hexMap.set(key, val);
		}
		day++;
		lowest--;
		highest++;
	}

	total = 0;
	for (let [_, val] of hexMap.entries()) {
		if (val.flipped) total++;
	}
	console.log("P2:", total);

});
