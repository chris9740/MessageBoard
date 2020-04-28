const User = require("../../models/user");

const resizeAvatar = require("../../utils/resizeAvatar");

module.exports = async (req, res) => {
    res.set("Content-Type", "image/png");

    try {
        const user = await User.findById(req.params.userId);

        if(!user) {
            return res.status(404).send();
        }

        const avatar = await user.getAvatar({ size: req.query.size });

        res.send(avatar);
    } catch (error) {
        res.status(500).send();
    }
}