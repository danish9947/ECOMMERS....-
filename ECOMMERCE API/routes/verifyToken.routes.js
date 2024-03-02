const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const User = require("../models/User");


const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.token

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
            if (err) res.status(401).json("you are not valid...!");
            // const userdata = await User.findById(req.params.id).exec();
            // console.log("kuty",user);
            req.user = user
            next();
        })
    } else {
        return res.status(401).json("you are not authenticated...!");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        // console.log("User >...", req.user.id);
        console.log("id : >>>", req.params);
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("you are not allowed to do that!");
        }
    });
};
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("User >...", req.user);
        // console.log("id : >>>", req.params.id);
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("you are not allowed to do that!");
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
}