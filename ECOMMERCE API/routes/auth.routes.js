const User = require("../models/user");
const CryptoJS = require("crypto-js")
const router = require("express").Router();
const jwt = require("jsonwebtoken")

// REGISTER
router.post("/register", async (req, res) => {
    console.log(req.body);
    // return
    const hash = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC);

    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash.toString(),
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN PAGE

router.post("/login", async (req, res) => {

    try {
        const setUser = await User.findOne({ username: req.body.username })
        !setUser && res.status(401).json("wrong credentials...!")
        const hashedPassword = CryptoJS.AES.decrypt(
            setUser.password,
            process.env.PASS_SEC
        );
        const orginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        orginalPassword !== req.body.password && res.status(401).json("wrong credentials...!")

        const accessToken = jwt.sign({
            id: setUser._id,
            isAdmin: setUser.isAdmin,
        },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = setUser._doc;

        res.status(200).json({ ...others, accessToken });

    } catch (err) {
        res.status(500).json(err);
        console.log("error: ", err);
    }

});

module.exports = router;