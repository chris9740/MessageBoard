const resizeAvatar = require("../../utils/resizeAvatar");

module.exports = async (req, res) => {
    res.set("Content-Type", "image/png");

    try {
        const avatar = await req.user.getAvatar({ size: req.query.size });

        res.send(avatar);
    } catch (error) {
        res.status(500).send();
    }
}