'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePlanContext } from '../Context';

const PlanCard = ({ plan, details }) => {
  const { plans } = usePlanContext();
  const [isDataOrAcquisition, setIsDataOrAcquisition] = useState(false);

  return (
    <div className={`card ${plan === 'Gold' && 'gold'}`} data-aos={`zoom-in-${plan === 'Silver' ? 'right' : plan === 'Titanium' ? 'left' : 'up'}`}>
      <h2>{plan} {plan === 'Gold' && <span><Image src='/image/fire.png' fill /> Popular</span>}</h2>
      <p>{details}</p>

      <hr />

      <div className='holld'>
        <label>{plan} Features</label>
        <ul>
          {Object.keys(plans.resources).map((featureKey, idx) => {
            const feature = plans.resources[featureKey];
            if (feature === 'Tools' && plan === 'Silver') return null;
            return (
              <li key={idx}>
                <Check /> {feature}
                {feature === 'Tools' && plan === 'Gold' && (
                  <>
                    : <br /> (readymode- Monday- propstream)
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {plan != 'Silver' && plan != 'Gold' && <hr />}


      {plan === 'Platinum' ? (
  <div>

    {/* Conditional Rendering of Selected Team Options */}
    {isDataOrAcquisition ? (
      <div>
        <label>Data Team</label>
        <ul>
          <li>
            <Check /> You will be able to choose from a range of data records.
          </li>
        </ul>
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
      Acquisition Team <span className='plusPrice'>+$2600</span>
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
      Data Records <span className='plusPrice'>0.02% per record</span>
    </label>
  </div>
) : plan === 'Titanium' ? (  // Fixed the conditional check here
  <>
    <div className='holld'>
      <label>Acquisition Team</label>
      <ul>
        {plans.acquisitionTeam.map((team, idx) => (
          <li key={idx}><Check /> {team.name}</li>
        ))}
      </ul>
    </div>
    <div className='holld' style={{margin: '0px 0 14px'}}> 
        <label>Data Records</label>
        <ul>
          <li>
            <Check /> You will be able to choose from a range of data records.
          </li>
        </ul>
      </div>

    <span className='plusPrice'>+$2600 & 0.02% per record</span>
  </>
) : null // Ensure to handle cases for plans other than Platinum and Titanium
}



    </div>
  );
};

export default PlanCard;
