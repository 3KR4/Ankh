'use client'
import { X } from 'lucide-react'
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { usePlanContext } from '../Context';

const CheckoutForm = ({openPay, setOpenPay, amount}) => {
  const { clientInfo, selectedPlan, setSelectedPlan, setClientInfo } = usePlanContext();

  const { name:fullName, email, state } = clientInfo;
  const { planName, resources, agents, dataTeam, acquisitionTeam } = selectedPlan;

  const curentAcquisitionTeam = acquisitionTeam?.map(acquisition => acquisition.name);

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    if (!stripe || !elements) {
      return;
    }
  
    const handleError = (error) => {
      setLoading(false);
      alert(error.message);
    };
  
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
  
    const res = await fetch(`/api/create-intent`, {
      method: 'POST',
      body: JSON.stringify({ amount }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const { clientSecret } = await res.json();

    if (!clientSecret) {
      alert('Payment Intent creation failed. Please try again.');
      setLoading(false);
      return;
    }
  
    const result = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/payment-confirm`,
      },
    });
  
    if (result.error) {
      alert(result.error.message); // Handle payment error.
      setLoading(false); // Stop loading on error.
    } else {
      // Payment succeeded, handle success flow.
      setLoading(false); // Stop loading.
      localStorage.removeItem('selectedPlan'); // Clean up local storage.
      sendEmail(); // Trigger email notification.
    }
  };
  

  const sendEmail = async () => {
    await fetch(`/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        fullName,
        email,
        state,
        planName,
        agent: agents,
        dataTeam: dataTeam.dataNumber,
        resources,
        acquisitionTeam: curentAcquisitionTeam,
        totalprice: amount,
      }),
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error sending email:', error));
  };

  return (
    <form onSubmit={handleSubmit} className={`stripeForm menu ${openPay && 'active'}`}>
      <div className='hold'>
        <PaymentElement />
        <button className='main-button' disabled={loading}>
          {loading ? (
            <div className="lds-dual-ring"></div>
          ) : (
            'Submit'
          )}
        </button>
      </div>
      <X className='x' onClick={()=> setOpenPay(false)}/>
    </form>
  );
};

export default CheckoutForm;