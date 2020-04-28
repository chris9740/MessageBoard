module.exports = async (req, res) => {
    try {
        req.user.setAvatar(req.file.buffer);
    } catch (error) {
        res.status(500).send();
    }
}