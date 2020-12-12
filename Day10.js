fs = require('fs');
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
	console.log("jolts:", joltDiff1 + joltDiff3);

	let count = 1;
	function combinations(val) {
		if (val === values[length-1]) return count++;

		tree[val].forEach(newVal => {
			combinations(newVal);
		});
	}
	combinations(0);

	// function combinations(index) {
	// 	if( index === 0 || values[index] - values[index-1] <= 3) { //1
	// 			if ( index === length - 1) return 1;
	// 			if ( values[index + 3] && values[index + 3] - values[index] <=3) { // 6 - 1
	// 				return combinations(index + 1) + combinations(index + 2) + combinations(index + 3);
	// 			}
	// 			else if ( values[index + 2] && values[index + 2] - values[index] <=3) { // 4 - 1
	// 				return combinations(index + 1) + combinations(index + 2);
	// 			}
	// 			else if ( values[index + 1] && values[index + 1] - values[index] <=3) {
	// 				return combinations(index + 1);
	// 			}
	// 	}
	// 	else return 0;
	// }

	console.log(count);

});
