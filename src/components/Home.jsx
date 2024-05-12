import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faUsers } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'; 

const Home = () => {
  const { isLoggedIn, username, setLoggedIn, setIsAdmin } = useAuth();
  const [date, setDate] = useState(new Date());
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get('../../data.json');
        setWorkshops(response.data.workshops);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      }
    };

    fetchWorkshops();

    return () => {
    };
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    setIsAdmin(false);
  };

  const handleDateChange = newDate => {
    setDate(newDate);
  };

  const userWorkshops = workshops.filter(workshop =>
    workshop.users.includes(username)
  );

  return (
    <div className="flex">
      <div className="flex flex-col w-3/4 m-4 mt-16 ml-8">
        <h2 className="text-8xl font-bold text-[#0087AD] mb-4">EDIT Code School</h2>
        {isLoggedIn ? (
          <div>
            <p className="text-gray-600 text-2xl">Hi, {username}! Welcome back to the Home page.</p>
          </div>
        ) : (
          <p className="text-gray-600 text-2xl">Welcome to the Home page.</p>
        )}
        <div className="flex justify-around">
          <a href="/radionice" className="flex flex-col items-center bg-[#0087AD] rounded-full text-4xl text-white hover:text-[#0087AD] hover:bg-white m-8 p-8">
            <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
            Workshops
          </a>
          <a href="/predavaci" className="flex flex-col items-center bg-[#0087AD] rounded-full text-4xl text-white hover:text-[#0087AD] hover:bg-white m-8 p-8">
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            Lecturers
          </a>
        </div>
        {isLoggedIn && <div>
          <h3 className="text-2xl font-bold text-[#0087AD]">Your Workshops:</h3>
          <div className ="flex">
            {userWorkshops.map(workshop => (
              <div key={workshop.id} className = "rounded-full text-white bg-[#0087AD] p-2 m-4">{workshop.name}</div>
            ))}
          </div>
        </div>}
      </div>
      <div className="flex flex-col w-1/4 justify-end items-end m-4 h-1/2">
        {isLoggedIn && <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full mt-4 mb-4 w-1/3">
              Logout
            </button>}
        <Calendar value={date} onChange={handleDateChange} />
      </div>
    </div>
  );
};

export default Home;
