fs = require('fs');
fs.readFile('Day22.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n\n'),
		player1Cards = lines[0].split('\n'),
		player2Cards = lines[1].split('\n');
		player1Cards.shift();
		player2Cards.shift();
		player1Cards = player1Cards.map(Number);
		player2Cards = player2Cards.map(Number);

	function recursiveCombat(player1, player2) {
		let cardConfigs = new Set();
			cardConfigs.add(`p1:${player1.join(' ')} p2:${player2.join(' ')}`);

		while(player1.length > 0 && player2.length > 0) {
			let p1Turn = player1.shift(),
				p2Turn = player2.shift();

			// if both players have >= # of cards as matches drawn card
			if (player1.length >= p1Turn && player2.length >= p2Turn) {
				// START GAME OF RECURSIVE COMBAT
				// copy <x> number of cards for their new deck = to the number the player drew,
				// then run sub-game with new sets.

				let p1New = player1.slice(0, p1Turn),
					p2New = player2.slice(0, p2Turn);

				// don't need the result here, since the player hands have already been modified
				recursiveCombat(p1New, p2New);

				if (p1New.length > p2New.length) {
					player1.push(p1Turn);
					player1.push(p2Turn);
				}
				else {
					player2.push(p2Turn);
					player2.push(p1Turn);
				}
			}
	
			else {
				if (p1Turn > p2Turn) {
					player1.push(p1Turn);
					player1.push(p2Turn);
				}
		
				else {
					player2.push(p2Turn);
					player2.push(p1Turn);
				}
			}
	
			// I *think* something is wrong here
			// Basically, take turn/collect cards as usual.
			// Check if the latest set of cards is already in the set.
			// If it is, do not go to next turn - player 1 wins.
			// Otherwise add the latest set
			let newSet = `p1:${player1.join(' ')} p2:${player2.join(' ')}`;
			if (cardConfigs.has(newSet)) { // card setup already exists, player 1 wins
				return player1;
			}
			cardConfigs.add(newSet);
		}

		return player1.length > player2.length ? player1 : player2;
	}

	let winner = recursiveCombat(player1Cards, player2Cards),
		length = winner.length,
		halfLength = Math.floor(winner.length/2);

	// reverse the array to make counting easier
	for(let i = 0; i < halfLength; i++) {
		let swap = winner[i];
		winner[i] = winner[length - 1 - i];
		winner[length - 1 - i] = swap;
	}

	let total = 0;
	for ( let i = 0; i < length; i++) {
		total += winner[i] * (i+1);
	}

	console.log("P2:", total);
});
