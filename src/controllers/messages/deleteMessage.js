module.exports = async (req, res) => {
    try {
        req.message.delete();
        res.send({
            message: req.message
        });
    } catch (error) {
        res.status(500).send();
    }
}