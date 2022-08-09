import { useState, useEffect } from 'react'
import './App.css';
import SingleTile from './components/SingleTile.js'
import StreakPanel from './components/StreakPanel'
import StartPage from './components/StartPage'


function App() {
  const [tiles, setTiles] = useState([])
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [selected, setSelected] = useState(null)
  const [playerMove, setPlayerMove] = useState(null)
  const [userMessage, setUserMessage] = useState(null)

  const pageTitle = 'Tiles v6 - add tests';

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

  const generateTileSet = () => {
    console.log("Start new game")
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
    var tmp = Math.floor(Math.random() * 30) + 1
    setSelected(tmp)
    console.log("New selected: ", tmp)
    setTiles(generatedTiles)
    setCurrentStreak(0)
    setLongestStreak(0)
    setPlayerMove(null)
  }

  // Handle the player input
  const handleInput = (tile) => {
    let finished = tile.finished ? 'finished' : 'not finished'
    console.log("Inside handleInput, tile ", tile.id,  " status is:", finished)

    // Only proceed to process the chosen tile if the tile still has at least one layer
    // left to match -e.g. is not yet finished
    if (! tile.finished) {
      //  If selected has already got a value, update the state for playerMove 
      selected ? setPlayerMove(tile.id) :
      // If selected doesn't have a value, then update the state of selected
                setSelected(tile.id)
      // Null any user message
      setUserMessage(null)
    }
  }

  useEffect(() => {
    console.log("selected: ", selected, " playerMove: ", playerMove);
    // Create a variable to hold whether or not a match was found for this round
    let matched = false;
    // Create an array to hold a clone of tiles to be updated 
    var tilesClone = [];

    if (selected && playerMove) {
      // Clone the tiles array so that we can safely update it 
      tilesClone = tiles.map((x) => x);
      // Create an array of layers to check for matches using the tileClone
      let layers = ["bg", "mid", "fg"];
      for (const layer of layers) {
        console.log("tilesClone[selected][layer]", tilesClone[selected][layer]);
        console.log("tilesClone[playerMove][layer]", tilesClone[playerMove][layer]);
        console.log("-----");
        if  (tilesClone[selected][layer] == tilesClone[playerMove][layer]
              && tilesClone[selected][layer].search('matched') < 0
              && tilesClone[playerMove][layer].search('matched') < 0) {
          tilesClone[selected][layer] = tilesClone[selected][layer] + " matched";
          tilesClone[playerMove][layer] = tilesClone[selected][layer];
          matched = true;
        }
      }
      // Have all layers in playerMove now been matched?
      // If so, then we will allow the player to pick a new starting point without destroying their streak
      if (tilesClone[playerMove]['bg'].search('matched') >= 0
                    && tilesClone[playerMove]['mid'].search('matched') >= 0
                    && tilesClone[playerMove]['fg'].search('matched') >= 0) {
        tilesClone[playerMove].finished = true
        setSelected(null);
        setUserMessage(<div className='user-message'>go anywhere</div>)
      }
      else {
        setSelected(playerMove);
      }
      setPlayerMove(null);
      setTiles(tilesClone);
      if (matched) {
        // If the current streak and the longest streak are equal, then increment the longest streak
        if (longestStreak == currentStreak) {
          setLongestStreak(longestStreak => longestStreak + 1) ;
        }
        // In any case, increment the current streak
        setCurrentStreak(currentStreak => currentStreak + 1);
      }
      else {
        setCurrentStreak(0);
        setUserMessage((<div className='user-message'>no match</div>))
      }
    }
  })

  return (
    <div>
      <StartPage
        pageTitle={pageTitle}
        generateTileSet={generateTileSet}

      />
      <div className="container">
        <div className="tile-grid">
          {tiles.map(tile => (
           <SingleTile 
            key={tile.id}
            tile={tile} 
            selected={selected}
            handleInput={handleInput}  
          />
          ))}
        </div>
        <StreakPanel
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            userMessage={userMessage}
        />
      </div>
      

    </div>
  );
}

export default App
