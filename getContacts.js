require("dotenv").config();

module.exports = async (sheet) => {
	await sheet.loadHeaderRow();

	const rows = await sheet.getRows();

	return rows.map((row) => {
		const contact = {};

		sheet.headerValues.forEach((header) => {
			contact[header] = row[header];
		});

		return contact;
	});
};
