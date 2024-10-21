'use client';
import { useState, useEffect } from 'react';
import Flexible_Plan from '../_components/Flexible_Plan';
import { Resend } from 'resend'; // Import Resend library
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { CircleAlert } from 'lucide-react';
import Services from '../_components/Services';
import Reviews from '../_components/Reviews';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { usePlanContext } from '../Context';

const stripePromise = loadStripe('pk_test_51QCBx9HaPDOKhmLc53Aw1Y0hl84YFA1s5DxXylVMDYlLjEOYQdsKxt0ExaTkZ4U7j5thOYfU0DCohP7mzkn2NG6G00z9ek3NPM');

export default function Checkout () {
  const { paymentAmount, setPaymentAmount, setClientInfo, selectedPlan } = usePlanContext();

  const options = {
    mode: 'payment',
    currency: 'usd',
    amount: Number(paymentAmount || 1),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [state, setState] = useState('Select Your State');
  const [menu, setMenu] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const [isClickOnCheck, setIsClickOnCheck] = useState(false);

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
    'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming',
  ];

  const calculateSubtotal = () => {
    let subtotal = 0;

    if (selectedPlan.option) {
      subtotal -= selectedPlan.option.discount || 0;
    }

    if (selectedPlan.features) {
      Object.values(selectedPlan.features)
        .filter((feature) => feature !== undefined)
        .forEach((feature) => {
          subtotal += feature.price || 0;
        });
    }

    if (selectedPlan.extraPrice) {
      selectedPlan.extraPrice.forEach((extra) => {
        subtotal += extra.price || 0;
      });
    }

    return subtotal;
  };

  useEffect(() => {
    setPaymentAmount(calculateSubtotal());
  }, [calculateSubtotal]);

  const handleCheckOut = (data) => {
    console.log(data);
    setClientInfo({
      name: data.name,
      email: data.email,
      state: state,
    })
    if (state !== 'Select Your State') {
      // Process checkout here
      setOpenPay(true);
    }
  };

  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm openPay={openPay} setOpenPay={setOpenPay} amount={calculateSubtotal} />
      </Elements>

      <div className="checkout">
        <div className="hero checkout container">
          <span className="hiddens" data-aos="zoom-in-up">Flexible Plans</span>
          <h1 data-aos="zoom-in-up">Choose the <span>features</span> <br /> that fit your needs!</h1>
          <p data-aos="zoom-in-up">Fully flexible and transparent. No surprises.</p>
        </div>

        <div className="checkout-form" data-aos="zoom-in-up">
          <form onSubmit={handleSubmit(handleCheckOut)}>
            <div className="right">
              <div className="rowHolder">
                {/* Full Name Validation */}
                <div className={`inputHolder ${errors.name ? 'notvalid' : ''}`}>
                  <h6 className="placeHolder" onClick={() => document.getElementById('userName').focus()}>
                    Enter your Full name
                  </h6>
                  <div className="holder">
                    <input
                      type="text"
                      id="userName"
                      {...register('name', {
                        required: 'Please enter your full name',
                        validate: {
                          minLength: (value) => value.length >= 3 || 'At least 3 characters required',
                          hasTwoWords: (value) => value.trim().split(' ').length >= 2 || 'Please enter both first and last name',
                        },
                      })}
                      placeholder="Enter your Full name"
                    />
                  </div>
                </div>

                {/* State Selection */}
                <div className={`select ${state === 'Select Your State' ? 'notvalid' : ''}`}>
                  <div className="btn" onClick={() => setMenu((prev) => !prev)}>
                    {state === 'Select Your State' ? '' : 'State:'} {state}
                    <Image src="/image/angle down.png" fill />
                  </div>
                  <ul className={`menu ${menu && 'active'}`}>
                    {states.map((x, idx) => (
                      <li
                        key={idx}
                        className={state === x ? 'active' : ''}
                        onClick={() => {
                          setMenu(false);
                          setState(x);
                        }}
                      >
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Email Validation */}
              <div className={`inputHolder ${errors.email ? 'notvalid' : ''}`}>
                <h6 className="placeHolder" onClick={() => document.getElementById('userEmail').focus()}>
                  Enter Your Email
                </h6>
                <div className="holder">
                  <input
                    type="email"
                    id="userEmail"
                    {...register('email', {
                      required: 'Please enter your email',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    placeholder="Enter Your Email"
                  />
                </div>
              </div>

              <Flexible_Plan />
              {errors.name && (
                <p className="error">
                  <CircleAlert /> {errors.name.message}
                </p>
              )}
              {errors.email && (
                <p className="error">
                  <CircleAlert /> {errors.email.message}
                </p>
              )}
              {state === 'Select Your State' && isClickOnCheck && (
                <p className="error">
                  <CircleAlert /> Please select your state
                </p>
              )}
            </div>

            {/* Display Selected Plans */}
            <div className="list">
              <h2>Simulate Your Monthly Costs</h2>
              <div id="allSelected">
                {Object.entries(selectedPlan).map(([key, value], index) =>
                  (key === 'option' && value.name) ||
                  (key === 'features' && Object.values(value).some((v) => v)) ||
                  (key === 'extraPrice' && Object.values(value).some((v) => v)) ? (
                    <div key={index}>
                      <h4>{key === 'option' ? 'Agent Package' : key === 'features' ? 'Resources' : 'Features'}:</h4>
                      <ul>
                        {key === 'option' && value.name && (
                          <li key={value.name}>
                            {value.name} {value.name !== '1 Agent' && <span>--${value.discount}</span>}
                          </li>
                        )}

                        {key === 'features' &&
                          Object.entries(value)
                            .filter(([subKey, subValue]) => subValue !== undefined)
                            .map(([subKey, subValue], idx) => (
                              <li key={idx}>
                                {subValue?.name} <span>${subValue?.price}</span>
                              </li>
                            ))}

                        {key === 'extraPrice' &&
                          Object.entries(value)
                            .filter(([subKey, subValue]) => subValue !== undefined)
                            .map(([subKey, subValue], idx) => (
                              <li key={idx}>
                                {subValue?.name} <span>${subValue?.price}</span>
                              </li>
                            ))}
                      </ul>
                    </div>
                  ) : null
                )}
              </div>

              <div className="bottom">
                <button type="submit" className="main-button" onClick={()=> setIsClickOnCheck(true)}>
                  Checkout
                </button>
                <h3>Total: <span id="total">${calculateSubtotal()}</span></h3>
              </div>
            </div>
          </form>
        </div>

        <Services />
        <Reviews />
      </div>
    </>
  );
};
