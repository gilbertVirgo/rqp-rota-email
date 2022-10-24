const chordSheetsDriveURL =
	"https://drive.google.com/drive/folders/1rIVol4zM_IIMDhvGa5NmA5vcEPi8ZNU-";

module.exports = ({ thisSat, nextSat }) => `
<p>Hey Thomas/Luiz,</p>
<p>Here's who's on for worship this week:</p>
<ul>
    <li><strong>Lead:</strong> ${thisSat.Lead}</li>
    ${Object.keys(thisSat)
		.filter((title) => title[0] === "*" && thisSat[title] !== "N/A")
		.map((key) => `<li><strong>${key}:</strong> ${thisSat[key]}</li>`)
		.join("")}
</ul>
<br/>

<p>Here's who's on for worship next week:</p>
<ul>
    <li><strong>Lead:</strong> ${nextSat.Lead}</li>
    ${Object.keys(nextSat)
		.filter((title) => title[0] === "*" && nextSat[title] !== "N/A")
		.map((key) => `<li><strong>${key}:</strong> ${nextSat[key]}</li>`)
		.join("")}
</ul>
<br/>

<p>Click <a href="${chordSheetsDriveURL}">here</a> for chord sheets.</p>
<br/>

<p>Please test the links, and/or let me know if anything is wrong with the email formatting/content.</p>
<br/>

<p>Thanks, Gil</p>
<p>(This is an automated email)</p>
`;
