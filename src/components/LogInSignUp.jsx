import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const LogInSignUp = () => {
  const { setLoggedIn, setUsername, setIsAdmin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setLocalIsAdmin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showAdminCode, setShowAdminCode] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleAdminInput = (input) => {
    setLocalIsAdmin(input === 'editcode');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignUp && password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }
    
    setPasswordError('');

    if (isSignUp) {
      try {
        const { data } = await axios.get('http://localhost:3001/users');
        const existingUser = data.find((u) => u.email === email);
        if (existingUser) {
          setEmailError('User with this email already exists.');
          return; 
        }
        const newUser = { email, password, admin: isAdmin };
        await axios.post('http://localhost:3001/users', newUser);
        console.log('User signed up successfully!');
        
        
        setLoggedIn(true);
        setUsername(email);
        setLocalIsAdmin(isAdmin);
        setIsAdmin(isAdmin);
      } catch (error) {
        console.error('Error signing up:', error);
      }
    } else {
      try {
        const { data } = await axios.get('../../data.json');
        const user = data.users.find((u) => u.email === email && u.password === password);
        if (user) {
          console.log('User logged in:', user);
          setLoggedIn(true);
          setUsername(user.email);
          setLocalIsAdmin(user.admin);
          setIsAdmin(user.admin);
        } else {
          setLoginError('Invalid email or password');
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-[#0087AD] rounded-lg p-16 pb-0 relative">
      <h2 className="text-4xl font-bold mb-8 text-white">{isSignUp ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-gray-100 text-xl">Email:</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black" />
          {emailError && <p className="text-white flex items-center"><FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />{emailError}</p>}
        </label>
        <label className="block mb-4">
          <span className="text-gray-100 text-xl">Password:</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black" />
          {isSignUp && passwordError && <p className="text-white flex items-center"><FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />{passwordError}</p>}
        </label>
        {loginError && <p className="text-white flex items-center"><FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />{loginError}</p>}
        {isSignUp && (
          <div className="block mb-4 relative">
            <label className="text-gray-100 text-xl">Admin:</label>
            <input type="text" onChange={(e) => handleAdminInput(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black" />
            <div className="absolute top-0 right-0 mt-1 mr-2">
              <div className="rounded-full p-1" onClick={() => setShowAdminCode(!showAdminCode)}>
                <FontAwesomeIcon icon={faLightbulb} className="text-gray-100" />
              </div>
              {showAdminCode && (
                <div className="text-white px-2 py-1 rounded-lg absolute left-[-300px] top-[50px] z-10">
                  Admin Code: editcode
                </div>
              )}
            </div>
          </div>
        )}
        <button type="submit" className="w-full py-2 px-4 mt-10 mb-20 border border-transparent rounded-md shadow-sm font-bold text-[#0087AD] bg-white hover:bg-[#0087AD] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{isSignUp ? 'SIGN UP' : 'LOG IN'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)} className="mt-4 text-sm ml-[-50px] text-white hover:text-indigo-200">{isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}</button>
    </div>
  );
};

export default LogInSignUp;
