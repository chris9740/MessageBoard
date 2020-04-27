const express = require("express");
const app = express();

const debug = require("debug")("express");

const port = process.env.PORT || 3000;

debug(`Starting web server on port ${port}`);
const server = app.listen(port, function() {
    debug(`Listening on port ${port}`);
});

const io = require("socket.io")(server);

require("./db/mongoose");

app.use(express.json());

app.use((req, res, next) => (req.io = io) && next());

require("./socketEvents")(io);

app.use(require("./routes"));

app.use('*', (req, res) => {
    res.status(404).send();
});

/**
 * 
 * POST /api/v1/auth/login - Login
 * POST /api/v1/auth/register - Register
 * 
 */