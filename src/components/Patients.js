import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Patients.css';
import PatientCard from './PatientCard';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '' , bid: ''});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []);

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/patients/add', newPatient);
      setPatients([...patients, response.data]);
      setNewPatient({ name: '', age: '', gender: '' , bid: ''});
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/patients/delete/${id}`);
      setPatients(patients.filter(patient => patient._id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className='patient-main'>
      <div className='form-sections'>
        <h4>Add New Patient</h4>
        <form onSubmit={handleAddPatient}>
          <label>Name:</label>
          <input type="text" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} />
          <label>Age:</label>
          <input type="text" value={newPatient.age} onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} />
          <label>Gender:</label>
          <input type="text" value={newPatient.gender} onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })} />
          <label>Bed Id:</label>
          <input type="text" value={newPatient.bid} onChange={(e) => setNewPatient({ ...newPatient, bid: e.target.value })} />
          <button type="submit">Add Patient</button>
        </form>
      </div>

      <div className='patients-section'>
        <h3>Patients ({patients.length})</h3>
        <input type="text" placeholder="Search Patients..." onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="patient-list">
          {patients.filter(patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase())).map(patient => (
            <PatientCard
              key={patient._id}
              patient={patient}
              onDelete={handleDeletePatient}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patients;
