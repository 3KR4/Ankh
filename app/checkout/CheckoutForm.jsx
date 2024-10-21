import { X } from 'lucide-react'
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = ({openPay, setOpenPay, amount}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false)
  const [errormessage, setErrorMessage] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const handleError = (error)=>{
      setLoading (false)
      setErrorMessage (error.message)
    }

    sendEmail();

    const {error: submitError} = await elements.submit();
      if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch('api/create-intent', {
      method: 'POST',
      body: JSON.stringify({
        amount: amount()
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    const clientSecret = await res.json()

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-confirm",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  const sendEmail = async () => {
    const res = await fetch('/api/send-email', {
      method: 'POST',
    });
  };

  return (
    <form onSubmit={handleSubmit} className={`stripeForm menu ${openPay && 'active'}`}>
      <div className='hold'>
        <PaymentElement />
        <button className='main-button'>Submit</button>
      </div>
      <X className='x' onClick={()=> setOpenPay(false)}/>
    </form>
  );
};

export default CheckoutForm;