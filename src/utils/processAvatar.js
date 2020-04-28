const sharp = require("sharp");

const processAvatar = async (buffer) => {
    return await sharp(buffer).resize({ width: 1024, height: 1024, position: "center" }).png().toBuffer();
}

module.exports = processAvatar;