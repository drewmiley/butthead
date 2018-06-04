const { readFileSync, writeFileSync, existsSync } = require('fs');

const fileName = process.argv.pop();

if (fileName.slice(-3) !== '.bh') {
    console.error('You\'re a buttmunch!');
    process.exit(1);
}

if (!existsSync(fileName)) {
  console.error(`"${fileName}" does not exist.`)
  process.exit(1);
}

const program = readFileSync(fileName, { encoding: 'utf-8' });

eval(program);

writeFileSync(`${ fileName }.js`, program);
