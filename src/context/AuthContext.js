import { createContext, useContext, useState } from 'react';

// Create authentication context
const AuthContext = createContext();

/**
 * Provider component to manage authentication state and actions.
 * It provides authentication state and functions to its children.
 * @param {object} children - Child components wrapped by AuthProvider.
 */
export const AuthProvider = ({ children }) => {
  // State to track user authentication status
  const [authenticated, setAuthenticated] = useState(false);

  // State to store a list of registered users
  const [registeredUsers, setRegisteredUsers] = useState([]);

  /**
   * Function to register a new user.
   * Adds the new user to the list of registered users.
   * @param {object} userData - Data of the new user.
   */
  const registerUser = (userData) => {
    // Add the new user to the list
    setRegisteredUsers((prevUsers) => [...prevUsers, userData]);
    console.log('User registered successfully:', userData);
  };

  /**
   * Function to log in the user.
   * Sets the authentication status to true.
   */
  const userLogin = () => {
    setAuthenticated(true);
    console.log('User is logged successfully'); // Log a message for debugging
  };

  /**
   * Function to log out the user.
   * Sets the authentication status to false.
   */
  const logout = () => {
    setAuthenticated(false);
    console.log('User is logged out.'); // Log a message for debugging
  };

  // Provide authentication state and functions to children components
  return (
    <AuthContext.Provider value={{ authenticated, userLogin, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access authentication context.
 * @returns {object} - Authentication context values.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
