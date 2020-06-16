const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: { type: String, required: true, min: 5 },
    password: { type: String, required: true },
    todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err) {
            return next(err);
        }

        this.password = passwordHash;
        next();
    });
});

userSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        if (!isMatch) {
            return callback(null, isMatch);
        }
        return callback(null, this);
    });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
