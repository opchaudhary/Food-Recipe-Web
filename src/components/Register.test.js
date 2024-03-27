import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from './Register';
import { AuthProvider } from '../context/AuthContext'; // Assuming AuthProvider is used in AuthContext

// Mock the useAuth hook
jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    registerUser: jest.fn(),
  }),
}));

describe('Register component', () => {
  test('renders registration form with inputs and submit button', () => {
    render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );

    const usernameInput = screen.getByLabelText('Username:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const registerButton = screen.getByRole('button', { name: 'Register' });

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test('updates input fields correctly', () => {
    render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );

    const usernameInput = screen.getByLabelText('Username:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(usernameInput.value).toBe('testuser');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('testpassword');
  });

  test('redirects to login page on successful registration', async () => {
    const registerUserMock = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValueOnce([false, jest.fn()]); // Mock the isSuccessful state
    const navigateMock = jest.fn();

    render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );

    const usernameInput = screen.getByLabelText('Username:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const registerButton = screen.getByRole('button', { name: 'Register' });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(registerButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(registerUserMock).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
    });
    expect(navigateMock).toHaveBeenCalledWith('/login');
  });

  test('displays error message for invalid registration data', () => {
    render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );

    const usernameInput = screen.getByLabelText('Username:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const registerButton = screen.getByRole('button', { name: 'Register' });

    fireEvent.change(usernameInput, { target: { value: 'invalid' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(registerButton);

    const errorMessage = screen.getByText('Registration error:');
    expect(errorMessage).toBeInTheDocument();
  });
});
