import React,{createContext, useState} from 'react';
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(""); // Initialize user state to null

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};















