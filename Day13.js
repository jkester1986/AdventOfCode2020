const { Console } = require('console');

fs = require('fs');
fs.readFile('Day13.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
	let departTime = lines[0],
		busIds = lines[1];

	let foundBusses = busIds.match(/(\d+)/g).map(Number);

	let nextBus = [];
	foundBusses.forEach(busId => {
		let remainder = departTime % busId;
		nextBus.push({
			busId,
			departure: departTime - remainder + busId
		});
	});

	let nextDeparture = {
		busId: 0,
		departure: 100000000000000
	};
	nextBus.forEach(bus => {
		if (bus.departure < nextDeparture.departure) {
			nextDeparture = {
				busId: bus.busId,
				departure: bus.departure
			}
		}
	});
	console.log("P1", (nextDeparture.departure - departTime) * nextDeparture.busId);

	let timeStructure = [];
	let timeInc = 0;
	// busIds = '17,x,13,19'
	busIds.split(',').forEach(bus => {
		if (bus !=='x') timeStructure.push({busId: parseInt(bus), timeInc});
		timeInc++;
	});

	console.log(timeStructure);
	// gives something that looks like this:
	// [
	// 	{ busId: 17, timeInc: 0 },
	// 	{ busId: 13, timeInc: 2 },
	// 	{ busId: 19, timeInc: 3 }
	// ]

	// start at 0 bc this should work from any point, but for my personal input I'll use 100000000000000 instead of 0
	let startingTime = 0 - (0 % timeStructure[0].busId) + timeStructure[0].busId;
	
	let index = 0,
		structLength = timeStructure.length,
		increaseAmount = timeStructure[0].busId,
		newStartTime = startingTime;

	while (index < structLength) {
		console.log(index);
		let multiplier = 1;
		while(!((newStartTime + timeStructure[index].timeInc) % timeStructure[index].busId === 0)) {
			newStartTime += increaseAmount;
			multiplier++;
		}

		increaseAmount += multiplier;
		startingTime = newStartTime;

		index++;
	}

	console.log(startingTime);
});
