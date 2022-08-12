import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StartPage from '../components/StartPage';

describe('StartPage', () => {
  test('it renders 3 elements', () => {
    render(<StartPage />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('it displays as a heading the string passed into it as pageTitle', () => {
    render(<StartPage pageTitle = 'Tiles'/>);
    const title = screen.getByRole('heading', {text: 'Tiles'});
    expect(title).toBeInTheDocument();
  });

  test('it displays a button with text "Play"', () => {
    render(<StartPage pageTitle = 'Tiles'/>);
    const ele = screen.getByRole('button', {text: 'Play'});
    expect(ele).toBeInTheDocument();
  });

// included this as example of digging text value out of the selected element
  test('it displays a button with text "Play"', () => {
    render(<StartPage pageTitle = 'Tiles'/>);
    const ele = screen.getByRole('button');
    expect(ele.textContent).toBe('Play');
  });


});