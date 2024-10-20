'use client';
import { useState, useEffect } from 'react';
import { usePlanContext } from '../Context';

const Flexible_Plan = () => {
  const { selectedPlan, setSelectedPlan, validationMSg, handleErrorMsg } = usePlanContext();

  const fullPlan = {
    options: [
      { name: '1 Agent', discount: 0 },
      { name: '2-4 Agents', discount: 100 },
      { name: '5-10 Agents', discount: 200 },
      { name: '11+ Agents', discount: 300 },
    ],
    features: {
      coldCaller: { name: 'Cold Caller', price: 300 },
      qualityAssurance: { name: 'Quality Assurance', price: 200 },
      customerSuccess: { name: 'Customer Success Manager', price: 400 },
      tools: { name: 'Tools', price: 250 },
    },
    extraPrice: [
      { name: 'Data Team', price: 1175 },
      { name: 'Acquisition Team', price: 1600 },
    ],
  };

  // Initialize selected states
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedExtraPrices, setSelectedExtraPrices] = useState([]);

  // Sync selectedPlan data into local states on component mount
  useEffect(() => {
    const storedPlan = JSON.parse(localStorage.getItem('selectedPlan')) || selectedPlan;
    setSelectedFeatures(storedPlan.features || {});
    setSelectedOption(storedPlan.option || {});
    setSelectedExtraPrices(storedPlan.extraPrice || []);
  }, [selectedPlan]);



  // Handle feature change
  const handleFeatureChange = (featureKey) => {
    const updatedFeatures = {
      ...selectedFeatures,
      [featureKey]: selectedFeatures[featureKey] ? undefined : fullPlan.features[featureKey],
    };
    setSelectedFeatures(updatedFeatures);
    updateSelectedPlan({ features: updatedFeatures });
  };

  // Handle option change
  const handleOptionChange = (newOption) => {
    setSelectedOption(newOption);
    updateSelectedPlan({ option: newOption });
  };

  // Handle extra price change
  const handleExtraPriceChange = (extra) => {
    const existingIndex = selectedExtraPrices.findIndex((item) => item.name === extra.name);
    const updatedExtraPrices = existingIndex !== -1 
      ? selectedExtraPrices.filter((_, i) => i !== existingIndex) 
      : [...selectedExtraPrices, extra];

    setSelectedExtraPrices(updatedExtraPrices);
    updateSelectedPlan({ extraPrice: updatedExtraPrices });
  };

  // Utility function to update selectedPlan in state and localStorage
  const updateSelectedPlan = (updatedFields) => {
    const updatedPlan = {
      ...selectedPlan,
      ...updatedFields,
    };
    setSelectedPlan(updatedPlan);
    localStorage.setItem('selectedPlan', JSON.stringify(updatedPlan));
  };

  useEffect(() => {
    const featureCount = Object.keys(selectedPlan.features).length;
    console.log(featureCount);
    // Display error if there are less than 3 features
    handleErrorMsg("Please select at least 3 features.", featureCount < 3);
  }, [selectedPlan.features], handleFeatureChange);

  // Calculate the plan name based on selected items
  const calculatePlanName = () => {
    let planName = 'Silver'; // Default to Silver
    if (selectedExtraPrices.length === 2) {
      planName = 'Titanium';
    } else if (selectedExtraPrices.length > 0) {
      planName = 'Platinum';
    } else if (selectedFeatures.tools) {
      planName = 'Gold';
    }
    return planName;
  };

  return (
    <>
      <h2 data-aos="zoom-in-up">{calculatePlanName()} Plan</h2>
      <div className='big-holder' data-aos="zoom-in-up">
        <div className='holder'>
          <h3>Select Agent Package</h3>
          {fullPlan.options.map((option, idx) => (
            <div key={idx} className="checkbox-wrapper-13">
              <input
                id={`option-${idx}`}
                type="checkbox"
                checked={selectedOption.name === option.name}
                onChange={() => handleOptionChange(option)}
              />
              <label htmlFor={`option-${idx}`}>{option.name}</label>
            </div>
          ))}
        </div>

        <div className='holder'>
          <h3>Available Resources</h3>
          {Object.keys(fullPlan.features).map((featureKey, idx) => (
            <div key={idx} className="checkbox-wrapper-13">
              <input
                id={`feature-${idx}`}
                type="checkbox"
                checked={!!selectedFeatures[featureKey]}
                onChange={() => handleFeatureChange(featureKey)}
              />
              <label htmlFor={`feature-${idx}`}>{fullPlan.features[featureKey].name}</label>
            </div>
          ))}
        </div>

        <div className='holder'>
          <h3>Extra Features</h3>
          {fullPlan.extraPrice.map((extra, idx) => (
            <div key={idx} className="checkbox-wrapper-13">
              <input
                id={`extra-${idx}`}
                type="checkbox"
                checked={selectedExtraPrices?.find((x) => x.name === extra.name)}
                onChange={() => handleExtraPriceChange(extra)}
              />
              <label htmlFor={`extra-${idx}`}>{extra.name}</label>
            </div>
          ))}
        </div>
      </div>
      <div className='errors-holder'>
        {validationMSg.map((msg, index) => (
          <p key={index} style={{ color: 'red' }}>{msg}</p>
        ))}
      </div>
    </>
  );
};

export default Flexible_Plan;
