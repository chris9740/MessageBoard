const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageValidator = require("./validators/messageValidator");messageValidator

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

messageSchema.pre("validate", messageValidator);

messageSchema.plugin(require("mongoose-autopopulate"));

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;