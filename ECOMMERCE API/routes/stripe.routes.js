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
        const { products } = req.body;
        console.log("product is",products);
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: product.name,
                    images: [product.image]
                },
                unit_amount: product.price * 100,
            },
            quantity: product.quantity
        }))



        const session = await stripe.checkout.session.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "https://localhost:3001/success",
            cancel_url: "https://localhost:3001/cancel"
        })

        res.json({ id: session.id })

    });

module.exports = router;