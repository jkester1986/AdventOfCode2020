// This is version #2, after looking at someone else's solution
// and realizing I could simplify things a bit
// Also, I discovered js has Map()'s, and they're faster than a standard object (11 mins down to 5s)
let numbers = [9,19,1,6,0,5], // take out the last value and use it as currentNumber below
	numbersAndTurns = new Map();

numbers.forEach((number, i) => {
	numbersAndTurns.set(number, i);
});

let currentNumber = 4;
for (let i = numbers.length; i < 30000000; i++) {
	let val = numbersAndTurns.get(currentNumber);
	let next = val == undefined ? 0 : i - val;
	numbersAndTurns.set(currentNumber, i);

	if (i === 2019) console.log("P1:", currentNumber);
	if (i === 30000000 - 1) { //oh boy. Well, this isn't exactly optimized....but it also doesn't take an absolute eternity
		console.log("P2:", currentNumber);
	}
	currentNumber = next;
}
