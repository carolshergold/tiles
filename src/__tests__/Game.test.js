import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Game from '../components/Game';

const setTileValues = (id, b, m, f, fin, tiles) => {
  tiles[id]['bg'] = "layer-back color-" + b;
  tiles[id]['mid'] = "layer-mid color-" + m;
  tiles[id]['fg'] = "layer-front color-" + f;
  tiles[id]['finished'] =  fin;
}

const localGenerateTileSet = () => {
      // Set up all 30 tiles     
      var generatedTiles = []
      for(var i = 1; i <=  30; i++) {
        generatedTiles[i] =
        {
          "id": i,
          "bg": "layer-back " ,
          "mid": "layer-mid ",
          "fg": "layer-front " ,
          "finished": false
        }
      }

      // Test 1
      setTileValues(1, 1, 11, 21, false, generatedTiles);
      setTileValues(11, 1, 11, 21, false, generatedTiles);

      // Test 2
      setTileValues(2, 2, "12 matched", "22 matched", false, generatedTiles);
      setTileValues(12, 2, "12 matched", 22, false, generatedTiles);

      return generatedTiles;
    }

describe('Game', () => {
  test('it renders 30 tiles when the "Play" button is clicked', () => {
    render(<Game 
      generateTileSet={localGenerateTileSet}
      startTile={1}
    />);
    screen.debug();
    const buttonElement = screen.getByRole('button', {name: /Play/i});
    fireEvent.click(buttonElement);
    const tileElements = screen.getAllByTestId("tile");
    expect(tileElements.length).toBe(30);
  });

  
    test('1, 11, 21 vs 1, 11, 21 results in 1m, 11m, 21m vs 1m, 11m, 21m', () => {
      render(<Game 
        generateTileSet={localGenerateTileSet}
        startTile={1}
      />);
      const buttonElement = screen.getByRole('button', {name: /Play/i});
      fireEvent.click(buttonElement);
      const t1 = document.querySelector("#t-1");
      const t11 = document.querySelector("#t-11");
      fireEvent.click(t11);
      const t1Layers = document.querySelectorAll("#t-1 *");
      const t11Layers = document.querySelectorAll("#t-11 *");
      expect(t1Layers.length).toBe(3);
      for (const e of t1Layers) {
        expect(e).not.toBeVisible
      }
      expect(t11Layers.length).toBe(3);
      for (const e of t11Layers) {
        expect(e).not.toBeVisible
      }
      // When all layers are matched, then the finished class should be set
      const t1Fin = document.querySelector("#t-1 .finished");
      expect(t1Fin).toBeTruthy;
      const t11Fin = document.querySelectorAll("#t-11 .finished");
      expect(t11Fin).toBeTruthy
    });

    test('2, 12m, 22m vs 2, 12m, 22 results in 2m, 12m, 22m vs 2m, 12m, 22', () => {
      render(<Game 
        generateTileSet={localGenerateTileSet}
        startTile={2}
      />);
      const buttonElement = screen.getByRole('button', {name: /Play/i});
      fireEvent.click(buttonElement);
      const t2 = document.querySelector("#t-2");
      const t12 = document.querySelector("#t-12");
      fireEvent.click(t12);
      const t2Layers = document.querySelectorAll("#t-2 .matched");
      const t12Layers = document.querySelectorAll("#t-12 .matched");
      expect(t2Layers.length).toBe(3);
      for (const e of t2Layers) {
        expect(e).not.toBeVisible
      }
      expect(t12Layers.length).toBe(2);
      for (const e of t12Layers) {
        expect(e).not.toBeVisible
      }
      // When all layers are matched, then the finished class should be set
      const t2Fin = document.querySelector("#t-2 .finished");
      expect(t2Fin).toBeTruthy;
      const t12Fin = document.querySelectorAll("#t-12 .finished");
      expect(t12Fin).toBeFalsy
    });


  test('it displays a single "selected" tile at the start of the game', () => {
    render(<Game 
      generateTileSet={localGenerateTileSet}
      startTile={1}
    />);
    const buttonElement = screen.getByRole('button', {name: /Play/i});
    fireEvent.click(buttonElement);
    const tileElements = document.querySelectorAll(".selected");
    expect(tileElements.length).toBe(1);  
  }); 
    {/* Note that the whole background philosophy behind React Testing Library is to 
    prioritise testing using strategies that the actual user will adopt. Therefore its
    query selectors are all focussed on visible elements such as the role of an element, or
    }its text. However, there no text or roles in the grid rendering of the tiles.
    It therefore seems like a reasonable solution to revert to using document.query type selectors
    where necessary
    see: https://www.javascripttutorial.net/javascript-dom/javascript-queryselector/
    */}
  
  test('all tile layers are visible at the start of the game', () => {
    render(<Game 
      generateTileSet={localGenerateTileSet}
      startTile={1}
    />);
    const buttonElement = screen.getByRole('button', {name: /Play/i});
    fireEvent.click(buttonElement);
    const layerElements = document.querySelectorAll(".layer-back, .layer-mid, .layer-front");
    expect(layerElements.length).toBe(90);
    for (const e of layerElements) {
      expect(e).toBeVisible
    }
  });

  })