const {Router} = require("express");
const {hash, compare} = require("bcryptjs");
const User = require("../db/entities/users");
const verifyJwt = require("../middlewares/verifyJwt");
const retrieveUser = require("../middlewares/retrieveUser");
const genJwt = require("../middlewares/genJwt");

const router = Router();

router.get("/", (req, res) => {
    res.send("<h1>Server running</h1>");
});

router.post("/users/register", async (req, res) => {

    // Get data sent 
    const {username, password} = req.body;

    // Check it the username is already taken
    let user = await User.findOne({username});
    if(user) return res.status(400).json({ message: "This username is already in use"});

    // Save the new user
    const hashedPassword = await hash(password, 10);
    user = new User({username, password: hashedPassword});
    await user.save();

    // Send a response
    res.status(201).json({ message: "Successful registration. Please login."});
});

router.post(
    "/users/login",
    async (req, res, next) => {
        // Get data
        const {username, password} = req.body;

        // Check if the user exist
        let user = await User.findOne({username});
        if(!user) return res.status(400).json({ message: "Incorrect username or password"});

        // Check if the passwords match
        const passwordsMatch = await compare(password, user.password);
        if(!passwordsMatch) return res.status(400).json({ message: "Incorrect username or password"});

        // Record the user in the request
        req.user = user;
        next();
    }, 
    genJwt, 
    (req, res) => {
        res.status(200).json({jwt: req.jwt})
    }
);

router.get(
    "/users/user", 
    verifyJwt, 
    retrieveUser,
    genJwt,

    // Retrieve user data
    (req, res) => {
        const {id, username} = req.user;
        res.json({id, username, jwt: req.jwt});
    }
);

router.patch(
    "/users/user/password",
    verifyJwt,
    retrieveUser,
    genJwt,
    async (req, res) => {

        // Get data
        const {password, newPassword} = req.body;

        // Check if the old passwords is correct
        const passwordsMatch = await compare(password, req.user.password);
        if(!passwordsMatch) return res.status(401).json({message: "Incorrect password", jwt: req.jwt});

        // Hash and save the new password
        const hashOfTheNewPass = await hash(newPassword, 10); 
        const result = await User.findByIdAndUpdate(req.id, {password: hashOfTheNewPass});

        // Send a response
        if(!result) return res.status(500).json({ message: "Something went wrong. Please try again", jwt: req.jwt});
        res.json({message: "New password set. Please login"});
    }
);

module.exports = router;