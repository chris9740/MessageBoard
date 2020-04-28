const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const processAvatar = require("../utils/processAvatar");

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

userSchema.pre("validate", async function(next) {
    const errors = [];

    var { username, email, password } = this;

    if(!username || username.trim().length == 0) {
        throw [{
            username: "This field is required"
        }];
    }

    if(!email || email.trim().length == 0) {
        throw [{
            email: "This field is required"
        }];
    }

    if(!password || password.trim().length == 0) {
        throw [{
            password: "This field is required"
        }];
    }

    username = username.trim();
    email = email.trim();
    password = password.trim();

    // Custom validation
    if(this.isModified("username")) {
        if(await User.findOne({ username })) {
            errors.push({
                username: "This username is already taken"
            });
        }
    }

    if(this.isModified("email")) {
        if(await User.findOne({ email })) {
            errors.push({
                email: "This email is already taken"
            });
        }
    }

    if(errors.length) {
        throw errors;
    }

    if(!(/^[A-Za-z0-9._\-]+$/gm.test(username))) {
        throw [{
            username: "Invalid characters found"
        }];
    }

    if(username.length < 3 || username.length > 16) {
        throw [{
            username: "Must be between 3 and 16 in length"
        }];
    }

    if(email.length < 1 || email.length > 2000) {
        throw [{
            email: "Must be between 1 and 2000 in length"
        }];
    }

    if(password.length < 6 || password.length > 100) {
        throw [{
            password: "Must be between 6 and 1000 in length"
        }];
    }

    next();
});

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    if(this.isNew) {
        // Load default avatar from file, convert to base64, then to buffer, and store on the user
        const avatarData = fs.readFileSync(process.cwd() + "/src/assets/defaultAvatar.png");
        const avatarBase64 = avatarData.toString("base64");
        const avatarBuffer = Buffer.from(avatarBase64, "base64");

        this.avatar = await processAvatar(avatarBuffer);
    }

    next();
});

userSchema.plugin(require("mongoose-beautiful-unique-validation"));
userSchema.plugin(require("mongoose-hidden"));

const User = mongoose.model("User", userSchema);

module.exports = User;