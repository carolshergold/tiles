import Game from './components/Game.js'

import React from 'react'
import './App.css';

function App() {

  const generateTileSet = () => {

    // Generate arrays to hold the tile elements
    var bg = []
    var mid = []
    var fg = []

    // Set the background, mid and foreground colors 
    for(var i = 0; i <  15; i++) {
      bg[i] = Math.floor(Math.random() * 7) + 1;    // 7 bg colors defined
      mid[i] = Math.floor(Math.random() * 9) + 11;  // 9 mid colors
      fg[i] = Math.floor(Math.random() * 9) + 21;   // 9 fg colors
    } 

    var bgGenerated = [...bg, ...bg]
      .sort(() => Math.random() - 0.5)

    var midGenerated = [...mid, ...mid]
      .sort(() => Math.random() - 0.5)

    var fgGenerated = [...fg, ...fg]
      .sort(() => Math.random() - 0.5)
    
    var generatedTiles = []
    for(var i = 1; i <=  30; i++) {
      generatedTiles[i] =
      {
        "id": i,
        "bg": "layer-back color-" + bgGenerated[i-1],
        "mid": "layer-mid color-" + midGenerated[i-1],
        "fg": "layer-front color-" + fgGenerated[i-1],
        "finished": false
      }
    }
    return generatedTiles;
  }

  const tiles = generateTileSet();
  var startTile = Math.floor(Math.random() * 30) + 1;
  
  return (
    <div>
      <Game
        initialTiles={tiles}
        startTile={startTile}
      />
    </div>
  );
}

export default App