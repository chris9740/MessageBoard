module.exports = async (req, res) => {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token != req.token;
    });

    await req.user.save();

    res.status(200).send();
}