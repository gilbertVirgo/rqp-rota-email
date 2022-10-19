const footer = require("./footer");

const setlistsSheetURL =
	"https://docs.google.com/spreadsheets/d/1V6SpKCPwOs-2jUVbq7UZIrGYxLGisG9Xqfj02oguw2o/edit#gid=2071438157";

module.exports = ({ Name, thisWeek, Date, Songs, ...setlist }) => {
	const otherRoles = Object.keys(setlist).filter(
		(title) => title[0] === "*" && setlist[title] === Name
	);

	return `
<p>Hey ${Name},</p>
<p>Just a reminder that I've got you down to lead worship at Redeemer ${
		thisWeek ? "this" : "next"
	} week (${Date}).</p>
<p>Unless specified elsewhere, the rehearsal will be at the Redeemer offices from 11:00am on the same day.</p>
<br/>

${
	otherRoles.length
		? `<p>Aside from leading the singing, I've planned that your role(s) will be <strong>${otherRoles.join(
				", "
		  )}</strong>.</p><br/>`
		: ""
} 

${
	// Two weeks in advance.
	!thisWeek
		? `
	${
		// Sometimes I set some songs in advance.
		Songs
			? `<p>Just in case you <em>don't</em> have the capacity to choose your own songs this week, I've planned for the following:</p>
	<ul>
		${Songs.split("\n")
			.map((songTitle) => `<li>${songTitle}</li>`)
			.join("")}
	</ul>
	<p>Alternatively if you <em>do</em> have capacity to select your own songs, you have free reign over the set list.</p>
	<p>In that case:</p>`
			: ""
	}
	<p>Please navigate to the setlists sheet <a href="${setlistsSheetURL}">here</a> to create this week's set (see the 'Songs' column).</p>
	<p>(I recommend consulting Thomas for this week's sermon themes, and choosing songs based on those, but this isn't obligatory.)</p>
	<br/>
	
	<p>For the sake of the other volunteers, I would be grateful if you could have your final set selected (and reflected on the <a href="${setlistsSheetURL}">Google Sheet</a>) before next Monday.</p>
	<p>Please get in touch with me when you're ready so that I can provide chord sheets, or any other resources that you might need.</p>
	<br/>`
		: `
	<p>If you need anything else, please don't hesitate to get in touch.</p>
	<p>You're a volunteer, and it's my job to help you out wherever possible.</p>
	`
}

${footer}
`;
};
