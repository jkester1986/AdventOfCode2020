fs = require('fs');
memoize = require('lodash.memoize');

fs.readFile('Day10.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let values = data.split('\n').map(Number);
		values.push(0);
		values.sort((a, b) => a - b);

	let length = values.length,
		joltDiff1 = 0,
		joltDiff3 = 1,
		tree = {};

	for (let i = 0; i < length; i++) {
		switch(values[i+1] - values[i]) {
			case 1:
				joltDiff1++;
				break;
			case 3:
				joltDiff3++;
				break;
			case 2:
				break;
		}

		tree[values[i]] = [];
		if(values[i + 1] - values[i] <= 3) tree[values[i] ].push(values[i+1]);
		if(values[i + 2] - values[i] <= 3) tree[values[i] ].push(values[i+2]); 
		if(values[i + 3] - values[i] <= 3) tree[values[i] ].push(values[i+3]);
	}

	console.log("P1:", joltDiff1 * joltDiff3);

	const combinations = memoize(val => {
		let count = 0;
		if (val === values[length-1]) return 1;

		tree[val].forEach(newVal => {
			count += combinations(newVal);
		});

		return count;
	});
	console.log("P2:", combinations(0));
});
