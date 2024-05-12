import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const LecturerFilterBox = ({ lecturers, onFilter }) => {
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [organizationMap, setOrganizationMap] = useState({});

  useEffect(() => {
    
    axios.get('../../data.json')
      .then(response => {
        const uniqueOrganizations = [...new Set(response.data.lecturers.map(lecturer => lecturer.organization))];
        setOrganizations(uniqueOrganizations);

        
        const orgMap = {};
        response.data.organizations.forEach(org => {
          orgMap[org.id] = org.name;
        });
        setOrganizationMap(orgMap);
      })
      .catch(error => {
        console.error('Error fetching organizations:', error);
      });
  }, []); 

  const handleFilter = () => {
    let filteredLecturers = lecturers;

    if (selectedThemes.length > 0) {
      filteredLecturers = filteredLecturers.filter(lecturer => selectedThemes.includes(lecturer.theme));
    }

    if (selectedOrganizations.length > 0) {
      filteredLecturers = filteredLecturers.filter(lecturer => selectedOrganizations.includes(lecturer.organization));
    }

    onFilter(filteredLecturers);
  };

  const handleReset = () => {
    setSelectedThemes([]);
    setSelectedOrganizations([]);
    onFilter(lecturers);
  };

  const toggleTheme = (theme) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes(selectedThemes.filter(item => item !== theme));
    } else {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };

  const toggleOrganization = (organization) => {
    if (selectedOrganizations.includes(organization)) {
      setSelectedOrganizations(selectedOrganizations.filter(item => item !== organization));
    } else {
      setSelectedOrganizations([...selectedOrganizations, organization]);
    }
  };

  return (
    <div className="p-4 bg-[#0087AD] text-white rounded-xl">
      <h3 className="text-lg font-semibold mb-2">
      <FontAwesomeIcon icon={faFilter} className="mr-2" />
        Filter Lecturers
      </h3>
      <div className="mb-4 flex flex-col">
        <span className="mr-2 mb-2">Select theme:</span>
        <button onClick={() => toggleTheme('Web Development')} className={`btn rounded-full mb-2 font-bold mt-2 ${selectedThemes.includes('Web Development') ? 'bg-white text-[#0087AD]' : ''}`}>Web Development</button>
        <button onClick={() => toggleTheme('Full Stack Development')} className={`btn rounded-full mb-2 font-bold ${selectedThemes.includes('Full Stack Development') ? 'bg-white text-[#0087AD]' : ''}`}>Full Stack Development</button>
        <button onClick={() => toggleTheme('Mobile Development')} className={`btn rounded-full mb-2 font-bold ${selectedThemes.includes('Mobile Development') ? 'bg-white text-[#0087AD]' : ''}`}>Mobile Development</button>
        <button onClick={() => toggleTheme('Data Science')} className={`btn rounded-full mb-2 font-bold ${selectedThemes.includes('Data Science') ? 'bg-white text-[#0087AD]' : ''}`}>Data Science</button>
      </div>
      <div>
        <span className="mr-2">Select organization:</span>
        <div className="mb-4 flex flex-col mt-4">
        {organizations.map(organizationId => (
          <button
            key={organizationId}
            onClick={() => toggleOrganization(organizationId)}
            className={`btn rounded-full mb-2 font-bold ${
              selectedOrganizations.includes(organizationId) ? 'bg-white text-[#0087AD]' : ''
            }`}
          >
            {organizationMap[organizationId]}
          </button>
        ))}
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center">
        <button onClick={handleFilter} className="m-1 hover:bg-white hover:text-[#0087AD] rounded-full p-1 font-bold">Apply Filter</button>
        <button onClick={handleReset} className="m-1 hover:bg-white hover:text-[#0087AD] rounded-full p-1 font-bold">Reset Filter</button>
      </div>
    </div>
  );
};

export default LecturerFilterBox;
