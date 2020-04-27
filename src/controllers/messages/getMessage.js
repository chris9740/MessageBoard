const Message = require("../../models/message");

module.exports = async (req, res) => {
    try {
        const message = await Message.findById(req.params.messageId);

        if(!message) {
            throw "Message not found";
        }

        res.send({ message });
    } catch (error) {
        res.status(404).send();
    }
};