fs = require('fs');
fs.readFile('Day12.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let directions = data.split('\n').map(direction => {
		let directionParsed = /^(\w)(\d+)$/.exec(direction);
		return [directionParsed[1], parseInt(directionParsed[2])];
	});
	let shipDirection = 0,
		pos = {
			x: 0,
			y: 0
		};

	function changeDirection(degrees) {
		shipDirection = (shipDirection + degrees) % 360;
		if (shipDirection < 0) shipDirection = 360 + shipDirection;
	}

	function moveForward(distance) {
		switch (shipDirection) {
			case 0:
				pos.x += distance;
				break;
			case 90:
				pos.y += distance;
				break;
			case 180:
				pos.x -= distance;
				break;
			case 270:
				pos.y -= distance;
				break;
		}
	}

	// p1 direction parsing
	directions.forEach(direction => {
		switch (direction[0]) {
			case 'N':
				pos.y += direction[1];
				break;
			case 'S':
				pos.y -= direction[1];
				break;
			case 'E':
				pos.x += direction[1];
				break;
			case 'W':
				pos.x -= direction[1];
				break;
			case 'L':
				changeDirection(direction[1]);
				break;
			case 'R':
				changeDirection(-direction[1]);
				break;
			case 'F':
				moveForward(direction[1]);
				break;
		}
	});

	console.log("P1:", Math.abs(pos.x) + Math.abs(pos.y));

	// p2 direction parsing
	let waypointPos = {
		x: 10,
		y: 1
	};
	pos = {
		x: 0,
		y: 0
	};

	function rotateWaypoint(degree) {
		let rotation = degree % 360;
		if (rotation === 0) return;
		if (rotation < 0) rotation = 360 + rotation;

		waypointPos = {
			x: waypointPos.x - pos.x,
			y: waypointPos.y - pos.y
		};

		switch (rotation) {
			case 90:
				waypointPos = {
					x: waypointPos.y * -1,
					y: waypointPos.x
				}
				break;
			case 180:
				waypointPos = {
					x: waypointPos.x * -1,
					y: waypointPos.y * -1
				}
				break;
			case 270:
				waypointPos = {
					x: waypointPos.y,
					y: waypointPos.x * -1
				}
		}

		waypointPos = {
			x: waypointPos.x + pos.x,
			y: waypointPos.y + pos.y
		}
	}

	function moveForwardWithWaypoint(iterations) {
		let Xmovement = iterations * (waypointPos.x - pos.x);
		let Ymovement = iterations * (waypointPos.y - pos.y);
		pos = {
			x: pos.x + Xmovement,
			y: pos.y + Ymovement
		}
		waypointPos = {
			x: waypointPos.x + Xmovement,
			y: waypointPos.y + Ymovement
		}
	}

	directions.forEach(direction => {
		switch (direction[0]) {
			case 'N':
				waypointPos.y += direction[1];
				break;
			case 'S':
				waypointPos.y -= direction[1];
				break;
			case 'E':
				waypointPos.x += direction[1];
				break;
			case 'W':
				waypointPos.x -= direction[1];
				break;
			case 'L':
				rotateWaypoint(direction[1]);
				break;
			case 'R':
				rotateWaypoint(-direction[1]);
				break;
			case 'F':
				moveForwardWithWaypoint(direction[1]);
				break;
		}
	});

	console.log("P2:", Math.abs(pos.x) + Math.abs(pos.y));

});
