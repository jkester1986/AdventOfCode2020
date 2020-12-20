fs = require('fs');
fs.readFile('Day14.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	let lines = data.split('\n'),
		memory = {},
		memory2 = new Map();

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

	maskBase = '';
	// for each line of the input
	lines.forEach(line => {
		let maskCheck = /^mask\s=\s(.+)$/.exec(line);
		// line has a mask, so set the mask
		if (maskCheck) {
			maskBase = '0b' + maskCheck[1];
		}
		// line is for a memory slot
		else {
			let memoryInfo = /^mem\[(\d+)\]\s=\s(\d+)$/.exec(line);
			let slotKey = Number(memoryInfo[1]).toString(2),
				val = BigInt(memoryInfo[2]);

			// apply the mask to the memory slot #
			let maskedMem = getMaskedMem(slotKey, maskBase);
			// set the value to each applicable memory slot
			setToMemory(maskedMem, val, memory2);
		}
	});

	let sum = 0n
	for (let [_, val] of memory2.entries()) {
		sum += val;
	}

	console.log("P2:", Number(sum));
});

function getMaskedMem(slot, maskBase) {
	let length = slot.length;
	let prefixed = '0b';

	// generate the correct number of missing 0's, then tack them on to the front of `slot`
	for (let i = length; i < 36; i++) {
		prefixed += '0';
	}
	slot = prefixed + slot;

	// Anywhere that maskBase has a 1 or an X,
	// replace the character at the same index with that maskBase char
	for (let i = 2; i < 38; i++) {
		if (maskBase[i] !== '0') {
			slot = slot.substr(0, i) + maskBase[i] + slot.substr(i+1); // was treating substr like slice....
		}
	}

	return slot;
}

function setToMemory(maskedMem, val, memory) {
	// if there's still an X in the mem key, change the next one
	if (/X/.exec(maskedMem)) {
		setToMemory(maskedMem.replace('X', '0'), val, memory);
		setToMemory(maskedMem.replace('X', '1'), val, memory);
	}
	// no X's, great! Set that key to the specified value
	else memory.set(maskedMem, val);
	// ^ for some reason, if I change `maskedMem` to BigInt(`maskedMem`),
	// I get 6 fewer memory slots in my Map().
	// Not that it should matter, since it's just a key
}

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
