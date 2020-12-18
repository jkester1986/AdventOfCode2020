fs = require('fs');
fs.readFile('Day16.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n\n');
	let fields = new Map();
	let myTicket = lines[1].split('\n')[1].split(',').map(Number);
	let otherTickets = lines[2].split('\n');
	otherTickets.shift();
	
	lines[0].split('\n').forEach(ticketClass => {
		let parsedData = /^(.+):\s(\d+)-(\d+)\sor\s(\d+)-(\d+)$/.exec(ticketClass);
		fields.set(parsedData[1], [{
			lowerRange: parseInt(parsedData[2]),
			upperRange: parseInt(parsedData[3])
		},
		{
			lowerRange: parseInt(parsedData[4]),
			upperRange: parseInt(parsedData[5])
		}]);
	});

	function isInRange(checkVal, arrayOfRanges) {
		let length = arrayOfRanges.length;
		for (let i = 0; i < length; i++) {
			const { lowerRange, upperRange } = arrayOfRanges[i];
			if (checkVal >= lowerRange && checkVal <= upperRange) {
				return true;
			}
		}
		return false;
	}

	let invalidTotal = 0;
		validTickets = [];
	otherTickets.forEach(ticket => {
		let values = ticket.split(",").map(Number),
			length = values.length;

		let invalidTicket = false;
		for (let i = 0; i < length; i++) {
			let found = false;
			for (const [key, val] of fields.entries()) {
				if (isInRange(values[i], val)) {
					found = true;
					break;
				}
			}
			// invalidTotal += found ? 0 : values[i]; // this is for P1

			// P2 will break before we can finish P1
			if(!found) {
				invalidTicket = true;
				break;
			}
		}

		if (!invalidTicket) validTickets.push(values);
	});

	// console.log(invalidTotal); // P1

	let indiceMappings = {};
	for (let [key, val] of fields.entries()) {
		indiceMappings[key] = [];
		let numTickets = validTickets.length,
			numFields = validTickets[0].length;
		for (let field = 0; field < numFields; field++) {
			for (let row = 0; row < numTickets; row++) {
				if (!isInRange(validTickets[row][field], val)) {
					break;
				}
				if (row === numTickets - 1) {
					indiceMappings[key].push(field);
				}
			}
		}
	}

	function removeVal(val) {
		for (let [key, values] of Object.entries(indiceMappings)) {
			let index = values.indexOf(val);
			if (index > -1) {
				values.splice(index, 1);
			}
		}
	}

	let finalMapping = new Map(),
		numberToRemove;
	while(Object.keys(indiceMappings).length > 0) {
		for (let [key, values] of Object.entries(indiceMappings)) {
			if (values.length === 1) {
				numberToRemove = values[0];
				finalMapping.set(key, values[0]);
				delete indiceMappings[key];
				removeVal(values[0]);
				break;
			}
		}
	}

	let p2 = 1;
	for (let [key, value] of finalMapping.entries()) {
		if (key.startsWith("departure")) p2 *= myTicket[value];
	}

	console.log("P2:", p2);

});
