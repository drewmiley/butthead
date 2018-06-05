const lexer = program => {
	return program
		.split('!')
		.map(splitRowIntoOperations)
		.slice(0, -1);
}

const splitRowIntoOperations = row => {
	return row.split('')
		.reduce((acc, character) => {
			if (character === '' || character === '\n' || character === '\r\n') {
				return acc;
			}
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
	if ((operation === 'bh' || operation === 'note') && character === ':') {
		// Declares non-variables assignment on a line
		return true;
	}
	return false;
}

module.exports.lexer = lexer;
