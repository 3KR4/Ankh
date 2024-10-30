'use client';
import { useState, useEffect } from 'react';
import { usePlanContext } from '../Context';
import Image from 'next/image';
import Link from 'next/link';

const Flexible_Plan = () => {
  const { selectedPlan, setSelectedPlan, plans } = usePlanContext();

  // Always-checked resources
  const alwaysCheckedResources = [
    'Cold Caller',
    'Quality Assurance',
    'Customer Success Manager',
  ];

  // Initialize local state with data from local storage if available
  const [agentNumber, setAgentNumber] = useState(() => {
    const storedPlan = JSON.parse(localStorage.getItem('selectedPlan'));
    return storedPlan?.option.agentNumber || 1;
  });

  const [dataNumber, setDataNumber] = useState(() => {
    const storedPlan = JSON.parse(localStorage.getItem('selectedPlan'));
    return storedPlan?.dataTeam?.dataNumber || 0;
  });

  const [resources, setResources] = useState(() => {
    const storedPlan = JSON.parse(localStorage.getItem('selectedPlan'));
    return storedPlan?.resources || [];
  });

  const [acquisitionTeam, setAcquisitionTeam] = useState(() => {
    const storedPlan = JSON.parse(localStorage.getItem('selectedPlan'));
    return storedPlan?.acquisitionTeam || [];
  });

  const [menu, setMenu] = useState(false);
  const [menu2, setMenu2] = useState(false);
  const [planName, setPlanName] = useState('Silver'); // Default plan name

  // Function to determine the plan name based on selections
  const determinePlanName = () => {
    const hasTools = resources.some(resource => resource.name === 'Tools');
    const hasDataTeam = dataNumber > 0;
    const hasAcquisitionTeam = acquisitionTeam.length > 0;
  
    if (hasDataTeam && hasAcquisitionTeam) {
      setPlanName('Titanium');
    } else if (hasDataTeam || hasAcquisitionTeam) {
      setPlanName('Platinum');
    } else if (hasTools) {
      setPlanName('Gold');
    } else {
      setPlanName('Silver');
    }
  };

  // Effect for updating local storage whenever state changes
  useEffect(() => {
    const newPlan = {
      ...selectedPlan,
      resources,
      acquisitionTeam,
      option: {
        ...selectedPlan.option,
        agentNumber,
        discount: agentNumber * plans.optionsPrice, // Calculate discount based on agent number
      },
      dataTeam: {
        ...selectedPlan.dataTeam,
        dataNumber,
        total: dataNumber * plans.dataTeamPrice, // Calculate total for data team
      },
      planName, // Include the plan name in the new plan
    };

    // Save the new plan to local storage
    localStorage.setItem('selectedPlan', JSON.stringify(newPlan));
  }, [resources, acquisitionTeam, agentNumber, dataNumber, planName]);

  // Effect for updating the context state when local storage changes
  useEffect(() => {
    const newPlan = {
      ...selectedPlan,
      resources,
      acquisitionTeam,
      option: {
        ...selectedPlan.option,
        agentNumber,
        discount: agentNumber * plans.optionsPrice, // Update discount based on agent number
      },
      dataTeam: {
        ...selectedPlan.dataTeam,
        dataNumber,
        total: dataNumber * plans.dataTeamPrice, // Update total for data team
      },
      planName, // Include the plan name in the new plan
    };

    // Update the selected plan in context only if it's different from the current one
    if (JSON.stringify(newPlan) !== JSON.stringify(selectedPlan)) {
      setSelectedPlan(newPlan);
    }
  }, [resources, acquisitionTeam, agentNumber, dataNumber, selectedPlan, setSelectedPlan, planName]);

  // Handle feature changes for main resources
  const handleFeatureChange = (resource) => {
    // Prevent changing always-checked resources
    if (alwaysCheckedResources.includes(resource.name)) return;

    setResources((prevResources) => {
      const exists = prevResources.some((item) => item.name === resource.name);
      return exists
        ? prevResources.filter((item) => item.name !== resource.name)
        : [...prevResources, resource];
    });
  };

  // Handle feature changes for acquisition team resources
  const handleAcquisitionChange = (resource) => {
    setAcquisitionTeam((prevResources) => {
      const exists = prevResources.some((item) => item.name === resource.name);
      return exists
        ? prevResources.filter((item) => item.name !== resource.name)
        : [...prevResources, resource];
    });
  };

  // Effect to determine the plan name based on selections
  useEffect(() => {
    determinePlanName();
  }, [resources, dataNumber, acquisitionTeam]); // Run when resources, dataNumber, or acquisitionTeam changes

  return (
    <div className='big-holder'>
      <h2 className='planName' style={{margin: '0px 0px -7px 0px'}}>{planName} Plan</h2> {/* Display the determined plan name */}
      <div className='rowHolder'>
        <div className='holder'>
          <h4>Number of Agents</h4>
          <div className="select">
            <div className='btn' onClick={() => {
              setMenu((prev) => !prev);
              setMenu2(false);
            }}>
              {`${agentNumber < 10 ? `0${agentNumber}` : agentNumber} Agent`}
              {agentNumber !== 1 && <span>{`--$${agentNumber * plans.optionsPrice} OFF`}</span>}
              <Image src='/image/angle down.png' fill />
            </div>
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
                <Link href={'/pricing#customPlan'} onClick={() => setMenu2(false)}>
                  Or Make Your Custom Plan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='holder'>
          <h4>Number Of Data Team</h4>
          <div className="select">
            <div className='btn' onClick={() => { setMenu2((prev) => !prev); setMenu(false) }}>
              {dataNumber == 0 ? 'Select Data Team' : `${dataNumber < 10 ? `0${dataNumber}` : dataNumber} Data Team`}
              {dataNumber > 0 && <span>{`+$${dataNumber * plans.dataTeamPrice}`}</span>}

              <Image src='/image/angle down.png' fill />
            </div>
            <ul className={`menu ${menu2 ? 'active' : ''}`}>
              <li
                className={dataNumber === 0 ? 'active' : ''}
                onClick={() => {
                  setDataNumber(0);
                  setMenu2(false);
                }}
              >
                I Don't Need Data Team
              </li>
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
                <Link href={'/pricing#customPlan'} onClick={() => setMenu2(false)}>
                  Or Make Your Custom Plan
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='rowHolder'>
        <div className='holder'>
          <h4>Select From Resources</h4>
          {plans.resources.map((resource) => (
            <div key={resource.name} className="checkbox-wrapper-13">
              <input
                id={resource.name}
                type="checkbox"
                checked={resources.some((item) => item.name === resource.name) || alwaysCheckedResources.includes(resource.name)}
                onChange={() => handleFeatureChange(resource)}
              />
              <label htmlFor={resource.name}>
                {resource.name} - ${resource.price}
              </label>
            </div>
          ))}
        </div>

        <div className='holder'>
          <h4>Select From Acquisition Team</h4>
          {plans.acquisitionTeam.map((acquisition) => (
            <div key={acquisition.name} className="checkbox-wrapper-13">
              <input
                id={acquisition.name}
                type="checkbox"
                checked={acquisitionTeam.some((item) => item.name === acquisition.name)}
                onChange={() => handleAcquisitionChange(acquisition)}
              />
              <label htmlFor={acquisition.name}>
                {acquisition.name} - ${acquisition.price}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flexible_Plan;
