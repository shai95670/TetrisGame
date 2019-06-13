const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const width = canvas.width;
const blockPosX = 5;
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
  draw(){
    for (let index = 0; index < this.skeleton.length; index++) {
         ctx.fillStyle = this.color;
         ctx.fillRect(this.skeleton[index].playerPixelX, this.skeleton[index].playerPixelY, super.cellWidth, super.cellHeight); ;  
    }
  }
  getSkeletonBrick(index){
    return this.skeleton[index];
  }
}

class OBlock extends TetrisBoard{
  constructor(){
    super();
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
}

document.onkeydown = (event) => {
  if (event.keyCode === 38 && brick.playerIndexY > 0) { //up
    brick.playerPixelY -= 1;
    console.log('up');
  } else if (event.keyCode === 39) {
    console.log('left');  
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

    let currentCheckedSkeleton = tetrisBlocks[index].skeleton;
    let currentCheckedSkeletonBrick = tetrisBlocks[index].getSkeletonBrick(currentBrickCheckedIndex);
    console.log(tetrisboard.rows);
    

    for (let row = 0; row < tetrisboard.rows; row++) {
      for (let column = 0; column < tetrisboard.columns; column++) {
        //console.log(currentCheckedSkeletonBrick.playerIndexX, tetrisboard.grid[row][column].xPos);     
        if (currentCheckedSkeletonBrick.playerIndexX === tetrisboard.grid[row][column].xPos &&
            currentCheckedSkeletonBrick.playerIndexY === tetrisboard.grid[row][column].yPos && 
            tetrisboard.grid[row][column].cellIndex != 1) {
              console.log(currentCheckedSkeletonBrick.playerIndexX, tetrisboard.grid[row][column].xPos);
              tetrisboard.grid[row][column].containedBlock.push(currentCheckedSkeletonBrick);
              currentBrickCheckedIndex++;
              break;           
        }   
      }
    }
    console.log(currentBrickCheckedIndex);
    
    if (currentBrickCheckedIndex === 3) {
       index++;
       currentBrickCheckedIndex = 0;
    }

    //index++;
  }
}

const tetrisboard = new TetrisBoard();
generateTetrisBlocks();
tetrisboard.createLogicGrid();
updateGrid();

console.log(tetrisBlocks);
console.log(tetrisboard.grid);


const main = () => {
  ctx.clearRect(0, 0, width, height); 
  tetrisboard.drawBoard();
  drawTetrisBlocks()

  //checkFilledRow()
  //updateGrid() // updates grid with blocks in cells 
  //if(checkBrickGridCollision()){
  //   generateTetrisBlocks();   
  //};
  //updateTetrisBlockPosition();
  //isGameOver();
}


setInterval(main, 50);
