import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity, faUserGraduate, faClock, faCogs, faLayerGroup, faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
import AddWorkshopForm from './AddWorkshopForm'; 
import EditWorkshopForm from './EditWorkshopForm'; 
import AddLecturerForm from './AddLecturerForm';
import EditLecturerForm from './EditLecturerForm'; 

const Administration = () => {
  const [workshops, setWorkshops] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [displayWorkshops, setDisplayWorkshops] = useState(true);
  const [showAddWorkshopForm, setShowAddWorkshopForm] = useState(false);
  const [showEditWorkshopForm, setShowEditWorkshopForm] = useState(false); 
  const [workshopToEdit, setWorkshopToEdit] = useState(null); 
  const [showAddLecturerForm, setShowAddLecturerForm] = useState(false); 
  const [lecturerToEdit, setLecturerToEdit] = useState(null); 

  const handleAddLecturerClick = () => {
    setShowAddLecturerForm(true); 
  };

  const handleLecturerAdded = (newLecturer) => {
    setLecturers(prevLecturers => [...prevLecturers, newLecturer]); 
    setShowAddLecturerForm(false); 
  };


  useEffect(() => {
    axios.get('../../data.json')
      .then(response => {
        setWorkshops(response.data.workshops);
        setLecturers(response.data.lecturers);
        setOrganizations(response.data.organizations);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const getOrganizationName = (organizationId) => {
    const organization = organizations.find(org => org.id === organizationId);
    return organization ? organization.name : "Unknown Organization";
  };

  const handleAddWorkshopClick = () => {
    setShowAddWorkshopForm(true); 
  };

  const handleWorkshopAdded = (newWorkshop) => {
    setWorkshops(prevWorkshops => [...prevWorkshops, newWorkshop]); 
    setShowAddWorkshopForm(false); 
  };

  const handleCloseForm = () => {
    setShowAddWorkshopForm(false);
    setShowAddLecturerForm(false);
    setShowEditWorkshopForm(false); 
  };

  const handleEditWorkshop = (workshop) => {
    setWorkshopToEdit(workshop);
    setShowEditWorkshopForm(true);
  };

  const handleWorkshopEdited = (editedWorkshop) => {
    const updatedWorkshops = workshops.map(workshop =>
      workshop.id === editedWorkshop.id ? editedWorkshop : workshop
    );
    setWorkshops(updatedWorkshops);
    setShowEditWorkshopForm(false);
  };

  const handleDeleteWorkshop = (workshopId) => {
    axios.delete(`http://localhost:3001/workshops/${workshopId}`)
      .then(response => {
        
        const updatedWorkshops = workshops.filter(workshop => workshop.id !== workshopId);
        setWorkshops(updatedWorkshops);
      })
      .catch(error => {
        console.error('Error deleting workshop:', error);
      });
  };

  const handleDeleteLecturer = (lecturerId) => {
    axios.delete(`http://localhost:3001/lecturers/${lecturerId}`)
      .then(response => {
        const updatedLecturers = lecturers.filter(lecturer => lecturer.id !== lecturerId);
        setLecturers(updatedLecturers);
      })
      .catch(error => {
        console.error('Error deleting lecturer:', error);
      });
  };

  const handleEditLecturer = (lecturer) => {
    setLecturerToEdit(lecturer);
  };

  const handleLecturerEdited = (editedLecturer) => {
    const updatedLecturers = lecturers.map(lecturer =>
      lecturer.id === editedLecturer.id ? editedLecturer : lecturer
    );
    setLecturers(updatedLecturers);
    setLecturerToEdit(null); 
  };

  return (
    <div>
      <div className="flex justify-around mb-4">
        <button
          onClick={() => setDisplayWorkshops(true)}
          className={`${
            displayWorkshops ? 'bg-[#0087AD] text-white' : 'bg-white text-[#0087AD]'
          } rounded-full p-2 font-bold`}
        >
          Workshops
        </button>
        <button
          onClick={() => setDisplayWorkshops(false)}
          className={`${
            !displayWorkshops ? 'bg-[#0087AD] text-white' : 'bg-white text-[#0087AD]'
          } rounded-full p-2 font-bold`}
        >
          Lecturers
        </button>
      </div>
      {showAddLecturerForm && <AddLecturerForm onAddLecturer={handleLecturerAdded} onClose={handleCloseForm} />} 

      {showAddWorkshopForm && <AddWorkshopForm onAdd={handleWorkshopAdded} onClose={handleCloseForm} />} 
      {showEditWorkshopForm && <EditWorkshopForm workshopData={workshopToEdit} onEdit={handleWorkshopEdited} onClose={handleCloseForm} />} 

      {lecturerToEdit && <EditLecturerForm lecturerData={lecturerToEdit} onEditLecturer={handleLecturerEdited} onClose={() => setLecturerToEdit(null)} />} 

      {displayWorkshops ? (
        <div>
          <button onClick={handleAddWorkshopClick} className="bg-[#0087AD] rounded-full p-2 text-white m-8">Add New Workshop</button> 
          <ul>
          {workshops.map(workshop => (
            <li key={workshop.id}>
              <div className="flex justify-between text-white bg-[#005570] rounded-xl p-2 w-4/5 m-4">
                <h3 className="font-bold text-2xl">{workshop.name}</h3>
                <p> <FontAwesomeIcon icon={faUserGraduate} className="ml-2 mr-2" /> {workshop.lecturer}</p>
                <p> <FontAwesomeIcon icon={faClock} className="ml-2 mr-2" /> {workshop.duration}</p>
                <p> <FontAwesomeIcon icon={faCogs} className="ml-2 mr-2" /> {workshop.difficulty}</p>
                <p> <FontAwesomeIcon icon={faLayerGroup} className="ml-2 mr-2" /> {workshop.theme}</p>
                <p> <FontAwesomeIcon icon={faUser} className="ml-2 mr-2" /> {workshop.number_of_application}</p>
                <button onClick={() => handleEditWorkshop(workshop)}> <FontAwesomeIcon icon={faEdit} className="ml-2 mr-2" /></button>
                <button onClick={() => handleDeleteWorkshop(workshop.id)}>Delete</button> 
              </div>
            </li>
          ))}
          </ul>
        </div>
      ) : (
        <div>
          <button onClick={handleAddLecturerClick} className="bg-[#0087AD] rounded-full p-2 text-white m-8">Add New Lecturer</button>
          <ul>
            {lecturers.map(lecturer => (
              <li key={lecturer.id}>
                <div className="flex justify-around text-white bg-[#005570] rounded-xl p-2 w-4/5 m-4">
                  <h3 className="font-bold text-2xl">{lecturer.name}</h3>
                  <p> <FontAwesomeIcon icon={faLayerGroup} className="ml-2 mr-2" /> {lecturer.theme}</p>
                  <p><FontAwesomeIcon icon={faUniversity} className="ml-2 mr-2" /> {getOrganizationName(lecturer.organization)}</p>
                  <button onClick={() => handleEditLecturer(lecturer)}><FontAwesomeIcon icon={faEdit} className="ml-2 mr-2" /></button> 
                  <button onClick={() => handleDeleteLecturer(lecturer.id)}>Delete</button> 
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Administration;
