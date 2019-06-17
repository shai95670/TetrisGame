const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const width = canvas.width;
const startBlockPosX = 5;
let tetrisBlocks = [];



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

class ZBlock extends TetrisBoard{
  constructor(){
    super();
    this.color = 'red';
    this.skeleton = [
      { 
        playerIndexX: 5,
        playerIndexY: 0,
        playerPixelX: 5 * super.cellWidth,
        playerPixelY: 0 * super.cellHeight,
        index: 1
      },
      {
        playerIndexX: 6,
        playerIndexY: 0,
        playerPixelX: 6 * super.cellWidth,
        playerPixelY: 0 * super.cellHeight,
        index: 1
      },
      {
        playerIndexX: 6,
        playerIndexY: 1,
        playerPixelX: 6 * super.cellWidth,
        playerPixelY: 1 * super.cellHeight,
        index: 1
      },
      {
        playerIndexX: 7,
        playerIndexY: 1,
        playerPixelX: 7 * super.cellWidth,
        playerPixelY: 1 * super.cellHeight,
        index: 1
      }
    ]
  }
  draw(){
    for (let index = 0; index < this.skeleton.length; index++) {
         ctx.fillStyle = this.color;
         ctx.fillRect(this.skeleton[index].playerPixelX, this.skeleton[index].playerPixelY, super.cellWidth, super.cellHeight); ;  
    }
  }
  getSkeletonBrick(index){
    return this.skeleton[index];
  }
  getSkeleton(){
    return this.skeleton;
  }
}

class OBlock extends TetrisBoard{
  constructor(){
    super();
    this.color = 'yellow';
    this.skeleton = [
      { 
        playerIndexX: 5,
        playerIndexY: 0,
        playerPixelX: 5 * super.cellWidth,
        playerPixelY: 0 * super.cellHeight,
        index: 1
      },
      {
        playerIndexX: 6,
        playerIndexY: 0,
        playerPixelX: 6 * super.cellWidth,
        playerPixelY: 0 * super.cellHeight,
        index: 1
      },
      {
        playerIndexX: 5,
        playerIndexY: 1,
        playerPixelX: 5 * super.cellWidth,
        playerPixelY: 1 * super.cellHeight,
        index: 1
      },
      {
        playerIndexX: 6,
        playerIndexY: 1,
        playerPixelX: 6 * super.cellWidth,
        playerPixelY: 1 * super.cellHeight,
        index: 1
      }
    ]
  }
  draw(){
    for (let index = 0; index < this.skeleton.length; index++) {
         ctx.fillStyle = this.color;
         ctx.fillRect(this.skeleton[index].playerPixelX, this.skeleton[index].playerPixelY, super.cellWidth, super.cellHeight); ;  
    }
  }
  getSkeletonBrick(index){
    return this.skeleton[index];
  }
  getSkeleton(){
    return this.skeleton;
  }
}

function updateTetrisBlockPosition(keyCode) {
  switch (keyCode) {
    case 39:
      for (let index = 0; index < tetrisBlocks[tetrisBlocks.length-1].getSkeleton().length; index++) {
          let skeleton = tetrisBlocks[tetrisBlocks.length-1].getSkeleton(); 
          if (skeleton[index].playerIndexX < tetrisboard.columns - 1 && tetrisboard.grid[skeleton[index].playerIndexY][skeleton[index].playerIndexX+1].cellIndex != 1) {
            skeleton[index].playerIndexX++;
            skeleton[index].playerPixelX += 29;
          }
      }
    break;
    case 37:  
        for (let index = 0; index < tetrisBlocks[tetrisBlocks.length-1].getSkeleton().length; index++) {
          let skeleton = tetrisBlocks[tetrisBlocks.length-1].getSkeleton();
          if (skeleton[index].playerIndexX > 0 && tetrisboard.grid[skeleton[index].playerIndexY][skeleton[index].playerIndexX-1].cellIndex != 1) {
            skeleton[index].playerIndexX--;
            skeleton[index].playerPixelX -= 29;
          }
        }
    break;  
  }
}

