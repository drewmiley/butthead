const parser = lexedSource => {
	let parsed = lexedSource;
	parsed = replaceBhWithConst(parsed);
	return parsed
		.map(row => row.join(' '))
		.join(';\n');
}

const replaceBhWithConst = source => {
	return source.map(row => row.map(d => d === 'bh' ? 'const' : d));
}

module.exports.parser = parser;
