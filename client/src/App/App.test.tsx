import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
    test('renders header', () => {
        render(<App />);
    
        expect(screen.getByText(/Stitcheck/)).toBeInTheDocument();
    }); 
});
