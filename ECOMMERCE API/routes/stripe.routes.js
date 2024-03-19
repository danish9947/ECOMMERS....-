const { create } = require("../models/Cart");

const router = require("express").Router();
// const { PaymentIntent } = require('stripe');
const stripe = require("stripe")('sk_test_51OoMhBSHX4xukfmPFMc60gvk6KoRO3yqOS7pF6vFugZbu64ta15PQPRBioqVEe6leJ90hlKcuzkfYcZX9eGGbBz900VQLKS0yv');

router.post("/payment", (req, res) => {
    console.log(req.body.amount);
    console.log(req.body.tokenId);
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            console.error("Stripe error:", stripeErr);
            res.status(500).json({ error: "Stripe error", message: stripeErr.message });
        } else {
            console.log("Stripe response:", stripeRes);
            res.status(200).json(stripeRes);
        }
    });
});




router.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "USD",
            amount,
            description: "payment intent",
            automatic_payment_methods: { enabled: true },
        });

        // Send publishable key and PaymentIntent details to client
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });


    }
});


router.post("/create-checkout-seassion",
    async (req, res) => {
        console.log(req.body);
        const { products } = req.body;
        console.log("product is", products);
        console.log("Request body:", req.body);

        const price = await stripe.prices.create({
            currency: "usd",
            unit_amount: req.body.amount,
            product_data: {
                name: "blended shirt"
            },
        });


        console.log({ price });



        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: price.id,
                    quantity: 3,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel"

        });
        console.log({ create });

        return res.json({ url: session.url })

    });


module.exports = router;