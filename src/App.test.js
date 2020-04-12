import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders messenger header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Simple Messenger/i);
  expect(headerElement).toBeInTheDocument();
});
