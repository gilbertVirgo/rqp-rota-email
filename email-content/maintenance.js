const beautify = require("json-beautify");

const chordSheetsDriveURL =
	"https://drive.google.com/drive/folders/1rIVol4zM_IIMDhvGa5NmA5vcEPi8ZNU-";

module.exports = ({ thisSat, nextSat }) => {
	const neededKeys = ["Date", "Lead", "Songs", "Notes"];

	let distilled = {
		thisSat: {},
		nextSat: {},
	};

	const distill = (row, rowName) =>
		[
			...Object.keys(row).filter((t) => t[0] === "*"),
			...neededKeys,
		].forEach((key) => {
			distilled[rowName][key] = row[key];
		});

	distill(thisSat, "thisSat");
	distill(nextSat, "nextSat");

	return `
<p>Redeemer Worship Rota mailing list info for today.</p>
<p><strong>This sat</strong></p>
<style>
    table, td {
        border-collapse: collapse;
        border: 1px solid lightgrey;
    }

    td { padding: 5px; }
</style>
<table>
    <tbody>
        ${Object.keys(distilled.thisSat)
			.map(
				(key) =>
					`<tr>
                <td><strong>${key}</strong></td>
                <td>${distilled.thisSat[key]}</td>
            </tr>`
			)
			.join("")}
    </tbody>
</table><br/>
<p><strong>Next sat</strong></p>
<table>
    <tbody>
        ${Object.keys(distilled.nextSat)
			.map(
				(key) =>
					`<tr>
                <td><strong>${key}</strong></td>
                <td>${distilled.nextSat[key]}</td>
            </tr>`
			)
			.join("")}
    </tbody>
</table><br/>
<p>Chord sheets to be found <a href="${chordSheetsDriveURL}">here</a>.</p>
`;
};
