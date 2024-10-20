import { createContext, useContext, useState, useEffect } from "react";

export const AllContext = createContext();

const PlanContext = createContext();

export const usePlanContext = () => useContext(PlanContext);

export const AllProvider = ({ children }) => {

  const [ bookMenu, setBookMenu ] = useState(false)

  const [ validationMSg, setValidationMSg ] = useState([])

  const handleErrorMsg = (msg, condition) => {
    if (condition && !validationMSg.includes(msg)) {
      // Add the message if the condition is true and the message is not already in the list
      setValidationMSg((prev) => [...prev, msg]);
    } else if (!condition && validationMSg.includes(msg)) {
      // Remove the message if the condition is false and the message is in the list
      setValidationMSg((prev) => prev.filter((y) => y !== msg));
    }
  };

  const [selectedPlan, setSelectedPlan] = useState({
    planName: 'Silver',
    features: {},
    option: {},
    extraPrice: [],
  });

  useEffect(() => {
    // Retrieve the plan from localStorage
    const storedPlan = localStorage.getItem('selectedPlan');
    if (storedPlan) {
      setSelectedPlan(JSON.parse(storedPlan));
    }
  }, []);


  return (
    <PlanContext.Provider value={{ bookMenu, setBookMenu, selectedPlan, setSelectedPlan, validationMSg, setValidationMSg, handleErrorMsg }}>
      {children}
    </PlanContext.Provider>
  );
};