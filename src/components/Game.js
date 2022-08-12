import { useState, useEffect } from 'react'
import '../App.css';
import SingleTile from './SingleTile.js'
import StreakPanel from './StreakPanel'
import StartPage from './StartPage'

export default function Game({ generateTileSet}) {
  // pass in generateTileSet as a function in props

  const [tiles, setTiles] = useState([])
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [selected, setSelected] = useState(null)
  const [playerMove, setPlayerMove] = useState(null)
  const [userMessage, setUserMessage] = useState(null)

  const pageTitle = 'Tiles v7 - refactor and test';

  const startNewGame = () => {
    console.log("Start new game")
    var tmp = Math.floor(Math.random() * 30) + 1
    setSelected(tmp)
    console.log("New selected: ", tmp)
    const tiles = generateTileSet();
    setTiles(tiles)
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
        startNewGame={startNewGame}
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




