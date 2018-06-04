const lexer = program => {
	return program.replace(/(?:\r\n|\r|\n)/g, '')
		.split(';')
		.map(splitRowIntoOperations);
}

const splitRowIntoOperations = row => {
	return row.split(' ');
}

module.exports.lexer = lexer;
