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
					ruleString += findPattern(subRule);
				});

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
	
	// match at least once, with any number of repeats
	// rulesParsed.set('8', new RegExp('((a(((((ab|bb)b|aba)a|((a|b)(a|b)a|(b(a|b)|aa)b)b)b|((a(ba|bb)|b(a|b)(a|b))a|(a(ba|aa)|b(a|b)(a|b))b)a)b|(b((b(ba|bb)|aab)b|(b(b(a|b)|aa)|aab)a)|a(b(b(a|b)(a|b)|a(b(a|b)|aa))|a(aab|(ba|aa)a)))a)|b((b(b(baa|aba)|a(b(ab|bb)|a(bb|aa)))|a((bba|(b(a|b)|aa)b)b|(b(b(a|b)|aa)|a(ba|bb))a))a|(a(((ba|aa)b|aba)b|(aab|(ab|bb)a)a)|b(b((ab|ba)a|(ba|bb)b)|a((ba|aa)a|(ba|bb)b)))b))a|((((((ba|aa)b|aba)a|(b(bb|aa)|a(a|b)(a|b))b)b|(a((ba|aa)a|(ba|a(a|b))b)|b((bb|aa)b|baa))a)a|(a(((a(a|b)|bb)a|(a|b)(a|b)b)a|(aaa|b(ba|aa))b)|b(aaba|b(a(ba|aa)|b(b(a|b)|aa))))b)a|(((((ba|bb)b|(bb|aa)a)a|(bab|a(ab|bb))b)b|(a((aa|ab)b|(ab|bb)a)|b(a|b)(a(a|b)|bb))a)a|(a(baab|(baa|bbb)a)|b(((bb|aa)b|baa)a|(bab|a(b(a|b)|aa))b))b)b)b)+'));
	// rulesParsed.
	
	for ( let [key, _] of rules.entries()) {
		// if (key !== '8' && key !== '11')
			rulesParsed.set(key, new RegExp('^' + findPattern(key) + '$'));
	}

	let matches = 0;
	messages.forEach(message => {
		if (rulesParsed.get('0').exec(message))
			matches++;
	});

	console.log("P1:", matches);

});
