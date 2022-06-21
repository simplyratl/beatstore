const router = require("express").Router();
const User = require("../models/Users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });

    try {
        const user = await newUser.save();

        return res.status(201).json(user);
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

        const accessToken = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "2h",
        });

        //za brisanje password iz res
        const { password: passwordInfo, ...info } = user._doc;

        res.status(200).json({ ...info, accessToken });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});

module.exports = router;
