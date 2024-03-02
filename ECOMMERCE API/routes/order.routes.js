
const Order = require("../models/Order");
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require("./verifyToken.routes");
const router = require("express").Router();


// CREATE

router.post("/", verifyToken, async (req, res) => {

    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);


    } catch (err) {
        res.status(500).json(err)
    }
});


// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Cart.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );

        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json("error", err)
    }
});

// DELETE 

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...!")
    } catch (err) {
        res.status(500).json("error", err)
    }
});


// GET USER ORDERS

router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.findOne({ userId: req.params.id });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json("error", err);
    }
});



// GET ALL 

router.get("/all", verifyTokenAndAdmin, async (req, res) => {
    console.log(req.body);
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json("error", err);
    }

});

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    console.log(req.body);
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;