import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import Error from './Error';
import SearchBar from './SearchBar'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import LecturerFilterBox from './LecturerFilterBox';

const Lecturers = () => {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredLecturers, setFilteredLecturers] = useState([]);
  const [hoveredLecturerId, setHoveredLecturerId] = useState(null);
  const [hoveredOrganization, setHoveredOrganization] = useState(null);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.get('../../data.json');
        setLecturers(response.data.lecturers.map(lecturer => ({
          ...lecturer,
          theme: response.data.workshops.find(workshop => workshop.lecturer === lecturer.name)?.theme || "Unknown"
        })));
        setFilteredLecturers(response.data.lecturers); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLecturers();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = lecturers.filter(lecturer =>
      lecturer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLecturers(filtered);
  };

  const handleShowOrganizations = async (lecturerId) => {
    try {
      setHoveredLecturerId(lecturerId);
      const lecturer = lecturers.find(lecturer => lecturer.id === lecturerId);
      const organizationId = lecturer.organization;
      const response = await axios.get('../../data.json');
      const organizations = response.data.organizations;
      const organization = organizations.find(org => org.id === organizationId);
      setHoveredOrganization(organization);
    } catch (error) {
      console.error('Error fetching organization data:', error);
    }
  };

  const handleCloseOrganizations = () => {
    setHoveredLecturerId(null);
    setHoveredOrganization(null);
  };

  const handleFilterChange = (filteredLecturers) => {
    setFilteredLecturers(filteredLecturers);
  };

  if (loading) {
    return <Loading text="Loading..." />;
  }

  if (error) {
    return <Error message={`Error: ${error}`} />;
  }

  return (
    <div className="flex">
      <div className="w-1/6 p-2">
        <LecturerFilterBox lecturers={lecturers} onFilter={handleFilterChange} />
      </div>
      <div className="w-5/6 p-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-8 bg-[#0087AD] rounded-full text-white w-[200px] p-2"> 
            <FontAwesomeIcon icon={faUserGraduate} className="ml-2 mr-2" /> 
              Lecturers
          </h2> 
          <SearchBar onChange={handleSearch} />
        </div>
        <div className="grid grid-cols-3 gap-4 ">
          {filteredLecturers.map(lecturer => (
            <div
              key={lecturer.id}
              className="relative border p-4 bg-[#005570]  rounded-xl"
              onMouseLeave={handleCloseOrganizations}
            >
              <h3 className="text-2xl text-white font-bold m-2 mb-4">{lecturer.name}</h3>
              <p className="text-gray-100 mb-4">
                <FontAwesomeIcon icon={faLaptop} className="mr-2" />
                {lecturer.theme}
              </p>
              <p className="text-gray-100 mb-4">{lecturer.biography}</p>
              <div
                onMouseEnter={() => handleShowOrganizations(lecturer.id)}
                className="mt-8 bg-white text-[#0087AD] font-bold py-2 px-4 rounded-full border border-[#0087AD] hover:bg-[#0087AD] hover:text-white cursor-pointer"
              >
                View Organizations
              </div>
              {hoveredLecturerId === lecturer.id && hoveredOrganization && (
                <div className="absolute top-0 left-0 text-white bg-[#005570] p-4 rounded-xl h-full pt-10">
                  <h4 className="text-xl mb-2 font-bold">{hoveredOrganization.name}</h4>
                  <p>{hoveredOrganization.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lecturers;
