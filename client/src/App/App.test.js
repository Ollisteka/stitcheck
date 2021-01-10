import { render, screen } from '@testing-library/react';
import App from './App';

test('renders greetings', () => {
    render(<App />);

    expect(screen.getByText(/Welcome to Stitcheck!/i)).toBeInTheDocument();
});
