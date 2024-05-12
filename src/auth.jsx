import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus) {
      setIsLoggedIn(true);
      const savedUsername = localStorage.getItem('username');
      setUsername(savedUsername || '');
      const savedIsAdmin = localStorage.getItem('isAdmin'); 
      setIsAdmin(savedIsAdmin === 'true'); 
    }
  }, []);

  const setLoggedIn = (status, user = '', isAdmin = false) => { 
    if (status) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', user);
      localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false'); 
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('isAdmin'); 
    }
    setIsLoggedIn(status);
    setUsername(user);
    setIsAdmin(isAdmin); 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, username, setUsername, isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
