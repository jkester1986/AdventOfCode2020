let cardPublic = 12578151,
	doorPublic = 5051300,
	subject = 7;


function getLoopKey(publicKey) {
	let start = 1,
	loopSize = 0;
	while(start !== publicKey) {
		start *= 7;
		start = start % 20201227;
		loopSize++;
	}
	return loopSize;
}

let cardLoop = getLoopKey(cardPublic),
	doorLoop = getLoopKey(doorPublic);


let encryption = 1,
	loopSize = 0;
while (loopSize < doorLoop) {
	encryption *= cardPublic;
	encryption = encryption % 20201227;
	loopSize++;
}

console.log(encryption);