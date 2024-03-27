import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './LandingPage';

describe('LandingPage', () => {
  test('renders landing page with correct content', () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    );

    // Check if the header is rendered
    const headerElement = screen.getByRole('heading', { level: 1, name: /welcome to foodie delight/i });
    expect(headerElement).toBeInTheDocument();

    // Check if paragraph content is rendered
    const paragraphs = screen.getAllByRole('paragraph');
    expect(paragraphs).toHaveLength(3); // Assuming there are 3 paragraphs
    paragraphs.forEach((paragraph) => {
      expect(paragraph).toBeInTheDocument();
    });

    // Check if image is rendered
    const imageElement = screen.getByAltText(/food recipe image/i);
    expect(imageElement).toBeInTheDocument();

    // Check if login and register links are present
    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.getAttribute('href')).toBe('/login');

    const registerLink = screen.getByRole('link', { name: /register/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink.getAttribute('href')).toBe('/register');
  });
});
