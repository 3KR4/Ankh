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
    dataTeam: [
      { count: 5000, price: 100 },
      { count: 10000, price: 200 },
      { count: 15000, price: 300 },
      { count: 20000, price: 400 },
      { count: 25000, price: 500 },
      { count: 30000, price: 600 },
      { count: 35000, price: 700 },
      { count: 40000, price: 800 },
      { count: 45000, price: 900 },
      { count: 50000, price: 1000 }
    ],
    resources: [ 
      'Cold Caller',
      'Quality Assurance',
      'Customer Success Manager',
      'Tools'
    ],
    acquisitionTeam: [
      { name: 'lead manager', price: 850 },
      { name: 'Closer', price: 950 },
      { name: 'disposition manager', price: 950 },
    ],
};

  const [selectedPlan, setSelectedPlan] = useState({
    planName: '',
    resources: [],
    agents: 1,
    dataTeam: {
      dataNumber: 0,
      price:0,
    },
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