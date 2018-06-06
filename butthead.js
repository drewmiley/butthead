const { readFileSync, writeFileSync, existsSync } = require('fs');

const { lexer } = require('./lexer');
const { parser } = require('./parser');

const processArguments = process.argv.slice(2);

const compile = processArguments.indexOf('-c') !== -1;
const evaluate = processArguments.indexOf('-e') !== -1;
const fileName = processArguments.find(arg => arg.startsWith('-f=')).substring(3);
const outputFileName = processArguments.find(arg => arg.startsWith('-o=')) ?
		processArguments.find(arg => arg.startsWith('-o=')).substring(3) :
		`${ fileName }.js`;

if (fileName.slice(-3) !== '.bh') {
		console.error('You\'re a buttmunch! File suffix should be .bh');
		process.exit(1);
}

if (!existsSync(fileName)) {
	console.error(`You\'re a buttmunch! "${fileName}" does not exist.`);
	process.exit(1);
}

const program = readFileSync(fileName, { encoding: 'utf-8' });
const lexedSource = lexer(program);

lexedSource.forEach(row => {
		const isArray = row.includes('[') && row.includes(']');
		const isFunction = row.includes('->');
		const isArrayMethod = row.includes('FILTER') || row.includes('MAP') || row.includes('REDUCE') || row.includes('SORT');
		const isNote = row.includes('note:');
		const isBh = row.includes('bh:');
		if (!(isArray || isFunction || isNote || isBh)) {
				console.error('You\'re a buttmunch! Constants should be arrays or functions unless note keeping.');
				process.exit(1);
		}
})

const transpiledProgram = parser(lexedSource);

if (compile) {
	writeFileSync(outputFileName, transpiledProgram);
}

if (evaluate) {
	eval(transpiledProgram);
}
