let cups ="586439172".split('').map(Number),
	length = cups.length;

let startingVal = 5,
	endingVal = 2;

let current = startingVal,
cupsMap = new Map();
cupsMap.set(startingVal, {});
cups.forEach(cup => {
	if(cup !== current)
		cupsMap.set(current, {next: cup});
	current = cup;
});

cupsMap.set(endingVal, {next: startingVal});

function cupsToString() {
	current = 1;
	let order = ''
	let looped = 0;
	while (looped < 1 || current !== 1) {
		if (current === 1) looped++;
		order += current;
		current = cupsMap.get(current).next;
	}
	return order;
}

function playCups(startingCup, moveCount, highest) {

	let move = 0,
	currentCup = startingCup;
	while (move < moveCount) {
		let destination = currentCup - 1;
		if (destination === 0) destination = highest;

		//remove 3 cups
		let next1 = cupsMap.get(currentCup).next,
			next2 = cupsMap.get(next1).next,
			next3 = cupsMap.get(next2).next;

		cupsMap.set(currentCup, { next: cupsMap.get(next3).next});
		while (destination === next1 || destination === next2 || destination === next3) {
			destination--;
			if (destination === 0) destination = highest;
		}

		let nextLinked = cupsMap.get(destination).next;
		cupsMap.set(destination, { next: next1});
		cupsMap.set(next3, { next: nextLinked });

		currentCup = cupsMap.get(currentCup).next;
		move++;
	}
}

playCups(startingVal, 100, 9);

console.log('P1', cupsToString().substr(1));

// ok, yes, I could probably handle the setup through a function or something so I don't need to write it out twice,
// but I"m feeling lazy :P
cups ="586439172".split('').map(Number);

startingVal = 5,
endingVal = 1000000;

current = startingVal,
cupsMap = new Map();
cupsMap.set(startingVal, {});
cups.forEach(cup => {
	if(cup !== current)
		cupsMap.set(current, {next: cup});
	current = cup;
});

for (let i = 10; i <= 1000000; i++) {
	cupsMap.set(current, {next: i});
	current = i;
}
cupsMap.set(endingVal, {next: startingVal});

playCups(startingVal, 10000000, 1000000);

let next1 = cupsMap.get(1).next,
	next2 = cupsMap.get(next1).next;

console.log("P2:", next1 * next2);
