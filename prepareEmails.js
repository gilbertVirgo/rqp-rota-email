require("dotenv").config();

const {
	SHEET_ID,
	GOOGLE_SERVICE_ACCOUNT_EMAIL,
	GOOGLE_PRIVATE_KEY,
	DETAILS_WORKSHEET_ID,
	SETLISTS_WORKSHEET_ID,
} = process.env;

const { GoogleSpreadsheet } = require("google-spreadsheet");
const emailContent = require("./email-content");
const getContacts = require("./getContacts");
const getSetlists = require("./getSetlists");

const doc = new GoogleSpreadsheet(SHEET_ID);

module.exports = async function () {
	await doc.useServiceAccountAuth({
		client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
		private_key: GOOGLE_PRIVATE_KEY,
	});

	await doc.loadInfo();

	const sheets = {
		contacts: doc.sheetsById[DETAILS_WORKSHEET_ID],
		setlists: doc.sheetsById[SETLISTS_WORKSHEET_ID],
	};

	const contacts = await getContacts(sheets.contacts);

	const { thisSat, nextSat } = await getSetlists(sheets.setlists);

	// Safeguarding
	const essentials = ["Lead", "Chord Sheets", "Songs"];

	for (const e of essentials) {
		if (!thisSat[e] || thisSat[e] === "N/A")
			throw new Error(`No ${e} set for this Sat.`);
	}

	if (!nextSat.Lead || nextSat.Lead === "N/A")
		throw new Error(`No lead set for next week.`);

	const emails = [];

	// This week's lead
	emails.push({
		to: contacts.find(({ Name }) => Name === thisSat.Lead).Email,
		content: emailContent.lead({
			Name: thisSat.Lead,
			thisWeek: true,
			...thisSat,
		}),
	});

	// Next week's lead
	emails.push({
		to: contacts.find(({ Name }) => Name === nextSat.Lead).Email,
		content: emailContent.lead({
			Name: nextSat.Lead,
			thisWeek: false,
			...nextSat,
		}),
	});

	// This week's supporters
	Object.keys(thisSat)
		.filter((t) => t[0] === "*")
		.forEach((role) => {
			const contact = contacts.find(({ Name }) => Name === thisSat[role]);

			emails.push({
				to: contact.Email,
				content: emailContent.supporter({
					Name: contact.Name,
					thisWeek: true,
					...thisSat,
				}),
			});
		});

	// Next week's supporters
	Object.keys(nextSat)
		.filter((t) => t[0] === "*")
		.forEach((role) => {
			const contact = contacts.find(({ Name }) => Name === nextSat[role]);

			emails.push({
				to: contact.Email,
				content: emailContent.supporter({
					Name: contact.Name,
					thisWeek: false,
					...nextSat,
				}),
			});
		});

	// Managers
	["thomas@redeemerqp.com", "luiz@redeemerqp.com"].forEach((email) => {
		emails.push({
			to: email,
			content: emailContent.manager({ thisSat, nextSat }),
		});
	});

	// Maintenance
	emails.push({
		to: "gil@redeemerqp.com",
		content: emailContent.maintenance({ thisSat, nextSat }),
	});

	return emails.filter(({ to }) => to);
};
