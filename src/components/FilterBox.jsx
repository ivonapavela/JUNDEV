import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const FilterBox = ({ workshops, setFilteredWorkshops }) => {
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);

  const handleFilter = () => {
    let filtered = workshops;

    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter(workshop => selectedDifficulties.includes(workshop.difficulty));
    }

    if (selectedThemes.length > 0) {
      filtered = filtered.filter(workshop => selectedThemes.includes(workshop.theme));
    }

    setFilteredWorkshops(filtered);
  };

  const handleReset = () => {
    setSelectedDifficulties([]);
    setSelectedThemes([]);
    setFilteredWorkshops(workshops);
  };

  const toggleDifficulty = (difficulty) => {
    if (selectedDifficulties.includes(difficulty)) {
      setSelectedDifficulties(selectedDifficulties.filter(item => item !== difficulty));
    } else {
      setSelectedDifficulties([...selectedDifficulties, difficulty]);
    }
  };

  const toggleTheme = (theme) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes(selectedThemes.filter(item => item !== theme));
    } else {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };

  return (
    <div className="p-4 bg-[#0087AD] text-white rounded-xl">
      <h3 className="text-lg font-semibold mb-2"><FontAwesomeIcon icon={faFilter} className="mr-2" />
        Filter workshops</h3>
      <div className="mb-4 flex flex-col">
        <span className="mr-2 mb-2">Select difficulty:</span>
        <button onClick={() => toggleDifficulty('Beginner')} className={`btn rounded-full mb-2 font-bold ${selectedDifficulties.includes('Beginner') ? 'bg-white text-[#0087AD]' : ''}`}>Beginner</button>
        <button onClick={() => toggleDifficulty('Intermediate')} className={`btn rounded-full mb-2 font-bold ${selectedDifficulties.includes('Intermediate') ? 'bg-white text-[#0087AD]' : ''}`}>Intermediate</button>
        <button onClick={() => toggleDifficulty('Advanced')} className={`btn rounded-full mb-2 font-bold ${selectedDifficulties.includes('Advanced') ? 'bg-white text-[#0087AD]' : ''}`}>Advanced</button>
      </div>
      <div>
        <span className="mr-2">Select theme:</span>
        <button onClick={() => toggleTheme('Web Development')} className={`btn rounded-full mb-2 font-bold mt-2 ${selectedThemes.includes('Web Development') ? 'bg-white text-[#0087AD]' : ''}`}>Web Development</button>
        <button onClick={() => toggleTheme('Full Stack Development')} className={`btn rounded-full mb-2 font-bold ${selectedThemes.includes('Full Stack Development') ? 'bg-white text-[#0087AD]' : ''}`}>Full Stack Development</button>
        <button onClick={() => toggleTheme('Mobile Development')} className={`btn rounded-full mb-2 font-bold ${selectedThemes.includes('Mobile Development') ? 'bg-white text-[#0087AD]' : ''}`}>Mobile Development</button>
        <button onClick={() => toggleTheme('Data Science')} className={`btn rounded-full mb-2 font-bold ${selectedThemes.includes('Data Science') ? 'bg-white text-[#0087AD]' : ''}`}>Data Science</button>
      </div>
      <div className="mt-4 flex flex-col items-center">
        <button onClick={handleFilter} className="m-1 hover:bg-white hover:text-[#0087AD] rounded-full p-1 font-bold">Apply Filter</button>
        <button onClick={handleReset} className="m-1 hover:bg-white hover:text-[#0087AD] rounded-full p-1 font-bold">Reset Filter</button>
      </div>
    </div>
  );
};

export default FilterBox;
