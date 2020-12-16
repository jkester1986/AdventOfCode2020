fs = require('fs');
fs.readFile('Day14.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	let lines = data.split('\n'),
		memory = {},
		memory2 = {};

	let maskBase = '';
	lines.forEach(line => {
		let maskCheck = /^mask\s=\s(.+)$/.exec(line);
		if (maskCheck) {
			maskBase = '0b' + maskCheck[1];
		}
		else {
			let memoryInfo = /^mem\[(\d+)\]\s=\s(\d+)$/.exec(line);
			let memSlot = memoryInfo[1],
				val = BigInt(memoryInfo[2]);
			memory[memSlot] = mask(val, maskBase);
		}
	});

	let total = 0n;
	for (let [_, value] of Object.entries(memory)) {
		total += value;
	}
	console.log("P1:", Number(total));
});

function mask(number, maskBase) {
	return clearBits(setBits(number, maskBase), maskBase);
}

function setBits(number, maskBase) {
	let mask = BigInt(maskBase.replace(/X/g, 0));
	return number | mask;
}

function clearBits(number, maskBase) {
	let mask = BigInt(maskBase.replace(/X/g, 1));
	return number & mask;
}
