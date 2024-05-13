import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Appointments from './components/Appointments';
import Patients from './components/Patients';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="container">
        <h1 style={{ color: "green" }}>Cure Hospitals</h1>
        <nav>
          <ul>
            {loggedIn ? (
              <>
                <li><Link to="/appointments">Appointments</Link></li>
                <li><Link to="/patients">Patients</Link></li>
                <li style={{ float: "right" }}><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li style={{ float: "right" }}><Link to="/login">Login</Link></li>
                <li style={{ float: "right" }}><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/appointments" element={<Appointments loggedIn={loggedIn} />} />
          <Route path="/patients" element={<Patients loggedIn={loggedIn} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
