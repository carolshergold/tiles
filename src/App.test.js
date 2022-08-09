import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  test('it renders 30 tiles when the "Play" button is clicked', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', {name: /Play/i});
    fireEvent.click(buttonElement);
    const tileElements = screen.getAllByTestId("tile");
    expect(tileElements.length).toBe(30);
  });

  test('it displays a single "selected" tile at the start of the game', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', {name: /Play/i});
    fireEvent.click(buttonElement);
    const tileElements = document.querySelectorAll(".selected");
    expect(tileElements.length).toBe(1);
    /* Note that the whole background philosophy behind React Testing Library is to 
    prioritise testing using strategies that the actual user will adopt. Therefore its
    query selectors are all focussed on visible elements such as the role of an element, or
    its text. However, there is very little text in the grid rendering of the tiles.
    It therefore seems like a clean solution to revert to using document.query type selectors
    where necessary
    see: https://www.javascripttutorial.net/javascript-dom/javascript-queryselector/
    */
  });
  // 

  })