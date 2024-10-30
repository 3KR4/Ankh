'use client';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { CircleAlert } from 'lucide-react';
import Services from '../_components/Services';
import Reviews from '../_components/Reviews';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import Flexible_Plan from '../_components/Flexible_Plan';
import { usePlanContext } from '../Context';

const stripePromise = loadStripe('pk_test_51QCBx9HaPDOKhmLc53Aw1Y0hl84YFA1s5DxXylVMDYlLjEOYQdsKxt0ExaTkZ4U7j5thOYfU0DCohP7mzkn2NG6G00z9ek3NPM');

export default function Checkout() {
  const {
    states,
    clientInfo,
    setClientInfo,
    paymentAmount,
    setPaymentAmount,
    selectedPlan,
    setSelectedPlan,
    plans,
  } = usePlanContext();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

let client = JSON.parse(localStorage.clientInfo)

  console.log(localStorage.clientInfo);
  
  const [state, setState] = useState(client.state || 'Select Your State');
  const [menu, setMenu] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const [isClickOnCheck, setIsClickOnCheck] = useState(false);

  const calculateTotal = useCallback(() => {
    // Sum resources, option discount, dataTeam discount, and acquisitionTeam items
    const resourcesTotal = selectedPlan.resources?.reduce((sum, item) => sum + item.price, 0) || 0;
    const optionDiscount = selectedPlan.option?.discount || 0;
    const dataTeamTotal = selectedPlan.dataTeam?.total || 0;
    const acquisitionTeamTotal = selectedPlan.acquisitionTeam?.reduce((sum, item) => sum + item.price, 0) || 0;

    return resourcesTotal + dataTeamTotal + acquisitionTeamTotal - optionDiscount;
  }, [selectedPlan]);

  const handleCheckOut = (data) => {
    let client = {
      name: data.name,
      email: data.email,
      state: state,
    }
    setClientInfo(client)
    localStorage.setItem('clientInfo', JSON.stringify(client))
    if (state !== 'Select Your State') {
      setOpenPay(true);
    }
  };

  const options = {
    mode: 'payment',
    currency: 'usd',
    amount: Number(calculateTotal() || 1),
  };

  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm openPay={openPay} setOpenPay={setOpenPay} amount={calculateTotal()} />
      </Elements>


      <div className="checkout">
        <div className="hero checkout container">
          <span className="hiddens" data-aos="zoom-in-up">Flexible Plans</span>
          <h1 data-aos="zoom-in-up">Choose the <span>resources</span> <br /> that fit your needs!</h1>
          <p data-aos="zoom-in-up">Fully flexible and transparent. No surprises.</p>
        </div>

        <div className="checkout-form" data-aos="zoom-in-up">
          <form onSubmit={handleSubmit(handleCheckOut)}>
            <div className="right customPlan" >
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
                      defaultValue={client.name}
                      placeholder="Enter your Full name"
                    />
                  </div>
                  {errors.name && <p className="error">{errors.name.message}</p>}
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
                    defaultValue={client.email}
                    placeholder="Enter Your Email"
                  />
                </div>
                {errors.email && <p className="error">{errors.email.message}</p>}
              </div>

              <hr/>

              <Flexible_Plan/>
            </div>

            <div className="list">
              <h2>Simulate Your Monthly Costs</h2>
              <div id="allSelected">
                <div>
                  <h4>Agents:</h4>
                  <ul>
                    <li>
                      {selectedPlan.option.agentNumber} Agent <span>--${selectedPlan.option.discount}</span> 
                    </li>
                  </ul>

                </div>

                {selectedPlan?.dataTeam?.dataNumber > 0 && (
                  <div>
                    <h4>DataTeam:</h4>
                    <ul>
                      <li>
                        {selectedPlan.dataTeam.dataNumber} DataTeam <span>${selectedPlan.dataTeam.total}</span> 
                      </li>
                    </ul>
                  </div>
                )}


                {selectedPlan.resources && (
                  <div>
                    <h4>Resources:</h4>
                    <ul>
                    {selectedPlan.resources.map((resource) => (
                      <li key={resource.name}>
                        {resource.name} <span>${resource.price}</span>
                      </li>
                    ))}
                    </ul>
                  </div>
                )}

                {selectedPlan?.acquisitionTeam?.length > 0 && (
                  <div>
                    <h4>Acquisition Team:</h4>
                    <ul>
                      {selectedPlan.acquisitionTeam.map((team) => (
                        <li key={team.name}>
                          {team.name} <span>${team.price}</span> 
                        </li>
                      ))}
                    </ul>

                  </div>
                )}
              </div>

              <div className="bottom">
                <button type="submit" className="main-button" onClick={() => setIsClickOnCheck(true)}>
                  Checkout
                </button>
                <h3>Total: <span id="total">${calculateTotal()}</span></h3>
              </div>
            </div>
          </form>
        </div>

        <Services />
        <Reviews />
      </div>
    </>
  );
}
