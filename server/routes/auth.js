const router = require("express").Router();
const User = require("../models/Users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });

    try {
        const user = await newUser.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== password) return res.status(400).json({ message: "Incorrect credentials" });

        if (req.body.admin && !user.isAdmin)
            return res.status(403).json({ message: "You don't have admin account." });

        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, {
            expiresIn: "2h",
        });

        //za brisanje password iz res
        const { password: passwordInfo, ...info } = user._doc;

        return res.status(200).json({ ...info, accessToken });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});

module.exports = router;
