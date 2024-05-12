import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'; 
import Home from './components/Home';
import Radionice from './components/Workshops';
import Predavaci from './components/Lecturers';
import Administracija from './components/Administration';
import Prijava from './components/LogInSignUp';
import { useAuth } from './auth'; 
import Logo from './logo.jpg';

const App = () => {
  const { isAdmin, isLoggedIn } = useAuth(); 

  return (
    <Router>
      <div>
        <nav className="navbar fixed top-0 left-0 w-full flex justify-between bg-[#0087AD] rounded-xl h-[100px] z-10">
          <img src={Logo} alt="Logo" className="w-100 h-100 rounded-xl ml-4"/>
          <div className="flex justify-around w-full text-white text-2xl p-8 rounded-xl">
            <div>
              <Link to="/" className="hover:text-gray-300 font-bold">Home</Link>
            </div>
            <div>
              <Link to="/radionice" className="hover:text-gray-300 font-bold">Workshops</Link>
            </div>
            <div>
              <Link to="/predavaci" className="hover:text-gray-300 font-bold">Lecturers</Link>
            </div>
            {isAdmin && ( 
              <div>
                <Link to="/administracija" className="hover:text-gray-300 font-bold">Administration</Link>
              </div>
            )}
            {!isLoggedIn && (
              <div>
                <Link to="/prijava" className="hover:text-gray-300 font-bold">Log In</Link>
              </div>
            )}
          </div>
        </nav>

        <div className="mt-[150px]">
          <Routes>
            <Route path="/radionice" element={<Radionice />} />
            <Route path="/predavaci" element={<Predavaci />} />
            {isAdmin ? ( 
              <Route path="/administracija" element={<Administracija />} />
            ) : (
              <Route path="/administracija" element={<Navigate to="/" />} /> 
            )}
            {!isLoggedIn ? (
              <Route path="/prijava" element={<Prijava />} />
            ) : (
              <Route path="/prijava" element={<Navigate to="/" />} />
            )}
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
