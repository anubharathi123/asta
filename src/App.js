import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import
import ChangePassword from './Components/changepassword/ChangePassword'; // Import the ChangePassword component
import ResetPassword from './Components/restpassword/ResetPassword';
import Login from './Components/login/Login';
import './App.css';

const App = () => {
  return (
    <Router> {/* Use BrowserRouter (alias 'Router') here */}
      <div className="App">
        {/* <Header /> */}

        <Routes>
          {/* Route for the Login page */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />

          {/* Route for the Reset Password page */}
          <Route path="/forgot-password" element={<ResetPassword />} />

          {/* Route for the Change Password page */}
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
