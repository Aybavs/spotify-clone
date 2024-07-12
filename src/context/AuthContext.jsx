import React, { createContext, useContext, useState, useEffect } from "react";

// AuthContext oluşturma
export const AuthContext = createContext();

// AuthProvider bileşeni oluşturma
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

  const signIn = (newToken) => {
    console.log("Setting token:", newToken); // Debugging
    setToken(newToken);
    localStorage.setItem("authToken", newToken); // Store token in local storage
  };

  const signOut = () => {
    console.log("Signing out"); // Debugging
    setToken(null);
    localStorage.removeItem("authToken"); // Remove token from local storage
  };

  useEffect(() => {
    console.log("Current token:", token); // Debugging
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook oluşturma
export const useAuth = () => {
  return useContext(AuthContext);
};
