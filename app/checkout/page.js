'use client';
import { useState, useEffect } from 'react';
import { usePlanContext } from '../Context';
import Flexible_Plan from '../_components/Flexible_Plan';
import { Resend } from 'resend'; // Import Resend library
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { CircleAlert } from 'lucide-react';
import  Services from '../_components/Services';
import  Reviews from '../_components/Reviews';


const Checkout = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { selectedPlan, setSelectedPlan, validationMSg } = usePlanContext();
  

  // State for the form inputs
  const [state, setStates] = useState('Alabama');
  const [menu, setMenu] = useState(false);

  // Array of US states
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
    'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const calculateSubtotal = () => {
    let subtotal = 0;
    
    // Add the price of options
    if (selectedPlan.option) {
      subtotal -= selectedPlan.option.discount || 0;
    }

    // Add the price of each feature
    if (selectedPlan.features) {
      Object.values(selectedPlan.features)
        .filter(feature => feature !== undefined) // Filter out undefined features
        .forEach(feature => {
          subtotal += feature.price || 0;
        });
    }

    // Add the price of extraPrice
    if (selectedPlan.extraPrice) {
      selectedPlan.extraPrice.forEach(extra => {
        subtotal += extra.price || 0;
      });
    }

    return subtotal;
  };

  return (
    <div className="checkout">
      <div className="hero checkout container">
        <span className='hiddens' data-aos="zoom-in-up">Flexible Plans</span>
        <h1 data-aos="zoom-in-up">Choose the <span>features</span> <br/> that fit your needs!</h1>
        <p data-aos="zoom-in-up">Fully flexible and transparent. No surprises.</p>
      </div>

      <div className="checkout-form" data-aos="zoom-in-up">
      <form onSubmit={handleSubmit}>
        <div className="rowHolder">
          {/* Full Name Validation */}
          <div className={`inputHolder ${errors.name ? 'notvalid' : ''}`}>
            <h6 className="placeHolder" onClick={() => document.getElementById('userName').focus()}>Enter your Full name</h6>
            <div className="holder">
              <input
                type="text"
                id="userName"
                {...register("name", {
                  required: "Please enter your full name",
                  validate: {
                    minLength: (value) => value.length >= 3 || "At least 3 characters required",
                    hasTwoWords: (value) => value.trim().split(" ").length >= 2 || "Please enter both first and last name"
                  }
                })}
                placeholder="Enter your Full name"
              />
            </div>
            {errors.name && (
              <span>
                <CircleAlert />
                {errors.name.message}
              </span>
            )}
          </div>

          {/* State Selection */}
          <div className="select">
            <div className='btn' onClick={() => setMenu((prev) => !prev)}>
              State: {state} <Image src='/image/angle down.png' fill />
            </div>
            <ul className={`menu ${menu && 'active'}`}>
              {states.map((x, idx) => (
                <li key={idx} className={state === x ? 'active' : ''} onClick={() => {
                  setMenu(false);
                  setStates(x);
                }}>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`inputHolder ${errors.email ? 'notvalid' : ''}`}>
          <h6 className="placeHolder" onClick={() => document.getElementById('userEmail').focus()}>Enter Your Email</h6>
          <div className="holder">
            <input
              type="email"
              id="userEmail"
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address"
                }
              })}
              placeholder="Enter Your Email"
            />
          </div>
          {errors.email && (
            <span>
              <CircleAlert />
              {errors.email.message}
            </span>
          )}
        </div>
        <Flexible_Plan/>
      </form>

      <div className='list'>
        <h2>Simulate Your Monthly Costs</h2>
        <div id="allSelected">
        {/* Loop through and render the selectedPlan details */}
        {Object.entries(selectedPlan).map(([key, value], index) => (
          (key === 'option' && value.name) || (key === 'features' && Object.values(value).some(v => v)) || (key === 'extraPrice' && Object.values(value).some(v => v)) ? (
            <div key={index}>
              <h4>{key == 'option' ? 'Agent Package' : key == 'features' ? 'Resources' : 'Features'}:</h4>  {/* Heading for each section */}
              <ul>
                {/* Render the options */}
                {key === 'option' && value.name && (
                  <li key={value.name}>
                    {value.name} {value.name !== '1 Agent' && <span>--${value.discount}</span>}
                  </li>
                )}

                {/* Render the features */}
                {key === 'features' && Object.entries(value)
                  .filter(([subKey, subValue]) => subValue !== undefined) // Filter out undefined features
                  .map(([subKey, subValue], idx) => (
                    <li key={idx}>
                      {subValue?.name} <span>${subValue?.price}</span>
                    </li>
                  ))
                }

                {/* Render extraPrice options if present */}
                {key === 'extraPrice' && Object.entries(value)
                  .filter(([subKey, subValue]) => subValue !== undefined) // Filter out undefined entries
                  .map(([subKey, subValue], idx) => (
                    <li key={idx}>
                      {subValue?.name} <span>${subValue?.price}</span>
                    </li>
                  ))
                }
              </ul>
            </div>
          ) : null // Render nothing if the section is empty
        ))}
      </div>

        <div className='bottom'>
          <button className='main-button' type='submit'>Checkout</button>
          <h3>Total Cost ${calculateSubtotal()}/Mo</h3>
        </div>
      </div>

      </div>

      <Services/>

      <Reviews/>
    </div>
  );
};

export default Checkout;