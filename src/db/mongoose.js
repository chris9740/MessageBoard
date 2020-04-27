const mongoose = require("mongoose");
const debug = require("debug")("mongoose");

debug("Connecting to database...");

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, function(err) {
    if(err) throw err;

    debug("Connected to database.")
});