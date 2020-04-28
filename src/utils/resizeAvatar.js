const sharp = require("sharp");

const resizeAvatar = async (buffer, size = 512) => {
    const sizes = [128, 256, 512, 1024];

    size = parseInt(size);

    if(sizes.indexOf(size) == -1) {
        throw new Error("Invalid size");
    }

    const output = await sharp(buffer)
        .resize(size)
        .toBuffer();

    return output;
}

module.exports = resizeAvatar;