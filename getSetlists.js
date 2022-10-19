const moment = require("moment");

module.exports = async (sheet) => {
	const rows = await sheet.getRows();

	let index = rows.length,
		thisSat;

	while (moment().isBefore(moment(rows[--index].Date))) {
		thisSat = rows[index];
	}

	return {
		thisSat,
		nextSat: rows[index + 2], // not sure why I have to + 2 here, but it works
	};
};
