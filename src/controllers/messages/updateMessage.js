module.exports = async (req, res) => {
    try {
        req.message.content = req.body.content;

        await req.message.save();

        req.io.emit("messageUpdate", { message: req.message });
        res.status(200).send({ message: req.message });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).send({
                error: "Something went wrong"
            });
        }

        res.status(400).send(error);
    }
}