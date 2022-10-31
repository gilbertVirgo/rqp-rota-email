module.exports = async (sheet) => {
	const rows = await sheet.getRows();

	let index = rows.length,
		thisSat;

	// Note that if there are empty rows at the bottom of the sheet, this code will (gracefully) break.

	while (new Date() < new Date(rows[--index].Date)) {
		thisSat = rows[index];
	}

	return {
		thisSat,
		nextSat: rows[index + 2], // not sure why I have to + 2 here, but it works
	};
};
