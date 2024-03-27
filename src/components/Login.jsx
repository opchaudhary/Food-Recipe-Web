// Import necessary dependencies
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../components/Login.css'; // Import CSS file for styling
import { useAuth } from '../context/AuthContext'; // Import authentication context

// Define Login component
const Login = () => {
  // State to manage login form data
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  // Access authentication context for user login
  const { userLogin } = useAuth();

  // State to track login status
  const [logged, setLogged] = useState(false);

  // Function to handle input changes in the login form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  // Function to handle login submission
  const handleLogin = (e) => {
    e.preventDefault();
   
    // Simulate authentication logic (replace with actual authentication logic)
    if (credentials.username === 'omprakash' && credentials.password === 'omprakash') {
      userLogin(); // Call userLogin function from authentication context
      setLogged(true); // Set logged state to true
      alert("Login successfully"); // Display success message
      console.log("Login Successfully!", credentials.username); // Log successful login
    } else {
      alert('Invalid username or password'); // Display error message
    }
  };
  
  // Redirect to dashboard if login is successful
  if (logged) {
    return <Navigate to="/dashboard" />;
  }

  // Render login form
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form> 

      <p>
        Don't have an account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
};

// Export Login component
export default Login;
