fs = require('fs');
fs.readFile('Day4.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let passports = data.split('\n\n');
	let count1 = 0,
		count2 = 0;

	passports.forEach(passport => {
		let entryLines = passport.split('\n'),
			ppData = {};

		entryLines.forEach(line => {
			line.split(' ').forEach(entry => {
				let data = entry.split(':');
				ppData[`${data[0]}`] = data[1];
			})
		});
		if(ppData.byr && ppData.iyr && ppData.eyr && ppData.hgt && ppData.hcl && ppData.ecl && ppData.pid) {
			count1++;
			if ((parseInt(ppData.byr) >= 1920 && parseInt(ppData.byr) <=2002) &&
				(parseInt(ppData.iyr) >= 2010 && parseInt(ppData.iyr) <=2020) &&
				(parseInt(ppData.eyr) >= 2020 && parseInt(ppData.eyr) <=2030)) {
					let heightValid = false,
						hairValid = /^#([0-9a-f]){6,6}$/.test(ppData.hcl),
						eyeValid = /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(ppData.ecl),
						pidValid = /^\d{9}$/.test(ppData.pid);

					let height = ppData.hgt.match(/(\d+)(in|cm)/);
					if(height) {
						if(height[2] == 'cm') {
							if(parseInt(height[1]) >= 150 && (parseInt(height[1]) <= 193)) heightValid = true;
						}
						else if(height[2] == 'in') {
							if(parseInt(height[1]) >= 59 && (parseInt(height[1]) <= 76)) heightValid = true;
						}
					}


					if(heightValid && hairValid && eyeValid && pidValid) count2++;
				}
		}
	});
	console.log("P1:", count1);
	console.log("P2:", count2);
});
