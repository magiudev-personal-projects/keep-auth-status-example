const User = require("../db/entities/users");

module.exports = async (req, res, next) => {
    const {id} = req;
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ message: "No such user"});
    req.user = user;
    next();
}