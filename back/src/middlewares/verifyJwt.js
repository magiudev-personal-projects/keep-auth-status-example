const {verify} = require("jsonwebtoken");
const { jwtSecret } = require("../config");

module.exports = (req, res, next) => {
    const authJwt = req.headers.auth;
    if(!authJwt) return res.status(401).json({ message: "Please log in"});
    try {
        const {sub: id} = verify(authJwt, jwtSecret);
        req.id = id;
        next()
    } catch (error) {
        return res.status(401).json({ message: "Please log in"});
    }
}