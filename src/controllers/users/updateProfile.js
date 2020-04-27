const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
    try {
        const { username, email, oldPassword, newPassword } = req.body;

        if(!oldPassword || oldPassword.trim().length == 0) {
            return res.status(400).send([{
                oldPassword: "This field is required"
            }]);
        }

        const passwordMatch = await bcrypt.compare(oldPassword, req.user.password);

        if(!passwordMatch) {
            return res.status(400).send([{
                oldPassword: "Password doesn't match"
            }]);
        }

        
        if(username) req.user.username = username;
        if(email) req.user.email = email;
        if(newPassword) req.user.password = newPassword;

        await req.user.save();

        res.send({ user: req.user });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).send({
                error: "Something went wrong"
            });
        }

        res.status(400).send(error);
    }
}