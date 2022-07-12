const mongoose = require("mongoose");
const {dbUrl} = require("../config");

// Establish a connection or throw an error to stop the server
module.exports = async () => {
    await mongoose.connect(dbUrl);
    console.log("Database connected successfully!");
}
