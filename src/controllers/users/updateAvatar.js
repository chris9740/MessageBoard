const sharp = require("sharp");

const processAvatar = require("../../utils/processAvatar");

module.exports = async (req, res) => {
    const buffer = await processAvatar(req.file.buffer);
	req.user.avatar = buffer;
	await req.user.save();

	res.send();
}