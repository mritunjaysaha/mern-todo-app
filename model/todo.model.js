const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    description: { type: String },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
