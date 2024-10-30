import { createContext, useContext, useState, useEffect } from "react";

export const AllContext = createContext();

const PlanContext = createContext();

export const usePlanContext = () => useContext(PlanContext);

export const AllProvider = ({ children }) => {

  const [ bookMenu, setBookMenu ] = useState(false)

  const [ validationMSg, setValidationMSg ] = useState([])
  const [ paymentAmount, setPaymentAmount ] = useState()

  const handleErrorMsg = (msg, condition) => {
    if (condition && !validationMSg.includes(msg)) {
      // Add the message if the condition is true and the message is not already in the list
      setValidationMSg((prev) => [...prev, msg]);
    } else if (!condition && validationMSg.includes(msg)) {
      // Remove the message if the condition is false and the message is in the list
      setValidationMSg((prev) => prev.filter((y) => y !== msg));
    }
  };

  const plans = {
    optionsPrice: 20,
    dataTeamPrice: 50,
    resources: [
        { name: 'Cold Caller', price: 300 },
        { name: 'Quality Assurance', price: 200 },
        { name: 'Customer Success Manager', price: 400 },
        { name: 'Tools', price: 250 },
    ],
    acquisitionTeam: [
        { name: 'lead manager', price: 500 },
        { name: 'acquisition manager', price: 650 },
        { name: 'disposition manager', price: 550 },
    ],
};

  const [selectedPlan, setSelectedPlan] = useState({
    planName: '',
    resources: [],
    option: {},
    dataTeam: {},
    acquisitionTeam: [],
  });

  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    state: '',
    message: '',
    agents: 0,
    dataTeam: 0,
  });

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
    'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming',
];


  useEffect(() => {
    // Retrieve the plan from localStorage
    const storedPlan = localStorage.getItem('selectedPlan');
    if (storedPlan) {
      setSelectedPlan(JSON.parse(storedPlan));
    }
  }, []);


  return (
    <PlanContext.Provider value={{ plans, states, bookMenu, setBookMenu, selectedPlan, setSelectedPlan, clientInfo, setClientInfo, validationMSg, setValidationMSg, handleErrorMsg, paymentAmount, setPaymentAmount }}>
      {children}
    </PlanContext.Provider>
  );
};