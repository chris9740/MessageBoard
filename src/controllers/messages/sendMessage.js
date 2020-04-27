const Message = require("../../models/message");

module.exports = async (req, res) => {
    try {
        const { content } = req.body;
        const query = {
            content,
            author: req.user._id
        };
        const message = new Message(query);

        await message.save();

        req.io.emit("message", { message });
        res.status(201).send({ message });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).send({
                error: "Something went wrong"
            });
        }

        res.status(400).send(error);
    }
}