fs = require('fs');
fs.readFile('Day6.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let groups = data.split('\n\n'),
		answersYes = 0,
		answersYes2 = 0;
	
	groups.forEach(group => {
		let answers = {},
			participants = group.split("\n"),
			participantCount = participants.length;

		participants.forEach(participant => {
			let length = participant.length;
			for(let i = 0; i < length; i++) {
				let participantNum = participant.charAt(i);
				answers[participantNum] = answers[participantNum] ? answers[participantNum] + 1 : 1 ;
				if (answers[participantNum] === participantCount) answersYes2++;
			}
		});
		answersYes += Object.keys(answers).length;
	});
	console.log("P1:", answersYes);
	console.log("P2:", answersYes2);

});
