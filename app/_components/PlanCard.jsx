import { useState } from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';

const PlanCard = ({ plan }) => {
  const [menu, setMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState(plan.options[3]); // Default to the 11+ agent option
  const [selectedExtraPrice, setSelectedExtraPrice] = useState(
    plan.title === 'Titanium' ? 'dataAndAcquisition' : plan.title === 'Platinum' ? 'acquisitionTeam' : null
  );

  const calculateFinalPrice = () => {
    let basePrice = selectedOption.price;
    const extraPrice = selectedExtraPrice ? plan.extraPrice[selectedExtraPrice] : 0;
    return basePrice + extraPrice;
  };

  const handleOptionChange = (x) => {
    const selectedOpt = plan.options.find(opt => opt.name === x);
    setSelectedOption(selectedOpt);
    setMenu(false); // Close the menu after selecting an option
  };

  const handleExtraPriceChange = (extraKey) => {
    if (plan.title === 'Titanium') {
      setSelectedExtraPrice(extraKey);
    } else {
      if (selectedExtraPrice === extraKey) {
        setSelectedExtraPrice(null);
      } else {
        setSelectedExtraPrice(extraKey);
      }
    }
  };

  const handlePay = () => {
    let link = selectedOption.links.default;
  
    if (plan.title === 'Platinum' && selectedExtraPrice === 'dataTeam') {
      link = selectedOption.links.dataTeam;
    }
  
    if (plan.title !== 'Platinum') {
      link = selectedOption.link;
    }
  
    window.location.href = link;
  };
  

  return (
    <div className={`card ${plan.title === 'Gold' && 'gold'}`} data-aos={`zoom-in-${plan.title == 'Silver' ? 'right' : plan.title == 'Titanium' ? 'left' : 'up' }`}>
      <h2>{plan.title} {plan.title === 'Gold' && <span><Image src='/image/fire.png' fill /> Popular</span>}</h2>
      <p>{plan.details}</p>
      <h3>Total Price: <br/> <span>${calculateFinalPrice()}</span> billed monthly</h3>
      <button className='main-button' onClick={handlePay}>Get Started</button>

      <hr />

      {/* Options Dropdown */}
      <div>
        <label>Select Plan Option</label>
        <div className="select">
          <button onClick={() => setMenu((prev) => !prev)}>{selectedOption.name} <Image src='/image/angle down.png' fill></Image></button>
            <ul className={`menu ${menu && 'active'}`}>
              {plan.options.map((opt, idx) => (
                <li
                  key={idx}
                  className={selectedOption.name === opt.name ? 'active' : ''}
                  onClick={() => handleOptionChange(opt.name)} // Use onClick instead of onChange
                >
                  {opt.name} (${opt.price})
                </li>
              ))}
            </ul>
        </div>
      </div>

      {/* Features */}
      <div>
        <label>{plan.title} Features</label>
        <ul>
          {plan.features.map((feature, idx) => (
            <li key={idx}><Check /> {feature}</li>
          ))}
        </ul>
      </div>

      {/* ExtraPrice Options (if applicable) */}
      {plan.extraPrice && (
        <div className='specific'>
          {Object.keys(plan.extraPrice).map((extraKey, idx) => (
            <label key={idx}>
              <div className="switch">
                <input type="radio"             
                  checked={selectedExtraPrice === extraKey} // Only one can be checked
                  onChange={() => handleExtraPriceChange(extraKey)}
                />
                <span className="slider"></span>
              </div>
              {extraKey.replace(/([A-Z])/g, ' $1')} <span className='plusPrice'>+${plan.extraPrice[extraKey]}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanCard;
