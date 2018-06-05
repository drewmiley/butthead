const parser = lexedSource => {
	const parsers = [
		convertLineBeginning,
		convertLogicalOperators,
		replaceHeyBabyWithConsoleLog
	];
	return lexedSource
		.map(expression => parsers.reduce((acc, f) => f(acc), expression))
		.map(row => row.join(''))
		.join(';\n')
		.concat([';\n']);
}

const convertLineBeginning = expression => {
	return expression.indexOf('bh:') === 0 ?
		expression.slice(1) :
		(expression.indexOf('note:') === 0 ?
			['const '].concat(expression.slice(1)) :
			['const '].concat(expression));
}
const convertLogicalOperators = expression => {
	return expression
		.map(d => d === 'OR' ? '||' : d)
		.map(d => d === 'ISNOT' ? '!==' : d)
		.map(d => d === 'IS' ? '===' : d)
		.map(d => d === 'AND' ? '&&' : d);
}
const replaceHeyBabyWithConsoleLog = expression => expression.map(d => d === 'heybaby' ? 'console.log' : d);

module.exports.parser = parser;
