const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const width = canvas.width;
let dx = 2;
let dy = 2;
let cells= [];

// 1 - blocked cell 
class TetrisBoard {
  constructor(){
    this.columns = 10;
    this.rows = 14;
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
        //cells.push({cellX, cellY});      
  
        //fill the obstacles in with red
        if (this.grid[row][column] === 1) {
          ctx.fillStyle = 'purple';
          //ctx.rect(cellX, cellY, this.cellWidth, this.cellHeight);
        } 
        else {
          ctx.fillStyle = 'black';
        }
  
        ctx.fillRect(cellX, cellY, this.cellWidth, this.cellHeight);
      }
    }
    console.log(cells);
    console.log(TetrisBoard.prototype.cellWidth, TetrisBoard.prototype.cellHeight);

  };
}

class Brick extends TetrisBoard {
  constructor(playerIndexX, playerIndexY){
    super();
    this.playerIndexX = playerIndexX;
    this.playerIndexY = playerIndexY;
    this.playerPixelX = this.playerIndexX * super.cellWidth;
    this.playerPixelY = this.playerIndexY * super.cellHeight;
  }

  drawBrick() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.playerPixelX, this.playerPixelY, super.cellWidth, super.cellHeight);
  }
};

document.onkeydown = (event) => {
  if (event.keyCode === 38 && brick.playerIndexY > 0 && !tetrisGrid.grid[brick.playerIndexY-1][brick.playerIndexX]) { //up
    brick.playerPixelY -= 1;
    console.log('up');
    
  } else if (event.keyCode === 39 && !tetrisGrid.grid[tetrisGrid.columns][brick.playerIndexX]) {
    brick.playerPixelX += 1;
    console.log('left');
    
  } else if (event.keyCode === 80) {
    initializeGame();
  }
};

const tetrisGrid = new TetrisBoard(width, height);
const brick = new Brick(5, 3);

const main = () => {
  ctx.clearRect(0, 0, width, height);
  tetrisGrid.drawBoard();
  brick.drawBrick(2, 2);
}


setInterval(main, 50);
