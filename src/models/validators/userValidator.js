const User = require("../user");

module.exports = async function(next) {
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
}