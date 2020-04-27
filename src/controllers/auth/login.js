const User = require("../../models/user");

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();

        res.status(200).send({ user, token });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).send({
                error: "Something went wrong"
            });
        }

        res.status(400).send(error);
    }
}