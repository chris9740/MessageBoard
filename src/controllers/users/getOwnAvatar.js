const resizeAvatar = require("../../utils/resizeAvatar");

module.exports = async (req, res) => {
    try {
        if(!req.user || !req.user.avatar) {
            throw "User not found";
        }

        res.set("Content-Type", "image/png");
        res.send(await resizeAvatar(req.user.avatar, req.query.size));
    } catch (error) {
        res.status(404).send();
    }
}