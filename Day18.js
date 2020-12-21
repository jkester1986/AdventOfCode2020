fs = require('fs');
fs.readFile('Day18.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
	
	function solve(equation, fullEquation = false) {
		// console.log({equation});
		let total = 0,
			charsTraversed,
			length = equation.length;

		for (let i = 0; i < length; i++) {
			if (equation[i] === ')') {
				if (!fullEquation)
					return { total, charsTraversed: i+2};
			}
			else if (i === 0) {
				if (equation.charAt(0) === "(") {
					let solved = solve(equation.substr(1));
					total += solved.total;
					i += solved.charsTraversed - 1;
				}
				else
					total = parseInt(equation[i]);
			}
			else {
				let operation = equation[i];
				let next = equation[i+1];

				if (next === '(') {
					let solved = solve(equation.substr(i+2));
					total = operation === '+' ? total + solved.total : total * solved.total;
					i += solved.charsTraversed;
				}
				else {
					let number = parseInt(next);
					total = operation === '+' ? total + number : total * number;
					i++;
				}
			}
		}

		return { total, charsTraversed: length }
	}

	let total = 0;
	lines.forEach(equation => {
		total += solve(equation, true).total;
	});

	console.log("P1:", total);

	// this is for once all ( ) are gone
	function solveWeirdMath(equation) {
		while(/\+/.exec(equation)) {
			let additionPattern = /(\d+\+\d+)/;
			let split = equation.split(additionPattern);
			let newEquation = '';
			split.forEach(section => {
				if (additionPattern.exec(section))
					newEquation += eval(section);
				else
					newEquation += section;
			});
			equation = newEquation;
		}
		return eval(equation);
	}

	function solveP2(equation) {
		let groupsPattern = /(\([^()]+\))/;
		while(groupsPattern.exec(equation)) {
			let split = equation.split(groupsPattern);
			let newEquation = '';
			split.forEach(section => {
				if (section[0] === '(' && section[section.length - 1] === ')')
					newEquation += solveWeirdMath(section.slice(1, section.length - 1));
				else
					newEquation += section;
			});
			equation = newEquation;
		}
		return solveWeirdMath(equation);
	}

	let totalP2 = 0;
	lines.forEach(equation => {
		totalP2 += solveP2(equation);
	});

	console.log("P2:", totalP2);

});
