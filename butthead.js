const { readFileSync, writeFileSync, existsSync } = require('fs');

const processArguments = process.argv.slice(2);

const compile = processArguments.indexOf('-c') !== -1;
const evaluate = processArguments.indexOf('-e') !== -1;
const fileName = processArguments.find(arg => arg.startsWith('-f=')).substring(3);
const outputFileName = processArguments.find(arg => arg.startsWith('-o=')) ?
    processArguments.find(arg => arg.startsWith('-o=')).substring(3) :
    `${ fileName }.js`;

if (fileName.slice(-3) !== '.bh') {
    console.error('You\'re a buttmunch!');
    process.exit(1);
}

if (!existsSync(fileName)) {
  console.error(`"${fileName}" does not exist.`);
  process.exit(1);
}

const program = readFileSync(fileName, { encoding: 'utf-8' })
    .split(';');

if (compile) {
    writeFileSync(outputFileName, program.join(';'));
}

if (evaluate) {
    eval(program);
}
