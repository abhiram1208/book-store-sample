import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (email && password) {
      setUser({
        email,
        name: email.split("@")[0],
      });
      return true;
    }
    return false;
  };
      const setUserFromToken=(token)=>{
        // In real app, decode token to get user info
        if(token){
            setUser({email:"from-token",name:"Token User"});
        }
    };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, setUserFromToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
