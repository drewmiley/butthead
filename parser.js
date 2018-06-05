const parser = lexedSource => {
	const parsers = [
		convertLineBeginning,
		replaceHeyBabyWithConsoleLog
	];
	return lexedSource
		.map(expression => parsers.reduce((acc, f) => f(acc), expression))
		.map(row => row.join(''))
		.join(';\n');
}

const convertLineBeginning = expression => {
	return expression.indexOf('bh:') === 0 ?
		expression.slice(1) :
		(expression.indexOf('note:') === 0 ?
			['const '].concat(expression.slice(1)) :
			['const '].concat(expression));
}
const replaceHeyBabyWithConsoleLog = expression => expression.map(d => d === 'heybaby' ? 'console.log' : d);

module.exports.parser = parser;
