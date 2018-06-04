const parser = lexedSource => {
	let parsed = lexedSource;
	parsed = replaceBhWithConst(parsed);
	return parsed
		.map(joinRow)
		.join(';\n');
}

const joinRow = row => {
	return row.join(' ');
}

const replaceBhWithConst = source => {
	return source.map(row => row.map(d => d === 'bh' ? 'const' : d));
}

module.exports.parser = parser;
