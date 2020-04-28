const User = require("../../models/user");

module.exports = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if(!user) {
            throw "User not found";
        }

        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(404).send();
    }
}