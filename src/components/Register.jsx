import React, { useState } from 'react';
import './Register.css';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Register = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // State to track successful registration
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  // Access authentication context for registering users
  const { registerUser } = useAuth();

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register user using authentication context function
      await registerUser(formData);
      // Set registration success state
      setRegistrationSuccessful(true);
      console.log('Registration successful!', formData);
    } catch (error) {
      console.error('Registration error:', error.message);
      // Handle registration error
    }
  };

  // Redirect to login page if registration is successful
  if (registrationSuccessful) {
    return <Navigate to="/login" />;
  }

  // Render registration form
  return (
    <div className="register-container">
      <h2>Register Form</h2>
      <form onSubmit={handleRegistrationSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
