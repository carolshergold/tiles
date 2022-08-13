import { useState } from 'react'
import react, { Component} from 'react'
import '../App.css';

export default function SingleTile({ tile, handleInput, selected, isFinished }) {

  const handleClick = () => {
    handleInput(tile)
  }


  return (
    <div key={tile.id} id={"t-" + tile.id} data-testid="tile"
                className={"cell" 
                  + (tile.id == selected ? " selected" : "")
                  + (isFinished ? " finished" : "")
                }
                onClick={handleClick}>
      <div className={tile.bg}></div> 
      <div className={tile.mid}></div> 
      <div className={tile.fg}></div> 
    </div>
  )
};

