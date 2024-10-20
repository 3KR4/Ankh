'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { usePlanContext } from '../Context'; // Import PlanContext
import Link from 'next/link'

import { useEffect } from 'react';

const PlanCard = ({ plan }) => {
  const { setSelectedPlan } = usePlanContext(); // Get context setter
  const [menu, setMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState(plan.options[0]);

  // Set default selected extra price for Platinum and Titanium plans
  const initialExtraPrice = 
    plan.title === 'Platinum' && Array.isArray(plan.extraPrice)
      ? [plan.extraPrice[0]] 
      : plan.title === 'Titanium' && plan.extraPrice
      ? [plan.extraPrice[0]] 
      : [];

  const [selectedExtraPrices, setSelectedExtraPrices] = useState(initialExtraPrice);

  const calculateFinalPrice = () => {
    const discount = selectedOption.discount || 0;
    const featuresTotal = Object.keys(plan.features).reduce((acc, featureKey) => {
      return acc + plan.features[featureKey].price;
    }, 0);
    const extraPriceTotal = selectedExtraPrices.reduce((acc, extra) => acc + extra.price, 0);
    return featuresTotal + extraPriceTotal - discount;
  };

  const handlePay = () => {
    let planName = 'Silver'; // Default plan name
    if (selectedExtraPrices.length === 2) {
      planName = 'Titanium';
    } else if (selectedExtraPrices.length > 0) {
      planName = 'Platinum';
    } else if (plan.features.tools) {
      planName = 'Gold';
    }

    let finalExtraPrices = [...selectedExtraPrices];

    if (plan.title === 'Titanium') {
      finalExtraPrices = [
        { name: 'Data Team', price: 1175 },
        { name: 'Acquisition Team', price: 1600 },
      ];
    }

    const selectedPlanData = {
      planName,
      features: plan.features,
      option: selectedOption,
      extraPrice: finalExtraPrices,
    };
  
    localStorage.setItem('selectedPlan', JSON.stringify(selectedPlanData));
  
    setSelectedPlan(selectedPlanData);
  };

  const toggleExtraPrice = (extra) => {
    // Allow only one extraPrice to be selected for Platinum
    if (plan.title === 'Platinum') {
      setSelectedExtraPrices([extra]);
    }
  };

  return (
    <div className={`card ${plan.title === 'Gold' && 'gold'}`} data-aos={`zoom-in-${plan.title === 'Silver' ? 'right' : plan.title === 'Titanium' ? 'left' : 'up'}`}>
      <h2>{plan.title} {plan.title === 'Gold' && <span><Image src='/image/fire.png' fill /> Popular</span>}</h2>
      <p>{plan.details}</p>
      <h3>Total Price: <br/> <span>${calculateFinalPrice()}</span> billed monthly</h3>
      <Link href='checkout' className='main-button' onClick={handlePay}>Get Started</Link>
      <hr />

      {/* Options Dropdown */}
      <div>
        <label>Select Plan Option</label>
        <div className="select">
          <button className='btn' onClick={() => setMenu((prev) => !prev)}>{selectedOption.name} <Image src='/image/angle down.png' fill /></button>
          <ul className={`menu ${menu && 'active'}`}>
            {plan.options.map((opt, idx) => (
              <li key={idx} className={selectedOption.name === opt.name ? 'active' : ''} onClick={() => {
                setSelectedOption(opt); setMenu(false);
              }}>
                {opt.name} {opt.discount !== 0 ? `(-$${opt.discount})` : ``}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Display Features */}
      <div>
        <label>{plan.title} Features</label>
        <ul>
          {Object.keys(plan.features).map((featureKey, idx) => (
            <li key={idx}><Check /> {plan.features[featureKey].name}</li>
          ))}
        </ul>
      </div>

      {/* Extra Price Options */}
      {plan.extraPrice && (
        <div className='specific'>
          {Array.isArray(plan.extraPrice) && plan.title === 'Platinum' ? (
            plan.extraPrice.map((extra, idx) => (
              <label key={idx}>
                <div className="switch">
                  <input
                    type="checkbox"
                    checked={selectedExtraPrices.includes(extra)}
                    onChange={() => toggleExtraPrice(extra)} // Allow only one to be selected
                  />
                  <span className="slider"></span>
                </div>
                {extra.name} <span className='plusPrice'>+${extra.price}</span>
              </label>
            ))
          ) : plan.title === 'Titanium' ? (
            <label>
              <div className="switch">
                <input
                  type="checkbox"
                  checked={true} // Always checked for Titanium
                  disabled={true} // Cannot be unchecked
                />
                <span className="slider"></span>
              </div>
              {plan.extraPrice[0].name} <span className='plusPrice'>+${plan.extraPrice[0].price}</span>
            </label>
          ) : (
            Object.entries(plan.extraPrice).map(([name, price], idx) => (
              <label key={idx}>
                <div className="switch">
                  <input
                    type="checkbox"
                    checked={selectedExtraPrices.includes({ name, price })}
                    onChange={() => toggleExtraPrice({ name, price })} // Allow only one to be selected
                  />
                  <span className="slider"></span>
                </div>
                {name} <span className='plusPrice'>+${price}</span>
              </label>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PlanCard;
