class Cell {
    constructor(backgroundColor, midColor, foregroundColor) {
        this.backgroundColor = backgroundColor;
        this.midColor = midColor;
        this.foregroundColor = foregroundColor;
        this.bgMatch = false;
        this.midMatch = false;
        this.foreMatch =  false;
        this.selected = false;
        this.finished = 0;
    }

    evaluate_match(cellB) {
        var matchFound = false;
        if (this.backgroundColor == cellB.backgroundColor) {
            this.bgMatch = true;
            cellB.bgMatch = true;
            matchFound = true;
        }
        if (this.midColor == cellB.midColor) {
            this.midMatch = true;
            cellB.midMatch = true;
            matchFound = true;
        }
        if (this.foreColor == cellB.foreColor) {
            this.foreMatch = true;
            cellB.foreMatch = true;
            matchFound = true;
        }
        return matchFound;
    }
}

class Game {
    constructor() {
        this.tiles = [];
        for(var i = 0; i <  30; i++) {
            let backgroundColor = Math.floor(Math.random() * 10) + 1;
            let midColor = Math.floor(Math.random() * 10) + 1;
            let foreColor = Math.floor(Math.random() * 10) + 1;
            this.tiles[i] = new Cell(backgroundColor, midColor, foreColor);
        }
        this.startTile = Math.floor(Math.random() * 30) ;
        this.tiles[this.startTile].selected = true;
        this.streak = 0;
        this.total_finished = 0;  
    }  

myGame = new Game();


  

}