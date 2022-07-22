import { useState } from 'react'
import './App.css';


function App() {
  const [tiles, setTiles] = useState([])
  const [turns, setTurns] = useState(0)
  const [selected, setSelected] = useState(0)

  var bg = []
  var mid = []
  var fg = []

  for(var i = 0; i <  15; i++) {
    bg[i] = Math.floor(Math.random() * 10) + 1;
    mid[i] = Math.floor(Math.random() * 10) + 1;
    fg[i] = Math.floor(Math.random() * 10) + 1;
  } 

  const generateTileSet = () => {
    var bgGenerated = [...bg, ...bg]
    .sort(() => Math.random() - 0.5)

    var midGenerated = [...mid, ...mid]
      .sort(() => Math.random() - 0.5)

    var fgGenerated = [...bg, ...bg]
      .sort(() => Math.random() - 0.5)
    
    var generatedTiles = []
    for(var i = 0; i <  30; i++) {
      generatedTiles[i] =
      {
        "id": i,
        "bg": "layer-back color-" + bgGenerated[i],
        "mid": "layer-mid color-" + midGenerated[i],
        "fg": "layer-front color-" + fgGenerated[i]
      }
    }
    setTiles(generatedTiles)
    setTurns(0)

    console.log(tiles)
  }

  return (
    <div>
    <h1>Tiles v3 - React and JSX</h1>
    <button onClick={generateTileSet}>New Game</button>
    <div className="container">
     <div className="tile-grid">
      {tiles.map(tile => (
        <div className="cell" key={tile.id}>
          <div className={tile.bg}></div> 
          <div className={tile.mid}></div> 
          <div className={tile.fg}></div> 
        </div>
      ))}
      
     </div>
    </div>
    </div>
  );
}

export default App;
