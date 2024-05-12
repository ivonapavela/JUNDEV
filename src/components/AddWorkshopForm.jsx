import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AddWorkshopForm = ({ onAdd, onClose }) => {
    const [workshopData, setWorkshopData] = useState({
      name: '',
      date: '',
      lecturer: '',
      description: '',
      duration: '',
      difficulty: 'Beginner',
      theme: '',
      number_of_application: 0,
    });

    const [lecturers, setLecturers] = useState([]);

    useEffect(() => {
      axios.get('../../data.json')
        .then(response => {
          setLecturers(response.data.lecturers);
        })
        .catch(error => {
          console.error('Error fetching lecturers:', error);
        });
    }, []);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setWorkshopData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3001/workshops', workshopData);
        const newWorkshop = response.data;
        onAdd(newWorkshop); 
        onClose(); 
      } catch (error) {
        console.error('Error adding workshop:', error);
      }
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
                    <h3 className="text-lg leading-6 font-bold text-white mb-4">Add New Workshop</h3>
                    <button onClick={onClose} className="absolute top-4 right-4"><FontAwesomeIcon icon={faTimes} className="text-white" /></button>
                    <form onSubmit={handleSubmit} className="flex flex-wrap justify-between">
                      <div className="mb-4 w-full sm:w-5/12">
                        <label htmlFor="name" className="block text-white text-sm font-bold mb-2">Workshop Name:</label>
                        <input type="text" id="name" name="name" value={workshopData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                      </div>
                      <div className="mb-4 w-full sm:w-5/12">
                        <label htmlFor="date" className="block text-white text-sm font-bold mb-2">Date:</label>
                        <input type="date" id="date" name="date" value={workshopData.date} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                      </div>
                      <div className="mb-4 w-full sm:w-5/12">
                        <label htmlFor="lecturer" className="block text-white text-sm font-bold mb-2">Lecturer:</label>
                        <select id="lecturer" name="lecturer" value={workshopData.lecturer} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                          <option value="">Select Lecturer</option>
                          {lecturers.map(lecturer => (
                            <option key={lecturer.id} value={lecturer.name}>{lecturer.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4 w-full sm:w-5/12">
                        <label htmlFor="description" className="block text-white text-sm font-bold mb-2">Description:</label>
                        <textarea id="description" name="description" value={workshopData.description} onChange={handleChange} rows="4" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
                      </div>
                      <div className="mb-4 w-full sm:w-5/12">
                        <label htmlFor="duration" className="block text-white text-sm font-bold mb-2">Duration:</label>
                        <input type="text" id="duration" name="duration" value={workshopData.duration} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                      </div>
                      <div className="mb-4 w-full sm:w-5/12">
                        <label htmlFor="difficulty" className="block text-white text-sm font-bold mb-2">Difficulty:</label>
                        <select id="difficulty" name="difficulty" value={workshopData.difficulty} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                      <div className="mb-4 w-full sm:w-5/12">
                        <label htmlFor="theme" className="block text-white text-sm font-bold mb-2">Theme:</label>
                        <input type="text" id="theme" name="theme" value={workshopData.theme} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                      </div>
                      <div className="text-center w-full">
                        <button type="submit" className="bg-white hover:bg-[#0087AD] text-[#0087AD] hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Workshop</button>
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

export default AddWorkshopForm;
