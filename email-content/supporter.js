const footer = require("./footer");

module.exports = ({
	Name,
	thisWeek,
	Date,
	Songs,
	Lead,
	"Chord Sheets": ChordSheets,
	...setlist
}) => {
	const roles = Object.keys(setlist).filter(
		(title) => title[0] === "*" && setlist[title] === Name
	);

	return `
<p>Hey ${Name},</p>
<p>Just a reminder that I've got you down for worship at Redeemer ${
		thisWeek ? "this" : "next"
	} week (${Date}).</p>
<p>Unless specified elsewhere, the rehearsal will be at the Redeemer offices from 11:00am on the same day.</p>
<br/>
<p>I've planned that your role(s) will be <strong>${roles.join(
		", "
	)}</strong>, however, if you aren't available please let me know as soon as you can.</p>

${
	thisWeek
		? `<p>We are looking to do the following songs:</p>
	<ul>
		${Songs.split("\n")
			.map((songTitle) => `<li>${songTitle}</li>`)
			.join("")}
	</ul>
	<p>Please click <a href="${ChordSheets}">here</a> to find the chord sheets.</p>
	<br/>`
		: `<p>If you'd like to get ahead with practicing/rehearsing for next week's songs, please get in touch with <strong>${Lead}</strong> who is leading ${
				thisWeek ? "this" : "next"
		  } week.</p>`
}

<p>Please also let me know if you need anything!</p>
${footer}
`;
};
