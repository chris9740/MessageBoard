const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fs = require("fs");
const sharp = require("sharp");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userValidator = require("./validators/userValidator");

const userSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 16,
        validate: {
            validator: (username) => {
                return /^[A-Za-z0-9._\-]+$/gm.test(username);
            },
            message: () => "Unknown characters found in username"
        },
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        maxlength: 2000,
        validate: {
            validator: (email) => validator.isEmail(email),
            message: () => "Please enter a valid email"
        },
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100,
        trim: true
    },
    avatar: {
        type: Buffer
    },
    tokens: [{
        token: {
            type: String
        }
    }]
}, {
    timestamps: true,
    toObject: {
        versionKey: false
    }
});

userSchema.statics.findByCredentials = async function(email, password) {
    const user = await User.findOne({ email });
    if(!user) {
        throw [{
            email: "User not found"
        }];
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) {
        throw [{
            password: "Wrong password"
        }];
    }

    return user;
}

userSchema.methods.setAvatar = async function(buffer) {
    const user = this;
    const processedAvatar = await sharp(buffer).resize({ width: 1024, height: 1024, position: "center" }).png().toBuffer();

    user.avatar = processedAvatar;
    await user.save();

    return true;
}

userSchema.methods.getAvatar = async function({ size=128 }={}) {
    if(!this.avatar) {
        return false;
    }

    size = parseInt(size);

    if(size % 128 != 0) {
        throw "Invalid size";
    }

    const output = await sharp(this.avatar)
        .resize(size)
        .toBuffer();

    return output;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });

    await user.save();
    return token;
}

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.updatedAt;
    delete userObject.avatar;

    return userObject;
}

userSchema.pre("validate", userValidator);

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    if(this.isNew) {
        // Load default avatar from file, convert to base64, then to buffer, and store on the user
        const avatarData = fs.readFileSync(process.cwd() + "/src/assets/defaultAvatar.png");
        const avatarBase64 = avatarData.toString("base64");
        const avatarBuffer = Buffer.from(avatarBase64, "base64");

        this.avatar = await this.setAvatar(avatarBuffer);
    }

    next();
});

userSchema.plugin(require("mongoose-beautiful-unique-validation"));
userSchema.plugin(require("mongoose-hidden"));

const User = mongoose.model("User", userSchema);

module.exports = User;