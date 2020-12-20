fs = require('fs');
memoize = require('lodash.memoize');

fs.readFile('Day19.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let sections = data.split('\n\n'),
		rulesArr = sections[0].replace(/"/g, '').split('\n'),
		messages = sections[1].split('\n'),
		rules = new Map();

	rulesArr.forEach(rule => {
		let separated = /^(\d+):\s(.*)$/.exec(rule);
		rules.set(separated[1], separated[2].split('|'));
	});

	const findPattern = memoize(ruleKey => {
	// function findPattern(ruleKey) {
		let rule = rules.get(ruleKey);
		let length = rule.length;
		// one rule
		if (length === 1) {
			// rule is characters
			if (/^\D+$/.exec(rule)) return rule[0];
			// rule is number(s)
			else {
				let ruleString = '';
				let subRules = rule[0].trim().split(' ');
				subRules.forEach(subRule => {
					if (ruleKey === '11')
						ruleString += findPattern(subRule) + `{1}`;
					else
						ruleString += findPattern(subRule);
				});
				if (ruleKey === '8') ruleString += '+';
				return ruleString;
			}
		}
		// two different rules
		else {
			let ruleString = '(';
			let subRules0 = rule[0].trim().split(' '),
				subRules1 = rule[1].trim().split(' ');

			subRules0.forEach(subRule => {
				ruleString += findPattern(subRule);
			});

			ruleString += '|';

			subRules1.forEach(subRule => {
				ruleString += findPattern(subRule);
			});

			ruleString += ')';
			return ruleString;
		}
	});

	let rulesParsed = new Map();
	
	for ( let [key, _] of rules.entries()) {
		rulesParsed.set(key, new RegExp('^' + findPattern(key) + '$'));
	}

	let matches = 0,
		failedMessages = [],
		iterations = 1;

	while (iterations <= 5) { // this was 10, but now I know I only need 5 after I got my answer
		if (failedMessages.length !== 0)
			messages = [...failedMessages];

		failedMessages = [];

		if (iterations > 1) {
			let rule0 = rulesParsed.get('0').toString().replace(new RegExp(`${iterations - 1}`, "g"), iterations);
			rule0 = rule0.slice(1, rule0.length - 1);
			rulesParsed.set('0', new RegExp(rule0));
		}

		messages.forEach(message => {
			if (rulesParsed.get('0').exec(message))
				matches++;
			else failedMessages.push(message);
		});

		iterations++;
	}

	console.log("P2:", matches);

});
