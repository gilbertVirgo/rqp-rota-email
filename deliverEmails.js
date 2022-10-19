require("dotenv").config();

const { EMAIL, APP_PASSWORD } = process.env;
const prepareEmails = require("./prepareEmails");

const send = require("gmail-send")({
	user: EMAIL, // Look into changing this to redeemer email
	pass: APP_PASSWORD,
	subject: "Redeemer Worship Info",
});

module.exports = async function () {
	const emails = await prepareEmails();

	for (const email of emails) {
		await send({
			to: email.to,
			html: email.content,
		});
	}
};
