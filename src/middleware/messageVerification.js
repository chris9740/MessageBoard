const Message = require("../models/message");

const messageVerification = async (req, res, next) => {
    try {
        const { messageId } = req.params;
        const message = await Message.findById(messageId);

        if(!message) {
            return res.status(404).send();
        }

        if(!message.author._id.equals(req.user._id)) {
            return res.status(403).send();
        }

        req.message = message;
        next();
    } catch (error) {
        res.status(500).send({
            error: "An error occurred"
        });
    }
}

module.exports = messageVerification;