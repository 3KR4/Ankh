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
    return storedPlan?.agents || 1;
  });

  const [dataNumber, setDataNumber] = useState(() => {
    const storedPlan = JSON.parse(localStorage.getItem('selectedPlan'));
    return storedPlan?.dataTeam?.dataNumber || 0;
  });
  const [dataPrice, setDataPrice] = useState(() => {
    const storedPlan = JSON.parse(localStorage.getItem('selectedPlan'));
    return storedPlan?.dataTeam?.price || 0;
  });

  const [resources, setResources] = useState(() => {
    const storedPlan = JSON.parse(localStorage.getItem('selectedPlan'));
    return storedPlan?.resources.includes('Tools') ? plans.resources : alwaysCheckedResources;
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
    const hasTools = resources.some(resource => resource === 'Tools');
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


  useEffect(() => {
    const newPlan = {
      ...selectedPlan,
      planName,
      resources,
      acquisitionTeam,
      agents: agentNumber,
      dataTeam: {
        ...selectedPlan.dataTeam,
        dataNumber,
        price: dataPrice,
      },
    };
    localStorage.setItem('selectedPlan', JSON.stringify(newPlan));
  }, [resources, acquisitionTeam, agentNumber, dataNumber, planName]);


  useEffect(() => {
    const newPlan = {
      ...selectedPlan,
      planName,
      resources,
      acquisitionTeam,
      agents: agentNumber,
      dataTeam: {
        ...selectedPlan.dataTeam,
        dataNumber,
        price: dataPrice,
      },
    };
    if (JSON.stringify(newPlan) !== JSON.stringify(selectedPlan)) {
      setSelectedPlan(newPlan);
    }
  }, [resources, acquisitionTeam, agentNumber, dataNumber, selectedPlan, planName]);




  const handleFeatureChange = (resource) => {
    if (alwaysCheckedResources.includes(resource)) return;
    setResources((prevResources) => {
      const exists = prevResources.some((item) => item === resource);
      return exists
        ? prevResources.filter((item) => item !== resource)
        : [...prevResources, resource];
    });
  };

  const handleAcquisitionChange = (acquisition) => {
    setAcquisitionTeam((prevAcquisition) => {
      const exists = prevAcquisition.some((item) => item.name === acquisition.name);
      return exists
        ? prevAcquisition.filter((item) => item.name !== acquisition.name)
        : [...prevAcquisition, acquisition];
    });
  };

  useEffect(() => {
    determinePlanName();
  }, [resources, dataNumber, acquisitionTeam]);

  return (
    <div className='big-holder'>
      <h2 className='planName' style={{margin: '0px 0px -7px 0px'}}>{planName} Plan</h2>
      <div className='rowHolder'>
        <div className='holder'>
          <h4>Select From Agents</h4>
          <div className="select">
            <div className='btn' onClick={() => {
              setMenu((prev) => !prev);
              setMenu2(false);
            }}>
              {`${agentNumber < 10 ? `0${agentNumber}` : agentNumber} Agent`}
              <Image src='/image/angle down.png' fill />
            </div>
            <ul className={`menu ${menu ? 'active' : ''}`}>
              <li
                key={1}
                className={agentNumber === 1 ? 'active' : ''}
                onClick={() => {
                  setAgentNumber(1);
                  setMenu(false);
                }}
              >
                {`01`}
              </li>
              <div className="offerDev">
                <hr />
                <span style={{ color: '#c3a437', margin: '-2px 0 -2px', background: '#272727', top: '12px' }}>Save {selectedPlan.resources.some(resource => resource === 'Tools') ? '12' : '14'}%</span>
                {[...Array(3)].map((_, index) => {
                  const number = index + 2;
                  return (
                    <li
                      style={{ background: '#272727', color: '#c3a437' }}
                      key={number}
                      className={agentNumber === number ? 'active' : ''}
                      onClick={() => {
                        setAgentNumber(number);
                        setMenu(false);
                      }}
                    >
                      {`${number < 10 ? `0${number}` : number}`}
                    </li>
                  );
                })}
              </div>

              <div className='offerDev'>
                <hr />
                <span style={{ color: 'white', fontWeight: '400', background: '#383838' }}>Save 16%</span>
                {[...Array(5)].map((_, index) => {
                  const number = index + 5;
                  return (
                    <li
                      style={{ background: '#383838', color: 'white', fontWeight: '300' }}
                      key={number}
                      className={agentNumber === number ? 'active' : ''}
                      onClick={() => {
                        setAgentNumber(number);
                        setMenu(false);
                      }}
                    >
                      {`${number < 10 ? `0${number}` : number}`}
                    </li>
                  );
                })}
              </div>

              <div className='offerDev'>
                <hr />
                <span style={{ color: 'black', background: '#a38b35' }}>Save {selectedPlan.resources.some(resource => resource === 'Tools') ? '17' : '20'}%</span>
                <li
                  style={{ background: '#a38b35', color: 'black' }}
                  key={10}
                  className={agentNumber === 10 ? 'active' : ''}
                  onClick={() => {
                    setAgentNumber(10);
                    setMenu(false);
                  }}
                >
                  {`10`}
                </li>
              </div>

              <hr/>
              <li>
                <Link href={'/pricing#customPlan'} onClick={() => setMenu2(false)}>
                  Or Make Your Custom Plan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='holder'>
          <h4>Select From Data Records</h4>
          <div className="select">
            <div className='btn' onClick={() => { setMenu2((prev) => !prev); setMenu(false) }}>
              {dataNumber == 0 ? 'Select Data Records' : `${dataNumber} Data Records`}
              <Image src='/image/angle down.png' fill />
            </div>
            <ul className={`menu ${menu2 ? 'active' : ''}`}>
              <li
                className={dataNumber === 0 ? 'active' : ''}
                onClick={() => {
                  setDataNumber(0);
                  setDataPrice(0)
                  setMenu2(false);
                }}
              >
                I Don't Need Data Records
              </li>
              {plans.dataTeam.map((x) => (
                <li
                  key={x.count}
                  className={dataNumber === x.count ? 'active' : ''}
                  onClick={() => {
                    setDataNumber(x.count);
                    setDataPrice(x.price)
                    setMenu2(false);
                  }}
                >
                  {`${x.count} Records`} <span>{`$${x.price}`}</span>
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
            <div key={resource} className="checkbox-wrapper-13">
              <input
                id={resource}
                type="checkbox"
                checked={resources.some((item) => item === resource) || alwaysCheckedResources.includes(resource)}
                onChange={() => handleFeatureChange(resource)}
              />
              <label htmlFor={resource}>
                {resource === 'Tools' ? 'Tools:(readymode- Monday- propstream)' : resource}
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
                {acquisition.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flexible_Plan;
