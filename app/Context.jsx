import { createContext, useState, useEffect } from "react";

export const AllContext = createContext();

export const AllProvider = ({ children }) => {
  
  return (
    <AllContext.Provider value={{ }}>
      {children}
    </AllContext.Provider>
  );
};