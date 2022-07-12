const express = require("express");
const cors = require("cors");
const {port} = require("./config");
const setDbConnection = require("./db/config");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
setDbConnection();
app.use("/", require("./routers/users"));

app.listen(port, () => { console.log("Server listening on port: ", port)})
