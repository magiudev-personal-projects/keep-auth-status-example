const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: "string",
    password: "string"
});

module.exports = model("users", userSchema);