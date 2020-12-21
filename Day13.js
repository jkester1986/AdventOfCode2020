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

	let startTime = 0,
		multiplier = 1;

	/**
	 * thanks to @lizthegrey for explaining this
	 * @link https://www.youtube.com/watch?v=z5hR01EmgtM&list=PLI84-gNHkUdsnC-xEoEil8zTYEIqgx7-Q&index=13
	 */
	timeStructure.forEach(bus => {
		const { busId, timeInc } = bus;
		// while the bus doesn't leave at the specified time
		// (t = startTime + increase in time for any particular bus)
		while((startTime + timeInc) % busId) {
			// increase the time by the multiplier,
			// so any new start time works with all previous busses we've solved for,
			// and keep doing until we find a match for the current bus
			startTime += multiplier;
		}
		// increase the multiplier by the bus id
		multiplier *= busId;
	});

	console.log("P2:", startTime)
});
