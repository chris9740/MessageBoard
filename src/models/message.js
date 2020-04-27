const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        autopopulate: true
    }
}, {
    timestamps: true,
    versionKey: false
});

messageSchema.pre("validate", function(next) {
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
});

messageSchema.plugin(require("mongoose-autopopulate"));

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;