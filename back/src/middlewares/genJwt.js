const {sign} = require("jsonwebtoken");
const { jwtSecret } = require("../config");

module.exports = (req, res, next) => {
    const {id} = req.user;
    const jwt = sign({sub: id}, jwtSecret, {expiresIn: "2 days"});
    req.jwt = jwt;
    next();
}