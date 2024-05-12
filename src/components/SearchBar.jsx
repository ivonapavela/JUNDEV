import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="flex items-center bg-[#0087AD] h-full rounded-full text-white p-2">
      <FontAwesomeIcon icon={faSearch} className="mr-2" />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        className="bg-transparent text-white focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
