const User = require("../../models/user");

const resizeAvatar = require("../../utils/resizeAvatar");

module.exports = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if(!user || !user.avatar) {
            throw "User not found";
        }

        res.set("Content-Type", "image/png");
        res.send(await resizeAvatar(user.avatar, req.query.size));
    } catch (error) {
        console.log(error);
        res.status(404).send();
    }
}