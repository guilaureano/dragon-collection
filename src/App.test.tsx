import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import App from './App';

describe('App', () => {
  test('Should be able to see the signin screen', () => {
    const { debug } = render(<App />);
    debug();
  });
});
