const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const width = canvas.width;
const blockPosX = 5;
let tetrisBlocks = [];

class ZBlock extends TetrisBoard{
  constructor(firstBlockXPos){
    this.color = 'red';
    this.firstBlockXPos = firstBlockXPos;
    this.skeleton = [
      { 
        playerIndexX: blockPosX,
        playerIndexY: 0,
        playerPixelX: 5 * super.cellWidth,
        playerPixelY: 0 * super.cellHeight,
        index: 1
      },
      {
        playerIndexX: blockPosX + 1,
        playerIndexY: 0,
        playerPixelX: (blockPosX + 1) * super.cellWidth,
        playerPixelY: 0 * super.cellHeight,
        index: 1
      },
      {
        playerIndexX: blockPosX + 1,
        playerIndexY: 1,
        playerPixelX: (blockPosX + 1) * super.cellWidth,
        playerPixelY: 1 * super.cellHeight,
        index: 1
      },
      {
        playerIndexX: blockPosX + 2,
        playerIndexY: 1,
        playerPixelX: (blockPosX + 2) * super.cellWidth,
        playerPixelY: 1 * super.cellHeight,
        index: 1
      }
    ]
  }
}

class OBlock extends TetrisBoard{
  constructor(firstBlockXPos){
    this.color = 'yellow';
    this.skeleton = [
      { 
        playerIndexX: blockPosX,
        playerIndexY: 0,
        playerPixelX: blockPosX * super.cellWidth,
        playerPixelY: 0 * super.cellHeight,
        index: 1
      },
      {
        playerIndexX: blockPosX + 1,
        playerIndexY: 0,
        playerPixelX: (blockPosX + 1) * super.cellWidth,
        playerPixelY: 0 * super.cellHeight,
        index: 1
      },
      {
        playerIndexX: blockPosX,
        playerIndexY: 1,
        playerPixelX: blockPosX * super.cellWidth,
        playerPixelY: 1 * super.cellHeight,
        index: 1
      },
      {
        playerIndexX: blockPosX,
        playerIndexY: 1,
        playerPixelX: (blockPosX + 1) * super.cellWidth,
        playerPixelY: 1 * super.cellHeight,
        index: 1;
      }
    ]
  }
}

class Cell {
  constructor(xPos, yPos, containedBlock, cellIndex){
    this.xPos = xPos;
    this.yPos = yPos;
    this.containedBlock = containedBlock;
    this.cellIndex = cellIndex;
  }
}

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
        if (this.grid[row][column].cellIndex === 1) {
          ctx.fillStyle = 'purple';
        } else {
          ctx.fillStyle = 'black';
        }
        ctx.fillRect(cellX, cellY, this.cellWidth, this.cellHeight);
      }
    }
  }

  createLogicGrid(){
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
          if (this.grid[row][column] === 1) {
            this.grid[row][column] = new Cell(column, row, [], 1);
          } else {
            this.grid[row][column] = new Cell(column, row, [], 0);
          }
      }
    }
  }
}

class TetrisBrick extends TetrisBoard {
  constructor(color, blockList){
      super();
      
      this.color = color;
      this.blockList = blockList;  
  }

  drawBrick() {
    for (let index = 0; index < this.blockList.length; index++) {
        if (this.color === this.blockList[index].color) {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.blockList[index].playerPixelX, this.blockList[index].playerPixelY, super.cellWidth, super.cellHeight); 
        }      
    }    
  }
};

document.onkeydown = (event) => {
  if (event.keyCode === 38 && brick.playerIndexY > 0) { //up
    brick.playerPixelY -= 1;
    console.log('up');
  } else if (event.keyCode === 39) {
    console.log('left');  
  } 
};

const tetrisboard = new TetrisBoard();

const main = () => {
  ctx.clearRect(0, 0, width, height); 
  tetrisboard.drawBoard();
  //TetrisBrick.draw();

  //checkFilledRow();
  //checkBrickGridCollision();
  //updateTetrisBlockPosition();
}

tetrisboard.createLogicGrid();
setInterval(main, 50);
