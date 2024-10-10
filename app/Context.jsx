import { createContext, useState, useEffect } from "react";

export const AllContext = createContext();

export const AllProvider = ({ children }) => {

  const [ bookMenu, setBookMenu ] = useState(false)
  
  return (
    <AllContext.Provider value={{ bookMenu, setBookMenu }}>
      {children}
    </AllContext.Provider>
  );
};