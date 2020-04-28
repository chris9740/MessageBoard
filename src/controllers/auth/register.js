const User = require("../../models/user");

module.exports = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const query = { username, email, password };
        const user = new User(query);

        await user.save();

        const token = await user.generateAuthToken();
        
        res.status(201).send({ user, token });
    } catch (error) {
        if(error instanceof Error) {
            console.log(error);
            return res.status(500).send({
                error: "Something went wrong"
            });
        }

        res.status(400).send(error);
    }
}