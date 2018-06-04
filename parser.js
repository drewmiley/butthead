const parser = lexedSource => {
	const parsers = [
		replaceBhWithConst,
		replaceHeyBabyWithConsoleLog
	];
	return lexedSource
		.map(expression => parsers.reduce((acc, f) => f(acc), expression))
		.map(row => row.join(''))
		.join(';');
}

const replaceBhWithConst = expression => expression.map(d => d === 'bh' ? 'const' : d);
const replaceHeyBabyWithConsoleLog = expression => expression.map(d => d === 'heybaby' ? 'console.log' : d);

module.exports.parser = parser;
