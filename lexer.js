const lexer = program => {
	return program.replace(/(?:\r\n|\r|\n)/g, '')
		.split('!')
		.map(splitRowIntoOperations);
}

const splitRowIntoOperations = row => {
	return row.split('')
		.reduce((acc, character) => {
			const currentOperation = acc[acc.length - 1];
			if (characterIsPartOfOperation(character, currentOperation)) {
				acc[acc.length - 1] = `${ currentOperation }${ character }`;
			} else {
				acc.push(character);
			}
			return acc;
		}, ['']);
}

const characterIsPartOfOperation = (character, operation) => {
	if (operation === ' ' && character === ' ') {
		// Space
		return true;
	} else if (parseInt(operation) && parseInt(character)) {
		// Int
		return true;
	} else if (!/[^a-zA-Z]/.test(operation) && !/[^a-zA-Z]/.test(character)) {
		// Text
		return true;
	}
	return false;
}

module.exports.lexer = lexer;
