const lexer = program => {
	return program.replace(/(?:\r\n|\r|\n)/g, '')
		.split(';')
		.map(row => row.split(' '));
}

module.exports.lexer = lexer;
