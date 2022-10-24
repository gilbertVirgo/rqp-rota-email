require("dotenv").config();

const express = require("express");
const deliverEmails = require("./deliverEmails");
const reviewEmails = require("./reviewEmails");
const server = express();

const { PORT, ROUTE_HASH } = process.env;

server.use(require("cors")());

server.get("/" + ROUTE_HASH, async (req, res, next) => {
	res.locals.message = await deliverEmails().catch(next);
	next();
});

server.get("/review", async (req, res, next) => {
	res.locals.message = await reviewEmails().catch(next);
	next();
});

server.use((req, res, next) => {
	res.send(`
		<h1>Success</h1>
		${res.locals.message}
	`);
	// res.status(200).json({ success: true, message: res.locals.message });
});

server.use((err, req, res, next) => {
	console.log(err.stack);

	res.status(500).send(`
		<h1>Error</h1>
		<code style="white-space: pre-wrap">${err.stack}</code>
	`);
});

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
