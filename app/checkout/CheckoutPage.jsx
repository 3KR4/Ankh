'use client'
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Services from '../_components/Services';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { usePlanContext } from '../Context';
import dynamic from 'next/dynamic';

const DynamicFlexible_Plan = dynamic(() => import('../_components/Flexible_Plan'));

const stripePromise = loadStripe('pk_test_51QCBx9HaPDOKhmLc53Aw1Y0hl84YFA1s5DxXylVMDYlLjEOYQdsKxt0ExaTkZ4U7j5thOYfU0DCohP7mzkn2NG6G00z9ek3NPM');

export default function CheckoutPage() {
  const { states, setClientInfo, selectedPlan, plans } = usePlanContext();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [client, setClient] = useState({});
  const [state, setState] = useState('Select Your State');
  const [menu, setMenu] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const [savedAmount, setSavedAmount] = useState(1);
  const [total, setTotal] = useState(1);
  const [BaseAmount, setBaseAmount] = useState(0);
  const [OptionDiscount, setOptionDiscount] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedClient = localStorage.getItem('clientInfo');
      if (storedClient) {
        const parsedClient = JSON.parse(storedClient);
        setClient(parsedClient);
        setState(parsedClient.state || 'Select Your State');
        reset(parsedClient);  // Reset form values with local storage data
      }
    }
  }, [reset]);

  const acquisitionTeamTotal = useCallback(() => {
    const acquisitionTeam = selectedPlan.acquisitionTeam || [];
  
    if (acquisitionTeam?.length === 3) {
      return 2600;
    }
    if (acquisitionTeam?.length === 2) {
      return acquisitionTeam.reduce((sum, item) => sum + item.price, 0) - 100;
    }

    return acquisitionTeam.reduce((sum, item) => sum + item.price, 0);
  }, [selectedPlan]);

  const calculateTotal = useCallback(() => {
    let isGold = selectedPlan.resources.some(resource => resource === 'Tools');
    const baseAmount = isGold ? 1250 : 1115;
    setBaseAmount(baseAmount)

    const optionDiscount = isGold 
      ? (selectedPlan.agents >= 2 && selectedPlan.agents <= 4 ? 12 
        : selectedPlan.agents >= 5 && selectedPlan.agents <= 9 ? 16 
        : selectedPlan.agents === 10 ? 20 
        : 0)
      : (selectedPlan.agents >= 2 && selectedPlan.agents <= 4 ? 14 
        : selectedPlan.agents >= 5 && selectedPlan.agents <= 9 ? 16 
        : selectedPlan.agents === 10 ? 17 
        : 0);

        setOptionDiscount(optionDiscount)

const savedAmount = Math.round(((baseAmount * selectedPlan.agents) * optionDiscount) / 100);

    setSavedAmount(savedAmount);
    const dataTeamPrice = plans.dataTeam.find(x => x.count === selectedPlan.dataTeam.dataNumber)?.price || 0;
    const acquisitionTeamTotalValue = acquisitionTeamTotal();

    return (baseAmount * selectedPlan.agents) + dataTeamPrice + acquisitionTeamTotalValue - savedAmount;
  }, [selectedPlan, acquisitionTeamTotal]);

  useEffect(() => {
  const calculatedTotal = calculateTotal();
  if (!isNaN(calculatedTotal) && calculatedTotal > 0) {
    setTotal(calculatedTotal);
  } else {
    console.error("calculateTotal returned an invalid total:", calculatedTotal);
    setTotal(1); // Set a fallback value if calculateTotal is invalid
  }
  }, [calculateTotal]);

  const handleCheckOut = (data) => {
    if (state !== 'Select Your State') {
      const clientInfo = {
        name: data.name,
        email: data.email,
        state: state,
      };
      setClientInfo(clientInfo);

      if (typeof window !== 'undefined') {
        localStorage.setItem('clientInfo', JSON.stringify(clientInfo));
      }
      setOpenPay(true);
    } else {
      alert('Please Select Your State');
    }
  };

  const options = {
    mode: 'payment',
    currency: 'usd',
    amount: Math.max(1, Math.round(total * 100)),
  };

  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm openPay={openPay} setOpenPay={setOpenPay} amount={total} />
      </Elements>

      <div className="checkout">
        <div className="hero checkout container">
          <span className="hiddens" data-aos="zoom-in-up">Flexible Plans</span>
          <h1 data-aos="zoom-in-up">Choose the <span>resources</span> <br /> that fit your needs!</h1>
          <p data-aos="zoom-in-up">Fully flexible and transparent. No surprises.</p>
        </div>

        <div className="checkout-form" data-aos="zoom-in-up">
          <form onSubmit={handleSubmit(handleCheckOut)}>
            <div className="right customPlan">
              <div className="rowHolder">
                <div className={`inputHolder ${errors.name ? 'notvalid' : ''}`}>
                  <h6 className="placeHolder" onClick={() => document.getElementById('name').focus()}>
                    Enter your Full name
                  </h6>
                  <div className="holder">
                    <input
                      type="text"
                      id="name"
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

                <div className={`select ${state === 'Select Your State' ? 'notvalid' : ''}`}>
                  <div className="btn" onClick={() => setMenu((prev) => !prev)}>
                    {state !== 'Select Your State' ? `State: ${client.state || state}` : 'Select Your State'}
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
                <h6 className="placeHolder" onClick={() => document.getElementById('email').focus()}>
                  Enter Your Email
                </h6>
                <div className="holder">
                  <input
                    type="email"
                    id="email"
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

              <hr />

              <DynamicFlexible_Plan />
            </div>

            <div className="list">
              <h2>Simulate Your Monthly Costs</h2>
              <div id="allSelected">
                <div>
                  <h4>Agents:</h4>
                  <ul>
                    <li>
                      {selectedPlan.agents} Agent <span>${Math.round(BaseAmount * selectedPlan.agents)}</span>
                    </li>
                  </ul>
                </div>

                {savedAmount !== 0 && (
                  <div>
                    <h4>Package Discount:</h4>
                    <ul>
                      <li>
                        {OptionDiscount}% OFF <span>--${Math.round(savedAmount)}</span>
                      </li>
                    </ul>
                  </div>
                )}


                {selectedPlan?.dataTeam?.dataNumber > 0 && (
                  <div>
                    <h4>Data Records:</h4>
                    <ul>
                      <li>
                        {selectedPlan.dataTeam.dataNumber} Data Records <span>${selectedPlan.dataTeam.price}</span>
                      </li>
                    </ul>
                  </div>
                )}

                {selectedPlan.resources && (
                  <div>
                    <h4>Resources:</h4>
                    <ul>
                      {selectedPlan.resources.map((resource) => (
                        <li key={resource}>
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedPlan?.acquisitionTeam?.length > 0 && (
                  <div>
                    <h4>Acquisition Team:</h4>
                    <ul>
                      <li key={selectedPlan.acquisitionTeam[0].name}>
                        {selectedPlan.acquisitionTeam.length === 3 ? 'All Acquisition Team Package' : selectedPlan.acquisitionTeam.length === 2 ? `${selectedPlan.acquisitionTeam[0].name} & ${selectedPlan.acquisitionTeam[1].name} ` : selectedPlan.acquisitionTeam[0].name} <span>${acquisitionTeamTotal()}</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="bottom">
                <button type="submit" className='main-button'>Checkout</button>
                <h3>Total: <span id="total">${Math.round(total)}</span></h3>
              </div>
            </div>
          </form>
        </div>

        <Services />
      </div>
    </>
  );
}
