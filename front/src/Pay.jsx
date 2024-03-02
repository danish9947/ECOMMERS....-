import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
const KEY = "pk_test_51OoMhBSHX4xukfmPoWJ25CoSS452rpcNGo8ihtFu5J4hYeYofo4xFoce9OpWPynIlLCdBXdmLc7EFvAS6JUyAUgn00HvJ0XIJ1"

export default function Pay() {
    const onToken = (token) => {
        console.log(token);
    }

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <StripeCheckout
                name="danish shop"
                image="/avatar.webp"
                billingAddress
                shippingAddress
                description="your total is $20"
                amount={2000}
                token={onToken}
                sripeKey={KEY}

            >


                <button
                    style={{
                        border: "none",
                        width: 120,
                        borderRadius: 5,
                        padding: "20px",
                        backgroundColor: "black",
                        color: "white",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    Pay Now
                </button>
            </StripeCheckout>

        </div>
    )
}
