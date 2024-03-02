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
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        name: "customer name",
        currency: 'usd',
        payment_method_types: ['card'],
        description: "Software development services",
        address: [
            line1 = ["510 Townsend St"],
            postal_code = 98140,
            citySan = "Francisco",
            state = 'CA ',
            country = 'US',
        ],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
});

module.exports = router;