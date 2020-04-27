const Message = require("../../models/message");

module.exports = async (req, res) => {
    try {
        var limit = req.query.limit || 10;
        var offset = req.query.offset || 0;

        const messages = await Message.find({}).sort({ createdAt: -1 }).skip(offset).limit(limit);

        res.send({ messages })
    } catch (error) {
        res.status(500).send();
    }
}