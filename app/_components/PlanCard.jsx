'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePlanContext } from '../Context';

const PlanCard = ({ data, plan, details }) => {
  const { plans, setSelectedPlan } = usePlanContext();
  const [agentNumber, setAgentNumber] = useState(1);
  const [dataNumber, setDataNumber] = useState(1);
  const [menu, setMenu] = useState(false);
  const [menu2, setMenu2] = useState(false);
  const [isDataOrAcquisition, setIsDataOrAcquisition] = useState(false);


  const calculateFinalPrice = () => {
    let totalPrice = 0;

    // Calculate agent number price with discount
    totalPrice -= agentNumber * plans.optionsPrice;

    // Add resources based on plan
    plans.resources.forEach((resource) => {
      if (plan === 'Silver' && resource.name !== 'Tools') {
        totalPrice += resource.price;
      } else if (plan === 'Gold' || plan === 'Titanium' || plan === 'Platinum') {
        totalPrice += resource.price;
      }
    });

    // Add extras for Platinum and Titanium
    if (plan === 'Platinum') {
      totalPrice += isDataOrAcquisition
        ? dataNumber * plans.dataTeamPrice
        : plans.acquisitionTeam.reduce((sum, team) => sum + team.price, 0);
    }

    if (plan === 'Titanium') {
      totalPrice += dataNumber * plans.dataTeamPrice;
      totalPrice += plans.acquisitionTeam.reduce((sum, team) => sum + team.price, 0);
    }

    return totalPrice;
  };

  const handleGetStarted = () => {
    let selectedPlan = {
      planName: plan,
      option: { agentNumber, discount: agentNumber * plans.optionsPrice },
    };
  
    if (plan === 'Silver') {
      selectedPlan.resources = plans.resources.filter(resource => resource.name !== 'Tools');
    } else {
      selectedPlan.resources = plans.resources;
    }
  
    if (plan === 'Platinum') {
      selectedPlan[isDataOrAcquisition ? 'dataTeam' : 'acquisitionTeam'] = isDataOrAcquisition
        ? { dataNumber, total: dataNumber * plans.dataTeamPrice }
        : plans.acquisitionTeam;
    } else if (plan === 'Titanium') {
      selectedPlan.dataTeam = { dataNumber, total: dataNumber * plans.dataTeamPrice };
      selectedPlan.acquisitionTeam = plans.acquisitionTeam;
    }
  
    // Save selectedPlan to localStorage
    localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
  
    setSelectedPlan(selectedPlan);
  };
  




  return (
    <div className={`card ${plan === 'Gold' && 'gold'}`} data-aos={`zoom-in-${plan === 'Silver' ? 'right' : plan === 'Titanium' ? 'left' : 'up'}`}>
      <h2>{plan} {plan === 'Gold' && <span><Image src='/image/fire.png' fill /> Popular</span>}</h2>
      <p>{details}</p>
      <h3>Total Price: <br/> <span>${calculateFinalPrice()}</span> billed monthly</h3>
      <Link onClick={handleGetStarted} href='checkout' className='main-button'>Get Started</Link>
      <hr />

      {/* Options Dropdown */}
      <div>
        <label>Select The Number of Agents</label>
        <div className="select">
          <button className='btn' onClick={() => {
            setMenu((prev) => !prev);
            setMenu2(false);
          }}>
            {`${agentNumber < 10 ? `0${agentNumber}` : agentNumber} Agent`}
            {agentNumber !== 1 && <span>{`--$${agentNumber * plans.optionsPrice} OFF`}</span>}
            <Image src='/image/angle down.png' fill />
          </button>
          <ul className={`menu ${menu ? 'active' : ''}`}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
              <li
                key={i}
                className={agentNumber === i ? 'active' : ''}
                onClick={() => {
                  setAgentNumber(i);
                  setMenu(false);
                }}
              >
                {`${i < 10 ? `0${i}` : i}`} <span>{`-$${i * plans.optionsPrice}`}</span>
              </li>
            ))}
            <li>
              <Link href={'#customPlan'} onClick={() => setMenu2(false)}>
                Or Make Your Custom Plan
              </Link>
            </li>
          </ul>
        </div>
      </div>


      <div className='holld'>
        <label>{plan} Features</label>
        <ul>
          {Object.keys(plans.resources).map((featureKey, idx) => {
            const feature = plans.resources[featureKey];
            if (feature.name === 'Tools' && plan === 'Silver') return null;
            return (
              <li key={idx}>
                <Check /> {feature.name}
                {feature.name === 'Tools' && plan === 'Gold' && (
                  <>
                    : <br /> (readymode- Monday- propstream)
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>


      {plan === 'Platinum' ? (
  <div>

    {/* Conditional Rendering of Selected Team Options */}
    {isDataOrAcquisition ? (
      <div>
        <label>Select Data Team</label>
        <div className="select">
          <button className='btn' onClick={() => {setMenu2((prev) => !prev); setMenu(false)}}>
            {`${dataNumber < 10 ? `0${dataNumber}` : dataNumber} DataTeam`}
            {dataNumber !== 1 && <span>{`+$${dataNumber * plans.dataTeamPrice}`}</span>}
            <Image src='/image/angle down.png' fill />
          </button>
          <ul className={`menu ${menu2 ? 'active' : ''}`}>
            {Array.from({ length: 30 }, (_, i) => i + 1).map((i) => (
              <li
                key={i}
                className={dataNumber === i ? 'active' : ''}
                onClick={() => {
                  setDataNumber(i);
                  setMenu2(false);
                }}
              >
                {`${i < 10 ? `0${i}` : i}`} <span>{`+$${i * plans.dataTeamPrice}`}</span>
              </li>
            ))}
            <li>
              <Link href={'#customPlan'} onClick={() => setMenu2(false)}>
                Or Make Your Custom Plan
              </Link>
            </li>
          </ul>
        </div>
      </div>
    ) : (
      <div className='holld'>
        <label>Acquisition Team</label>
        <ul>
          {plans.acquisitionTeam.map((team, idx) => (
            <li key={idx}><Check /> {team.name}</li>
          ))}
        </ul>
      </div>
    )}
    <label>Choose Your Team</label>
        {/* Checkboxes to select between Data Team and Acquisition Team */}
    <label>
      <div className="switch">
        <input
          type="checkbox"
          checked={!isDataOrAcquisition}
          onChange={() => setIsDataOrAcquisition(false)}
        />
        <span className="slider"></span>
      </div>
      Acquisition Team <span className='plusPrice'>+${plans.acquisitionTeam.reduce((sum, team) => sum + team.price, 0)}</span>
    </label>

    <label>
      <div className="switch">
        <input
          type="checkbox"
          checked={isDataOrAcquisition}
          onChange={() => setIsDataOrAcquisition(true)}
        />
        <span className="slider"></span>
      </div>
      Data Team <span className='plusPrice'>+$20 for each set</span>
    </label>
  </div>
) : plan === 'Titanium' ? (  // Fixed the conditional check here
  <>
    <div>
      <label>Select Data Team</label>
      <div className="select">
        <button className='btn' onClick={() => {setMenu2((prev) => !prev); setMenu(false)}}>
          {`${dataNumber < 10 ? `0${dataNumber}` : dataNumber} DataTeam`}
          {dataNumber !== 1 && <span>{`+$${dataNumber * plans.dataTeamPrice}`}</span>}
          <Image src='/image/angle down.png' fill />
        </button>
        <ul className={`menu ${menu2 ? 'active' : ''}`}>
          {Array.from({ length: 30 }, (_, i) => i + 1).map((i) => (
            <li
              key={i}
              className={dataNumber === i ? 'active' : ''}
              onClick={() => {
                setDataNumber(i);
                setMenu2(false);
              }}
            >
              {`${i < 10 ? `0${i}` : i}`} <span>{`+$${i * plans.dataTeamPrice}`}</span>
            </li>
          ))}
          <li>
            <Link href={'#customPlan'} onClick={() => setMenu2(false)}>
              Or Make Your Custom Plan
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <label>Acquisition Team</label>
      <ul>
        {plans.acquisitionTeam.map((team, idx) => (
          <li key={idx}><Check /> {team.name}</li>
        ))}
      </ul>
    </div>

    <span className='plusPrice'>+${plans.acquisitionTeam.reduce((sum, team) => sum + team.price, 0)} & +$20 for each set</span>
  </>
) : null // Ensure to handle cases for plans other than Platinum and Titanium
}



    </div>
  );
};

export default PlanCard;
