import { readdirSync, readFileSync, writeFileSync } from 'fs';

const data = [];

const snakeToCamel = (str = ''): string =>
	str.toLowerCase().replace(/([-_][a-z])/g, group =>
		group
			.toUpperCase()
			.replace('-', '')
			.replace('_', ''),
	);

function CSVToArray(strData, strDelimiter) {
	// Check to see if the delimiter is defined. If not,
	// then default to comma.
	const newStrDelimiter = (strDelimiter || ',');

	// Create a regular expression to parse the CSV values.
	const objPattern = new RegExp(
		(
			// Delimiters.
			'(\\' + newStrDelimiter + '|\\r?\\n|\\r|^)' +

			// Quoted fields.
			'(?:"([^"]*(?:""[^"]*)*)"|' +

			// Standard fields.
			'([^"\\' + newStrDelimiter + '\\r\\n]*))'
		),
		'gi',
	);

	// Create an array to hold our data. Give the array
	// a default empty first row.
	const arrData = [[]];

	// Create an array to hold our individual pattern
	// matching groups.
	let arrMatches = null;

	// Keep looping over the regular expression matches
	// until we can no longer find a match.
	while (arrMatches = objPattern.exec(strData)) {

		// Get the delimiter that was found.
		const strMatchedDelimiter = arrMatches[1];

		// Check to see if the given delimiter has a length
		// (is not the start of string) and if it matches
		// field delimiter. If id does not, then we know
		// that this delimiter is a row delimiter.
		if (
			strMatchedDelimiter.length &&
			strMatchedDelimiter !== newStrDelimiter
		) {

			// Since we have reached a new row of data,
			// add an empty row to our data array.
			arrData.push([]);

		}

		let strMatchedValue;

		// Now that we have our delimiter out of the way,
		// let's check to see which kind of value we
		// captured (quoted or unquoted).
		if (arrMatches[2]) {
			// We found a quoted value. When we capture
			// this value, unescape any double quotes.
			strMatchedValue = arrMatches[2].replace(
				new RegExp('""', 'g'),
				'"',
			);
		} else {
			// We found a non-quoted value.
			strMatchedValue = arrMatches[3];
		}


		// Now that we have our value string, let's add
		// it to the data array.
		arrData[arrData.length - 1].push(strMatchedValue);
	}

	// Return the parsed data.
	return (arrData);
}

const base = '../public/data';
const interfaces = readdirSync(base, { withFileTypes: true })
	.filter(file => file.isFile() && file.name[0] !== '.')
	.map(file => {
		const content = CSVToArray(readFileSync(`${base}/${file.name}`).toString(), ',');

		const identifiers:string[] = content.shift();
		const datatypes:string[] = content.shift();
		
		const props = datatypes.map((d, index) => {
			let type = !isNaN(parseInt(d, 10)) ? 'number' : 'string';
			if (identifiers[index].startsWith('is')) {
				type = 'boolean';
			}
			return `${snakeToCamel(identifiers[index])}: ${type}`;
		});

		let intName = snakeToCamel(file.name.replace('.csv', ''));
		intName = intName.charAt(0).toUpperCase() + intName.slice(1);
		return `interface ${intName} {\n\t${props.join(';\n\t')};\n}`;
	});

writeFileSync('./types.d.ts', interfaces.join('\n\n'));