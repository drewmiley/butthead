const parser = lexedSource => {
	const parsers = [
		convertLineBeginning,
		convertLogicalOperators,
		convertFilterAndAddParameters,
		convertMapAndAddParameters,
		convertReduceAndAddParameters,
		convertSortAndAddParameters,
		replaceHeyBabyWithConsoleLog,
		convertArrowFunction,
		convertArrayMethodFlow,
		addNewLineToTabs
	];
	return lexedSource
		.map(expression => parsers.reduce((acc, f) => f(acc), expression))
		.map(row => row.join(''))
		.join(';\n')
		.concat([';\n']);
}

const convertLineBeginning = expression => expression.indexOf('bh:') === 0 ?
	expression.slice(1) :
	(expression.indexOf('note:') === 0 ?
		['const '].concat(expression.slice(1)) :
		['const '].concat(expression));

const convertLogicalOperators = expression => expression
	.map(d => d === 'OR' ? '||' : d)
	.map(d => d === 'ISNOT' ? '!==' : d)
	.map(d => d === 'IS' ? '===' : d)
	.map(d => d === 'AND' ? '&&' : d);

const convertFilterAndAddParameters = expression => expression.includes('FILTER') ?
	expression.slice(0, expression.indexOf('FILTER')).concat(['filter((d, i) =>']).concat(expression.slice(expression.indexOf('FILTER') + 2)) :
	expression;

const convertMapAndAddParameters = expression => expression.includes('MAP') ?
	expression.slice(0, expression.indexOf('MAP')).concat(['map((d, i) =>']).concat(expression.slice(expression.indexOf('MAP') + 2)) :
	expression;

const convertReduceAndAddParameters = expression => expression.includes('REDUCE') ?
	expression.slice(0, expression.indexOf('REDUCE')).concat(['reduce((acc, d, i) =>']).concat(expression.slice(expression.indexOf('REDUCE') + 2)) :
	expression;

const convertSortAndAddParameters = expression => expression.includes('SORT') ?
	expression.slice(0, expression.indexOf('SORT')).concat(['sort((a, b) =>']).concat(expression.slice(expression.indexOf('SORT') + 2)) :
	expression;

const replaceHeyBabyWithConsoleLog = expression => expression.map(d => d === 'heybaby' ? 'console.log' : d);

const convertArrowFunction = expression => expression.map(d => d === '->' ? '=>' : d);

const convertArrayMethodFlow = expression => expression.map(d => d === '|>' ? '.' : d);

const addNewLineToTabs = expression => expression.includes('\t') ?
	expression.slice(0, expression.indexOf('\t')).concat('\n').concat(expression.slice(expression.indexOf('\t'))) :
	expression;

module.exports.parser = parser;
