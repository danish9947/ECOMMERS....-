import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
const KEY = "pk_test_51OoMhBSHX4xukfmPQRoxaekxLISVQ7WOJz0wa1Xk8Ay8skwhYaNHD07x8IceZMQuQGrf9fh5YXsr3TWOptKeRzWx008h6191pf"

const Payment = () => {
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
                key={KEY}

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


export default Payment