// update the brick indexes
document.onkeydown = (event) => {
  if (event.keyCode === 38) { // up
    //updateTetrisBlockPosition();
  } else if (event.keyCode === 39) { // right
    updateTetrisBlockPosition(39);
    console.log(tetrisBlocks[tetrisBlocks.length-1]);
  } else if (event.keyCode === 37) { // left
    updateTetrisBlockPosition(37);
    console.log(tetrisBlocks[tetrisBlocks.length-1]);
  }
};

function getRandomNum(list) {
  return Math.floor(Math.random()* list.length);
}

function generateTetrisBlocks() {
   let constructorList = [new OBlock(), new ZBlock()]
   var block = constructorList[getRandomNum(constructorList)];
   tetrisBlocks.push(block);
}

// const tetrisboard = new TetrisBoard();
// generateTetrisBlocks();
// tetrisboard.createLogicGrid();
// updateGrid()

function clearRow(rowNum) {
  for (let index = 0; index < tetrisboard.grid[rowNum].length; index++) {
      tetrisboard.grid[rowNum][index].containedBlock.pop(); 
  }
}

function checkFilledRow(){
  let filledCellCounter = 0;
  for (let row = 0; row < tetrisboard.rows; row++) {
    for (let column = 0; column < tetrisboard.columns; column++) {
        if (tetrisboard.grid[row][column].containedBlock.length === 1) {
           filledCellCounter += 1;
        } 
    }

    if (filledCellCounter === tetrisboard.columns) {
       clearRow(row);
    } else {
       continue;
    }
  }
}

function drawTetrisBlocks(){
  for (let index = 0; index < tetrisBlocks.length; index++) {
      tetrisBlocks[index].draw();
  }
}


// loop through the tetrisbricks list,
// for each brick in that list check its skeletons brick x and y positions,
// with each cells x and y pos within the logic grid,
// if the coordinates  match between the current brick being checked and the cell
// push each object with in the bricks skeleton attribute into its equal coord cell
// thus updating the cells with their bricks accordingly
function updateGrid(){
  
  let index = 0;
  let currentBrickCheckedIndex = 0;

  while (index < tetrisBlocks.length) { // loop untill the last brick

    let currentCheckedSkeletonBrick = tetrisBlocks[index].getSkeletonBrick(currentBrickCheckedIndex); 

    for (let row = 0; row < tetrisboard.rows; row++) {
      for (let column = 0; column < tetrisboard.columns; column++) { 
        if (currentCheckedSkeletonBrick.playerIndexX === tetrisboard.grid[row][column].xPos &&
            currentCheckedSkeletonBrick.playerIndexY === tetrisboard.grid[row][column].yPos && 
            tetrisboard.grid[row][column].cellIndex != 1) {
            console.log(currentCheckedSkeletonBrick.playerIndexX, tetrisboard.grid[row][column].xPos);
            console.log(currentCheckedSkeletonBrick.playerIndexY, tetrisboard.grid[row][column].yPos);
            tetrisboard.grid[row][column].containedBlock.push(currentCheckedSkeletonBrick);
            currentBrickCheckedIndex++;
            break;           
        }   
      }
    }

    console.log(currentBrickCheckedIndex);
    
    if (currentBrickCheckedIndex === 4) {
       index++;
       currentBrickCheckedIndex = 0;
    }
  }
}




const main = () => {
  ctx.clearRect(0, 0, width, height); 
  tetrisboard.drawBoard();
  drawTetrisBlocks();
  //checkFilledRow();
  
  // if a brick collides with something on the grid that means that:
  // 1. we can generate a new tetris brick
  // 2. we can update the grid with the current sate of tetris block 
  //    positions with in the grid cells them selfs
  // if(checkBrickGridCollision()){
  //   generateTetrisBlocks(); 
  //   updateGrid() // updates grid with blocks in cells   
  // };

  //isGameOver();
}

const tetrisboard = new TetrisBoard();
generateTetrisBlocks(); // start with one block generated
tetrisboard.createLogicGrid();

console.log(tetrisboard.grid);


setInterval(main, 50);
