import { useState } from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image'

const PlanCard = ({ plan }) => {
  const [selectedOption, setSelectedOption] = useState(plan.options[3]); // Default to '11+ Agents'
  const [selectedExtraPrice, setSelectedExtraPrice] = useState(null); // Track the selected extra price option

  // Calculate final price based on the selected option and extra feature
  const calculateFinalPrice = () => {
    let basePrice = selectedOption.price;
    const extraPrice = selectedExtraPrice ? plan.extraPrice[selectedExtraPrice] : 0;
    return basePrice + extraPrice;
  };

  const handleOptionChange = (event) => {
    const selectedOpt = plan.options.find(opt => opt.name === event.target.value);
    setSelectedOption(selectedOpt);
  };

  const handleExtraPriceChange = (extraKey) => {
    if (selectedExtraPrice === extraKey) {
      setSelectedExtraPrice(null); // Uncheck if the same option is clicked again
    } else {
      setSelectedExtraPrice(extraKey); // Select a new extra price
    }
  };

  return (
    <div className={`card ${plan.title === 'Gold' && 'gold'}`}>
      <h2>{plan.title} {plan.title === 'Gold' && <span><Image src='/image/fire.png' fill /> Popular</span>}</h2>
      <p>{plan.details}</p>
      <h3>Total Price: <br/> <span>${calculateFinalPrice()}</span> billed monthly</h3>
      <button className='main-button'>Get Started</button>

      <hr />

      {/* Options Dropdown */}
      <div>
        <label>Select Plan Option</label>
        <select value={selectedOption.name} onChange={handleOptionChange}>
          {plan.options.map((opt, idx) => (
            <option key={idx} value={opt.name}>{opt.name} (+${opt.price})</option>
          ))}
        </select>
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
