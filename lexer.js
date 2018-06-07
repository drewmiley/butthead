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
	const isSpace = str => str === ' ';
	const isNumber = str => !isNaN(str);
	const isText = str => !/[^a-zA-Z]/.test(str);
	const isBracket = str => str === '[' || str === ']' || str === '{' || str === '}' || str === '(' || str === ')';
	const isPunctuation = str => (!isSpace(str) && !isNumber(str) && !isText(str) && !isBracket(str));
	return (isSpace(character) && isSpace(operation)) ||
		(isNumber(character) && isNumber(operation)) ||
		(isText(character) && isText(operation)) ||
		(isBracket(character) && isBracket(operation)) ||
		(isPunctuation(character) && isPunctuation(operation)) ||
		isNumber(operation) && character === '.' ||
		operation == '-' && isNumber(character) ||
		(operation === 'bh' || operation === 'note') && character === ':';
}

module.exports.lexer = lexer;
