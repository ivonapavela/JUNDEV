import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth';
import Loading from './Loading';
import SearchBar from './SearchBar';
import FilterBox from './FilterBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faUserGraduate, faClock, faCogs, faLayerGroup, faUser } from '@fortawesome/free-solid-svg-icons';

const Workshops = () => {
  const { isLoggedIn, username } = useAuth();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('../../data.json');
        setWorkshops(response.data.workshops);
        setFilteredWorkshops(response.data.workshops);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workshops:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApply = async (workshopId) => {
    try {
      if (!isLoggedIn) {
        return;
      }

      const workshop = workshops.find(workshop => workshop.id === workshopId);

      if (!workshop) {
        console.error('Workshop not found.');
        return;
      }

      if (workshop.users.includes(username)) {
        console.error('You have already applied to this workshop.');
        return;
      }

      const updatedUsers = [...workshop.users, username];
      const updatedWorkshop = { ...workshop, number_of_application: workshop.number_of_application + 1, users: updatedUsers };

      await axios.put(`http://localhost:3001/workshops/${workshopId}`, updatedWorkshop);

      const updatedWorkshops = workshops.map(w => (w.id === workshopId ? updatedWorkshop : w));
      setWorkshops(updatedWorkshops);
      setFilteredWorkshops(updatedWorkshops);
    } catch (error) {
      console.error('Error applying for workshop:', error);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = workshops.filter(workshop =>
      workshop.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWorkshops(filtered);
  };

  if (loading) {
    return <Loading text="Loading workshops..." />;
  }

  return (
    <div className="flex">
      <div className="w-1/6 p-4">
        <FilterBox workshops={workshops} setFilteredWorkshops={setFilteredWorkshops} />
      </div>
      <div className="w-5/6 p-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-8 bg-[#0087AD] rounded-full text-white w-[180px] p-2">
            <FontAwesomeIcon icon={faLaptop} className="ml-2 mr-2" />
            Workshops
          </h2>
          <SearchBar onChange={handleSearch} />
        </div>
        <div className="grid grid-cols-3 gap-4 p-8">
          {filteredWorkshops.map(workshop => (
            <div key={workshop.id} className="bg-[#005570] text-white p-4 rounded-lg flex flex-col justify-between h-full">
              <div>
                <p className="text-2xl font-bold mb-2">{workshop.name}</p>
                <p className="mb-2"><FontAwesomeIcon icon={faClock} className = "mr-2" /> {workshop.duration}</p>
                <p className="mb-2"><FontAwesomeIcon icon={faUserGraduate} className = "mr-2"/> {workshop.lecturer}</p>
                <p className="mb-2"><FontAwesomeIcon icon={faCogs} className = "mr-2"/> {workshop.difficulty}</p>
                <p className="mb-2"><FontAwesomeIcon icon={faLayerGroup} className = "mr-2"/> {workshop.theme}</p>
                <p>{workshop.description}</p>
              </div>
              <div className="flex justify-between items-end mt-4">
                <p><FontAwesomeIcon icon={faUser} /> {workshop.number_of_application}</p>
                {isLoggedIn && (
                  <button
                    onClick={() => handleApply(workshop.id)}
                    className={`font-bold rounded-full p-1 ${
                      workshop.users.includes(username) ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-white text-[#0087AD]'
                    }`}
                    disabled={workshop.users.includes(username)}
                  >
                    Prijavi se
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workshops;
