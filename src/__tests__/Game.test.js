import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Game from '../components/Game';
import { click } from '@testing-library/user-event/dist/click';

const setTileValues = (id, b, m, f, fin, tiles) => {
  tiles[id]['bg'] = "layer-back color-" + b;
  tiles[id]['mid'] = "layer-mid color-" + m;
  tiles[id]['fg'] = "layer-front color-" + f;
  tiles[id]['finished'] =  fin;
}

const generateDefaultTiles = () => {
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

      return generatedTiles;
    }

const clickPlayButton = () => {
  const buttonElement = screen.getByRole('button', {name: /Play/i});
  fireEvent.click(buttonElement);
}    

const clickTile = (tile) => {
  const e = document.querySelector("#t-" + tile);
  fireEvent.click(e);
}

const checkExpectedVisibility = (tile, visible, notVisible) => {
  // params visible and notVisible are arrays of layers, giving the expeced visible and not visible layers
  // using the correct class name for the 3 layers
  // layer-back, layer-mid and layer-front

  for (const layer of visible) {
    const e = document.querySelector("#t-" + tile + " div." + layer);
    expect(e).toBeVisible
  }
  for (const layer of notVisible) {
    const e = document.querySelector("#t-" + tile + " div." + layer);
    expect(e).not.toBeVisible
  }
}

const checkTileFinishedStatus = (tile, expectedFinished) => {
  // expectedFinished is a boolean value
  const e = document.querySelectorAll("#t-" + tile + ".finished");
  expectedFinished ?
    expect(e).toBeTruthy :
    expect(e).toBeFalsy;
}

describe('Game', () => {
  test('it renders 30 tiles when the "Play" button is clicked', () => {
    const mockedTiles = generateDefaultTiles();
    render(<Game 
      initialTiles={mockedTiles}
      startTile={1}
    />);
    clickPlayButton();
    const tileElements = screen.getAllByTestId("tile");
    expect(tileElements.length).toBe(30);
  });

  
    test('1, 11, 21 vs 1, 11, 21 results in 1m, 11m, 21m vs 1m, 11m, 21m', () => {
      let mockedTiles = generateDefaultTiles();
      const startTile = 1;
      const playerMove = 11;

      // Set tile 1 and tile 11 to have matching values for all of their layers, and no layers already matched
      setTileValues(startTile, 1, 11, 21, false, mockedTiles);
      setTileValues(playerMove, 1, 11, 21, false, mockedTiles);
      
      render(<Game 
        initialTiles={mockedTiles}
        startTile={startTile}
      />);

      clickPlayButton();
      clickTile(playerMove);

      // Both tiles should now have all of their layers matched
      checkExpectedVisibility(startTile, [], ['layer-back', 'layer-mid', 'layer-front']);
      checkExpectedVisibility(playerMove, [], ['layer-back', 'layer-mid', 'layer-front']);

      // So both tiles should be flagged as Finished
      checkTileFinishedStatus(startTile, true);
      checkTileFinishedStatus(playerMove, true);
    });

    test('2, 12m, 22m vs 2, 12m, 22 results in 2m, 12m, 22m vs 2m, 12m, 22', () => {
      let mockedTiles = generateDefaultTiles();
      const startTile = 2
      const playerMove = 12

      // set tile 2 and tile 12 to desired values for the test
      setTileValues(startTile, 2, "12 matched", "22 matched", false, mockedTiles);
      setTileValues(playerMove, 2, "12 matched", 22, false, mockedTiles);

      render(<Game 
        initialTiles={mockedTiles}
        startTile={startTile}
      />);
      
      clickPlayButton();
      clickTile(playerMove);

      // startTile should now have all layers matched, but playerMove tile still has unmatched layer-front
      checkExpectedVisibility(startTile, [], ['layer-back', 'layer-mid', 'layer-front']);
      checkExpectedVisibility(playerMove, ['layer-front'], ['layer-back', 'layer-mid']);

      // When all layers are matched, then the finished class should be set - so startTile should be finished, and 
      // playerMove tile should not be finished
      checkTileFinishedStatus(startTile, true);
      checkTileFinishedStatus(playerMove, false);
    });


    test('when the playerMove tile has all its layers matched, then player gets to choose next selected tile', () => {
      let mockedTiles = generateDefaultTiles();
      const startTile = 1
      const playerMove = 11

      // Set tiles to expected values for the test
      setTileValues(startTile, 1, 11, 21, false, mockedTiles);
      setTileValues(playerMove, 1, 11, 21, false, mockedTiles);
      
      render(<Game 
        initialTiles={mockedTiles}
        startTile={startTile}
      />);

      clickPlayButton();
      clickTile(playerMove);

      // Confirm that the playerMove tile is flagged as finished
      checkTileFinishedStatus(playerMove, true)
      // Check there is no selected tile
      const tileElements = document.querySelectorAll(".selected");
      expect(tileElements.length).toBe(0);  

      // Check for presence of player message
      const playerMessage = document.querySelector(".user-message");
      expect(playerMessage).toHaveTextContent("go anywhere");
    });


    test('when the playerMove tile still has unmatched layers, then it becomes the next selected tile', () => {
      let mockedTiles = generateDefaultTiles();
      const startTile = 2
      const playerMove = 12

      // set tile 2 and tile 12 to expected values for the test
      setTileValues(startTile, 2, "12 matched", "22 matched", false, mockedTiles);
      setTileValues(playerMove, 2, "12 matched", 22, false, mockedTiles);
      
      render(<Game 
        initialTiles={mockedTiles}
        startTile={startTile}
      />);

      clickPlayButton();
      clickTile(playerMove);

      // The playerMove tile will not yet have been completed, as its front layer hasn't yet matched
      // So it will now be set as the selected tile for the next move
      checkTileFinishedStatus(playerMove, false)
      // Check that the playerMove tile has now become the selected tile
      const tileElement = document.querySelector("#t-" + playerMove + ".selected");
      expect(tileElement).toBeInTheDocument;  

      // Player message should not be set
      const playerMessage = document.querySelector(".user-message");
      expect(playerMessage).toBeEmptyDOMElement;
    });

  test('it displays a single "selected" tile at the start of the game', () => {
    const mockedTiles = generateDefaultTiles();
    const startTile = 1;
    render(<Game 
      initialTiles={mockedTiles}
      startTile={startTile}
    />);
    clickPlayButton();

    // Check there is only a single selected tile
    const tileElements = document.querySelectorAll(".selected");
    expect(tileElements.length).toBe(1);  
    // Check it is the tile that was passed into the Component as props
    const e = document.querySelector("#t-" + startTile + ".selected");
    expect(e).toBeInTheDocument;
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
    const mockedTiles = generateDefaultTiles();
    render(<Game 
      initialTiles={mockedTiles}
      startTile={1}
    />);
    clickPlayButton();

    const layerElements = document.querySelectorAll(".layer-back, .layer-mid, .layer-front");
    expect(layerElements.length).toBe(90);
    for (const e of layerElements) {
      expect(e).toBeVisible
    }
  });

  })