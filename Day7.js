fs = require('fs');
fs.readFile('Day7.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n'),
		bagRules = {},
		containGold = {};
	
	lines.forEach(line => {
		let match = /^(\w+\s\w+)\sbags\scontain\s(.*).$/.exec(line);
		let mainBag = match[1].replace(/\s+/g, ''),
			containedBags = match[2].split(", ");

		if(!bagRules[`${mainBag}`]) bagRules[`${mainBag}`] = {
			bagsContained: [],
			containedBy: []
		};

		containedBags.forEach(bag => {
			if (bag !== "no other bags") {
				let bagMatch = /^(\d+)\s(\w+\s\w+)\sbag?/.exec(bag);

				// if(bagMatch) {
				let bagNoSpaces = bagMatch[2].replace(/\s+/g, ''),
				count = parseInt(bagMatch[1]);

				if(bagRules[`${bagNoSpaces}`]) {
					bagRules[`${bagNoSpaces}`].containedBy.push(mainBag);
				}

				else {
					bagRules[`${bagNoSpaces}`] = {
						containedBy: [mainBag],
						bagsContained: []
					}
				}

				bagRules[`${mainBag}`].bagsContained.push({
					count,
					bagColor: bagNoSpaces
				});

			}
		});
	});

	function findAllContainingBags(containedBag) {
		bagRules[`${containedBag}`].containedBy && bagRules[`${containedBag}`].containedBy .map(container => {
			if(!containGold[`${container}`]) {
				containGold[`${container}`] = true;
				findAllContainingBags(container);
			}
		});
	}
	findAllContainingBags("shinygold");

	console.log("P1:", Object.keys(containGold).length);

	function findBagsInside(containerBag) { //TODO: add multipler?
		let containedBags = bagRules[`${containerBag}`].bagsContained;
		
		if (containedBags.length === 0) {
			return 0;
		}

		let sum = 0;
		containedBags.forEach(containedBag => {
			// multiply the number of bags by the number of bags being contained.
			// Be sure to add 1 for the containing bag
			sum += containedBag.count * (findBagsInside(containedBag.bagColor) + 1);
		})
		return sum;
	}

	console.log("P2:", findBagsInside("shinygold"));
});
