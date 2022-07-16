# tiles
Working towards a browser based clone of New York Times puzzle Tiles: https://www.nytimes.com/puzzles/tiles

## Tiles - top level description
The New York Times puzzle Tiles (https://www.nytimes.com/puzzles/tiles) offers the player a 5 by 6 grid of tiles. Each tile is composed of 3 or 4 elements. The elements vary each time the game is initialised but broardly speaking can be categorised as:
  - a frame
  - a background pattern
  - a foreground pattern
 
 Across the set of all tiles in the grid, elements will be repeated, typically in a range of colours based on a tasteful palette. However, each tile is unique.
 
The game opens with a random "challenge" tile selected and streak count set to 0. The player must select another tile - the "match" tile - where at least one element matches exactly (shape and colour). If the player is successfully, then the streak count is incremented, the matching element is removed from both tiles, and the match tile becomes the challenge tile. Once all elements on a tile have been removed through repeated rounds of the game, then the tile is greyed out, and the player can choose which tile to select as the "challenge" tile.

The aim of the game is to move through the whole grid identifying only matches, and to clear all tiles as quickly as possible.

## My rationale for attempting a clone
I'm struck by the elegance of this game and also by its aesthetic appeal. Attempting to clone it would pose quite a range of challenges, and I am envisaging working on it iteratively
