import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { divide, generateErrorTextMessage } from 'utils/utils';

test('renders learn react link', () => {
  // render(<App />);
  // const linkElement = screen.getByText(/courses/i);
  // expect(linkElement).toBeInTheDocument();
});

describe('divide function', () => {
  it('should divide two numbers', () => {
    expect(divide(4, 2)).toBe(2);
  });
  it('should throw an error if the divisor is zero', () => {
    expect(() => divide(4, 0)).toThrowError('You can\'t divide by zero.');
  });
});

describe('generateErrorTextMessage function', () => {
  it('should return a string', () => {
    expect(generateErrorTextMessage('Majid test string')).toBe('Majid test string');
  });

  it('should return a empty string', () => {
    expect(generateErrorTextMessage(true)).toStrictEqual('');
  });

  it('should return test1 , test2', () => {
    const result = generateErrorTextMessage({
      a: 'test1',
      b: 'test2'
    });
    console.log(result);
    expect(result).toBe(`test1 , test2`);
  });
});