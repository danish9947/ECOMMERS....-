const express = require('express');
const app = express();
var cors = require('cors')

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require("./routes/user.routes")
const authRoute = require("./routes/auth.routes")
const productRoute = require("./routes/product.routes")
const cartRoute = require("./routes/cart.routes")
const orderRoute = require("./routes/order.routes")
const stripeRoute = require("./routes/stripe.routes")

app.use(cors())


dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Succesfull!"))
    .catch((err) => {
        console.log(err);
    });
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/stripe", stripeRoute);


app.listen(process.env.PORT || 3001, () => {
    console.log("Backend server is running!");
});
console.log("");