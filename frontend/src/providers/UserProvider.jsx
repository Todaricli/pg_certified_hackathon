import React, { createContext, useContext, useState } from 'react';

// Create a UserContext
const UserContext = createContext(null);

// Create a custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Create a provider component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
