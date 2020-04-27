const socketioJwt = require("socketio-jwt");

module.exports = function(io) {
    io
        .on('connection', socketioJwt.authorize({
            secret: process.env.JWT_SECRET,
            timeout: 15000 // Allow 15 seconds to authenticate before force-closing the connection
        })).on('authenticated', function(socket) {
            socket.authenticated = true;
        });
}