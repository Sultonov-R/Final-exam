import React, { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");

  const handleChangeCurrency = (cr) => {
    setCurrency(cr);
    localStorage.setItem("currency", JSON.stringify(cr));
  };

  return (
    <CurrencyContext.Provider value={{ currency, handleChangeCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
