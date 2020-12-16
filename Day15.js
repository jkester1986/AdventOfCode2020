let numbers = [9,19,1,6,0,5,4],
	numbersAndTurns = {};

numbers.forEach((number, i) => {
	numbersAndTurns[number] = {
		latestTurn: i
	};
});


let previousNumber = numbers[numbers.length - 1];
for (let i = numbers.length; i < 30000000; i++) {

	// previous number did not exist before
	if (numbersAndTurns[`${previousNumber}`]?.previousTurn === undefined) {
		numbersAndTurns['0'] = {
			previousTurn: numbersAndTurns['0'].latestTurn,
			latestTurn: i
		};
		previousNumber = 0;
	}
	// previous number did exist before
	else {
		let difference = numbersAndTurns[`${previousNumber}`].latestTurn - numbersAndTurns[`${previousNumber}`].previousTurn;
		if(numbersAndTurns[`${difference}`]) {
			numbersAndTurns[`${difference}`] = {
				previousTurn: numbersAndTurns[`${difference}`].latestTurn,
				latestTurn: i
			};
		}
		else {
			numbersAndTurns[`${difference}`] = { latestTurn: i };
		}
		
		previousNumber = difference;


		if (i === 2019) console.log("P1:", difference);
		if (i === 30000000 - 1) { //oh boy. Well, this isn't exactly optimized....but it also doesn't take an absolute eternity
			console.log("P2:", difference);
		}
	}
}
