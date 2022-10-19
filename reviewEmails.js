const fs = require("fs");
const path = require("path");
const prepareEmails = require("./prepareEmails");

module.exports = async () => {
	const emails = await prepareEmails();

	return `
<style>
${fs.readFileSync(path.join(__dirname, "preview-styles.css"))}
</style>
<div class="container">
    ${emails
		.map(
			({ to, content }, index) => `
<section class="dropdown">
    <p class="dropdown-button" onClick="(function(target) {target.parentNode.classList.toggle('active')})(this)">To: ${to}</p>
    <div class="dropdown-contents">
        ${content}
    </div>
</section>`
		)
		.join("")}
</div>
`;
};
