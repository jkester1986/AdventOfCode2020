fs = require('fs');
fs.readFile('Day3.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
	let count = 0,
		count2 = 0;

	let lineLength = lines[0].length;
	let length = lines.length;
		
	function findTrees(right, down) {
		let y = 0,
			x = 0,
			trees = 0,
			end = length - 1;
	
		while(y < end) {
			x += right;
			y += down;
			if(lines[y].charAt(x%lineLength) === "#") trees ++;
		}
	
		return trees;
	}

	console.log("Part 1:", findTrees(3, 1));
	console.log("Part 2:", findTrees(1,1) * findTrees(3,1) * findTrees(5,1) * findTrees(7,1) * findTrees(1,2));
});
