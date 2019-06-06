const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const width = canvas.width;
let dx = 2;
let dy = 2;
let cells= [];
let tetrisBlocks = [];

// 1 - blocked cell 
class TetrisBoard {
  constructor(){
    this.columns = 10;
    this.rows = 14
    TetrisBoard.prototype.cellWidth = width / this.columns;
    TetrisBoard.prototype.cellHeight = height / this.rows;
    this.grid = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
  }

  drawBoard(){
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
      
        let cellX = this.cellWidth * column;
        let cellY = this.cellHeight * row;
        
        //fill the obstacles in with red
        if (this.grid[row][column] === 1) {
          ctx.fillStyle = 'purple';
        } 
        else {
          ctx.fillStyle = 'black';
        }
        ctx.fillRect(cellX, cellY, this.cellWidth, this.cellHeight);
      }
    }
  };
}

class TetrisBrick extends TetrisBoard {
  constructor(color){
    super();
    
    this.color = color;
    this.blockList = [
      { 
        playerIndexX: 4,
        playerIndexY: 0,
        color: 'red',
        playerPixelX: this.playerIndexX * super.cellWidth,
        playerPixelY: this.playerIndexY * super.cellHeight
      },
      {
        playerIndexX: 5,
        playerIndexY: 0,
        color: 'red',
        playerPixelX: this.playerIndexX * super.cellWidth,
        playerPixelY: this.playerIndexY * super.cellHeight
      },
      {
        playerIndexX: 5,
        playerIndexY: 1,
        color: 'red',
        playerPixelX: this.playerIndexX * super.cellWidth,
        playerPixelY: this.playerIndexY * super.cellHeight
      },
      {
        playerIndexX: 6,
        playerIndexY: 1,
        color: 'red',
        playerPixelX: this.playerIndexX * super.cellWidth,
        playerPixelY: this.playerIndexY * super.cellHeight
      },
      {
        playerIndexX: 4,
        playerIndexY: 0,
        color: 'yellow',
        playerPixelX: this.playerIndexX * super.cellWidth,
        playerPixelY: this.playerIndexY * super.cellHeight
      },
      {
        playerIndexX: 5,
        playerIndexY: 0,
        color: 'yellow',
        playerPixelX: this.playerIndexX * super.cellWidth,
        playerPixelY: this.playerIndexY * super.cellHeight
      },
      {
        playerIndexX: 4,
        playerIndexY: 1,
        color: 'yellow',
        playerPixelX: this.playerIndexX * super.cellWidth,
        playerPixelY: this.playerIndexY * super.cellHeight
      },
      {
        playerIndexX: 5,
        playerIndexY: 1,
        color: 'yellow',
        playerPixelX: this.playerIndexX * super.cellWidth,
        playerPixelY: this.playerIndexY * super.cellHeight
      }
    ];
    // can inticipate that the number of lone bricks are 4,
    // for each pieace
    // list of four objects

    // this.playerIndexX = playerIndexX;
    // this.playerIndexY = playerIndexY;

    // this.playerPixelX = this.playerIndexX * super.cellWidth;
    // this.playerPixelY = this.playerIndexY * super.cellHeight;
  }

  drawBrick() {
    for (let index = 0; index < this.blockList.length; index++) {
        if (this.color === this.blockList[index].color) {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.blockList[index].playerPixelX, this.blockList[index].playerPixelY, super.cellWidth, super.cellHeight); 
        }      
    }
    console.log(this.blockList);
    
  }
};

class Cell {
  constructor(xPos, yPos, containedBlock, cellIndex){
    this.xPos = xPos;
    this.yPos = yPos;
    this.containedBlock = containedBlock;
    this.cellIndex = cellIndex;
  }
}

document.onkeydown = (event) => {
  if (event.keyCode === 38 && brick.playerIndexY > 0 && !tetrisGrid.grid[brick.playerIndexY-1][brick.playerIndexX]) { //up
    brick.playerPixelY -= 1;
    console.log('up');
    
  } else if (event.keyCode === 39 && !tetrisGrid.grid[tetrisGrid.columns][brick.playerIndexX]) {
    brick.blockList.forEach(element => { element.playerPixelX += 1 });
    console.log('left');
    
  } 
};

const tetrisGrid = new TetrisBoard(width, height);
const brick = new TetrisBrick('yellow');

function generateCells(){
  for (let row = 0; row < tetrisGrid.rows; row++) {
    for (let column = 0; column < tetrisGrid.columns; column++) {
        let cellX = tetrisGrid.cellWidth * column;
        let cellY = tetrisGrid.cellHeight * row;

        if (tetrisGrid.grid[row][column] === 1) {
          let cell = new Cell(cellX, cellY, {}, 1);
          cells.push(cell); 
        } else {
          let cell = new Cell(cellX, cellY, {}, 0);
          cells.push(cell); 
        }
    }
  }    
}

const main = () => {
  ctx.clearRect(0, 0, width, height);
  tetrisGrid.drawBoard();
   
  //brick.drawBrick();

  // if (brickCollision()) {
  //   brick.drawBrick();
  // }
}

generateCells();
setInterval(main, 50);
