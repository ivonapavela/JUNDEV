import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const EditLecturerForm = ({ lecturerData, onEditLecturer, onClose }) => {
  const [editedLecturerData, setEditedLecturerData] = useState(lecturerData);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    async function fetchOrganizations() {
      try {
        const response = await axios.get('../../data.json');
        setOrganizations(response.data.organizations);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    }

    fetchOrganizations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/lecturers/${editedLecturerData.id}`, editedLecturerData);
      onEditLecturer(editedLecturerData);
      onClose();
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedLecturerData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-[#0087AD] text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-bold text-white mb-4">Edit Lecturer</h3>
                <button onClick={onClose} className="absolute top-4 right-4"><FontAwesomeIcon icon={faTimes} className="text-white" /></button>
                <form onSubmit={handleSubmit} className="flex flex-wrap justify-between">
                  <div className="mb-4 w-full sm:w-5/12">
                    <label htmlFor="name" className="block text-white text-sm font-bold mb-2">Name:</label>
                    <input type="text" id="name" name="name" value={editedLecturerData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                  </div>
                  <div className="mb-4 w-full sm:w-5/12">
                    <label htmlFor="theme" className="block text-white text-sm font-bold mb-2">Theme:</label>
                    <input type="text" id="theme" name="theme" value={editedLecturerData.theme} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                  </div>
                  <div className="mb-4 w-full sm:w-5/12">
                    <label htmlFor="organization" className="block text-white text-sm font-bold mb-2">Organization:</label>
                    <select id="organization" name="organization" value={editedLecturerData.organization} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                      <option value="">Select Organization</option>
                      {organizations.map(org => (
                        <option key={org.id} value={org.id}>{org.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="text-center w-full">
                    <button type="submit" className="bg-white hover:bg-[#0087AD] text-[#0087AD] hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLecturerForm;
