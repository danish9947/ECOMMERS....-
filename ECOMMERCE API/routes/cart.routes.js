
const Cart = require("../models/Cart");
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken.routes");
const router = require("express").Router();


// CREATE

router.post("/", verifyToken, async (req, res) => {

    const newCart = new Product(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);

    } catch (err) {
        res.status(500).json(err)
    }
});


// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );

        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json("error", err)
    }
});

// DELETE USER

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted...!")
    } catch (err) {
        res.status(500).json("error", err)
    }
});


// GET USER CART

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findone({ userId: req.params.userId })
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json("error", err)
    }
});


// GET ALL 

router.get("/all", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json("error", err);
    }

});



module.exports = router;