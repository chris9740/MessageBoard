module.exports = function(next) {
    var { content } = this;

    if(!content || content.trim().length == 0) {
        throw [{
            content: "This field is required"
        }];
    }

    content = content.trim();

    if(content.length < 1 || content.length > 2000) {
        throw [{
            content: "Must be between 1 and 2000 in length"
        }];
    }

    next();
}