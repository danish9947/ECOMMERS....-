import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useEffect, useState } from 'react';
const stripePromise = loadStripe('pk_test_51OoMhBSHX4xukfmPoWJ25CoSS452rpcNGo8ihtFu5J4hYeYofo4xFoce9OpWPynIlLCdBXdmLc7EFvAS6JUyAUgn00HvJ0XIJ1');

export default function App() {
  const [clientSecret, setClientSecret] = useState()
  const [loading, setLoading] = useState(false)
  const fetchClientSecret = async () => {
    console.log("fetching");
    console.log(fetchClientSecret);
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3001/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: 1099 })
      });

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret)

    } catch (error) {
      return error.message
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchClientSecret()
    console.log("hello");
  }, [])


  if (loading) {
    return (
      <div>
        Loading
      </div>
    )
  }
  console.log({ clientSecret });
  return (
    <Elements stripe={stripePromise} options={{
      clientSecret: clientSecret
    }}>
      <CheckoutForm />
    </Elements>
  );
};