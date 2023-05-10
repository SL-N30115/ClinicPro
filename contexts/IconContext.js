import React, { createContext, useState } from "react";

export const IconContext = createContext();

const IconContextProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <IconContext.Provider value={{
        activeTab, setActiveTab
    }}>{children}</IconContext.Provider>
  );
};

export default IconContextProvider;
