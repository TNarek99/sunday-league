import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <MockedProvider mocks={[]}>
      <App />
    </MockedProvider>
  );

  expect(getByText(/Hello/i)).toBeInTheDocument();
});
