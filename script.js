const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const width = canvas.width;
let tetrisBlocks = [];



class Cell {
  constructor(xPos, yPos, xPosPixel, yPosPixel, containedBlock, width, height){
    this.xPos = xPos;
    this.yPos = yPos;
    this.xPosPixel = xPosPixel;
    this.yPosPixel = yPosPixel;
    this.containedBlock = containedBlock;
    this.width = width;
    this.height = height;
  }
}

// 1 - blocked cell 
class TetrisBoard {
  constructor(){
    this.columns = 20;
    this.rows = 20;
    this.color = 'black';
    this.cellWidth = width / this.columns; 
    this.cellHeight = height / this.rows;   
    this.grid =  [];
  }

  drawBoard(){
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
      
        let cellX = this.cellWidth * column;
        let cellY = this.cellHeight * row;
        
        ctx.fillStyle = this.color;
        ctx.strokeRect(cellX, cellY, this.cellWidth, this.cellHeight);
      }
    }
  }

  createLogicGrid(){
    for (let row = 0; row < this.rows; row++) {
      this.grid.push([]);
      for (let column = 0; column < this.columns; column++) {
          let cellXPixel = this.cellWidth * column;
          let cellYPixel = this.cellHeight * row;
          this.grid[row].push(new Cell(column, row, cellXPixel, cellYPixel, [], this.cellWidth, this.cellHeight));
      }
    }
  }
}

//todos: implement a single block class
// class Block {
//   constructor(){

//   }
// }

class TetrisBlock {
  constructor(color, skeleton){
    this.color = color;
    this.skeleton = skeleton;
  }
  draw(){
    for (let index = 0; index < this.skeleton.length; index++) {
         ctx.fillStyle = this.color;
         ctx.fillRect(this.skeleton[index].pixelX, this.skeleton[index].pixelY, tetrisboard.cellWidth, tetrisboard.cellHeight, 0.2);  
    }
  }
  getSkeletonBrick(index){
    return this.skeleton[index];
  }
  getSkeleton(){
    return this.skeleton;
  }
}

class ZBlock extends TetrisBlock{
  constructor(color, skeleton){
    super(color, skeleton);
  }
}

class OBlock extends TetrisBlock{
  constructor(color, skeleton){
    super(color, skeleton);
  }  
}

class SBlock extends TetrisBlock{
  constructor(color, skeleton){
    super(color, skeleton);
  }  
}

// update the brick indexes
document.onkeydown = (event) => {
  let skeleton = tetrisBlocks[tetrisBlocks.length-1].getSkeleton(); 
  if (event.keyCode === 38) { // up
    //updateTetrisBlockPosition();
  } else if (event.keyCode === 39) { // right
    if(skeleton[0].blockIndexX < tetrisboard.columns - 1 &&
       skeleton[1].blockIndexX < tetrisboard.columns - 1 &&
       skeleton[3].blockIndexX < tetrisboard.columns - 1){
      for (let index = 0; index < tetrisBlocks[tetrisBlocks.length-1].getSkeleton().length; index++) {  
        skeleton[index].blockIndexX += 1;
        skeleton[index].pixelX += 15;
      }
    }
  } else if (event.keyCode === 37) { // left
    if(skeleton[0].blockIndexX > 0 &&
       skeleton[1].blockIndexX > 0 &&
       skeleton[2].blockIndexX > 0 && 
       skeleton[3].blockIndexX > 0) {
      for (let index = 0; index < tetrisBlocks[tetrisBlocks.length-1].getSkeleton().length; index++) {
        skeleton[index].blockIndexX -= 1;
        skeleton[index].pixelX -= 15;
      }
    }
  } else if (event.keyCode === 40) { // down
    for (let index = 0; index < tetrisBlocks[tetrisBlocks.length-1].getSkeleton().length; index++) {
      let skeleton = tetrisBlocks[tetrisBlocks.length-1].getSkeleton();
      skeleton[index].blockIndexY += 1;
      skeleton[index].pixelY += 20;
    }
    console.log(tetrisBlocks[tetrisBlocks.length-1].skeleton);
  }
};

function getRandomNum(list) {
  return Math.floor(Math.random()* list.length);
}

function generateTetrisBlocks() {
   let constructorList = [
     new SBlock('green', [
                          {
                            blockIndexX: 10,
                            blockIndexY: 1,
                            pixelX: tetrisboard.grid[1][10].xPosPixel,
                            pixelY: tetrisboard.grid[1][10].yPosPixel,
                            index: 1
                          },
                          {
                            blockIndexX: 11,
                            blockIndexY: 1,
                            pixelX: tetrisboard.grid[1][11].xPosPixel,
                            pixelY: tetrisboard.grid[1][11].yPosPixel,
                            index: 1
                          },
                          {
                            blockIndexX: 11,
                            blockIndexY: 0,
                            pixelX: tetrisboard.grid[0][11].xPosPixel,
                            pixelY: tetrisboard.grid[0][11].yPosPixel,
                            index: 1
                          },
                          {
                            blockIndexX: 12,
                            blockIndexY: 0,
                            pixelX: tetrisboard.grid[0][12].xPosPixel,
                            pixelY: tetrisboard.grid[0][12].yPosPixel,
                            index: 1
                          },
                        ]),
      new OBlock('yellow', [
                            {
                            blockIndexX: 10,
                            blockIndexY: 0,
                            pixelX: tetrisboard.grid[0][10].xPosPixel,
                            pixelY: tetrisboard.grid[0][10].yPosPixel,
                            index: 1
                            },
                            {
                              blockIndexX: 11,
                              blockIndexY: 0,
                              pixelX: tetrisboard.grid[0][11].xPosPixel,
                              pixelY: tetrisboard.grid[0][11].yPosPixel,
                              index: 1
                            },
                            {
                              blockIndexX: 10,
                              blockIndexY: 1,
                              pixelX: tetrisboard.grid[1][10].xPosPixel,
                              pixelY: tetrisboard.grid[1][10].yPosPixel,
                              index: 1
                            },
                            {
                              blockIndexX: 11,
                              blockIndexY: 1,
                              pixelX: tetrisboard.grid[1][11].xPosPixel,
                              pixelY: tetrisboard.grid[1][11].yPosPixel,
                              index: 1
                            },
                          ]),
      new ZBlock('red', [
                          {
                            blockIndexX: 10,
                            blockIndexY: 0,
                            pixelX: tetrisboard.grid[0][10].xPosPixel,
                            pixelY: tetrisboard.grid[0][10].yPosPixel,
                            index: 1
                          },
                          {
                            blockIndexX: 11,
                            blockIndexY: 0,
                            pixelX: tetrisboard.grid[0][11].xPosPixel,
                            pixelY: tetrisboard.grid[0][11].yPosPixel,
                            index: 1
                            },
                            {
                            blockIndexX: 11,
                            blockIndexY: 1,
                            pixelX: tetrisboard.grid[1][11].xPosPixel,
                            pixelY: tetrisboard.grid[1][11].yPosPixel,
                            index: 1
                            },
                            {
                            blockIndexX: 12,
                            blockIndexY: 1,
                            pixelX: tetrisboard.grid[1][12].xPosPixel,
                            pixelY: tetrisboard.grid[1][12].yPosPixel,
                            index: 1
                            },
                        ])                                     
   ];
   var tetrisblock = constructorList[getRandomNum(constructorList)];
   tetrisBlocks.push(tetrisblock);
}

function clearRow(rowNum) {
  for (let index = 0; index < tetrisboard.grid[rowNum].length; index++) {
      tetrisboard.grid[rowNum][index].containedBlock.pop(); 
  }
}

// return true if fille row
function checkRow(array){
  numberOfFilledCells = 0;
  for (let index = 0; index < array.length; index++) {
    if (array[index].containedBlock.length === 1) {
      numberOfFilledCells += 1;
    }
  }
  
  if (numberOfFilledCells === (tetrisboard.columns-1)) {
    return true;
  } else {
    return false;
  }
}

function checkFilledRow(){
  let filledCellCounter = 0;
  for (let row = 0; row < tetrisboard.rows; row++) {
    if (checkRow(tetrisboard.grid[row])) {
       console.log('filled 6');
      //clearRow(row);
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
   
  for (let index = 0; index < tetrisBlocks[tetrisBlocks.length-1].getSkeleton().length; index++) {
    let currentBrick = tetrisBlocks[tetrisBlocks.length-1].getSkeletonBrick(index);
    let currentBrickXIndex = tetrisBlocks[tetrisBlocks.length-1].getSkeletonBrick(index).blockIndexX;
    let currentBrickYIndex = tetrisBlocks[tetrisBlocks.length-1].getSkeletonBrick(index).blockIndexY;

    if(tetrisboard.grid[currentBrickYIndex][currentBrickXIndex]){
       tetrisboard.grid[currentBrickYIndex][currentBrickXIndex].containedBlock.push(currentBrick);
    }
  }
  console.log(tetrisboard.grid);
}

function checkBrickBottomCollision() {
  let skeleton = tetrisBlocks[tetrisBlocks.length-1].getSkeleton(); 
  
  // bottom
  // check only the bricks that will collide with the bottom
  if(skeleton[0].blockIndexY >= tetrisboard.rows - 1 ||
     skeleton[1].blockIndexY >= tetrisboard.rows - 1 ||
     skeleton[2].blockIndexY >= tetrisboard.rows - 1 || 
     skeleton[3].blockIndexY >= tetrisboard.rows - 1) {
     for (let index = 0; index < tetrisBlocks[tetrisBlocks.length-1].getSkeleton().length; index++) {
          skeleton[index].index = 2;
          skeleton[index].blockIndexY += 0;
          skeleton[index].pixelY += 0;
      }
      return true;
  }  
}

// return true always check newest brick in the bricklist
// with all the other bricks in the brick list
// check the last brick in tetrisbricks if its next x or y position 
// has a brick if so there is a brick by brick collision and the next brick 
// should be generated 
// check each brick inside the skeleton, all four sides of thge brick for a collision
// if one of the sides contain a brick with an index of 1 then its one of the other 3 bricks
// that construct the same tetrisbrick, in that case it wont be considered a collision
// if one of the sides contain a brick that does not have an index of one then there is a collision
function checkBrickOnBrickCollision(){
  
  let skeleton = tetrisBlocks[tetrisBlocks.length-1].getSkeleton();

  switch (tetrisBlocks[tetrisBlocks.length-1].color) {
    case 'green':
          if (tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX].containedBlock.length > 0 ||
              tetrisboard.grid[skeleton[1].blockIndexY + 1][skeleton[1].blockIndexX].containedBlock.length > 0 ||
              tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX].containedBlock.length > 0) {           
              return true;               
          }   
      break;
    case 'yellow': 
            if (tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[2].blockIndexX].containedBlock.length > 0 ||
                tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX].containedBlock.length > 0) {         
                return true;                   
            } 
        break;
    case 'red':
          if (tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX].containedBlock.length > 0 ||
              tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[2].blockIndexX].containedBlock.length > 0 ||
              tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX].containedBlock.length > 0) {          
              return true;                 
          }   
      break;
  }
}

const main = () => {
  ctx.clearRect(0, 0, width, height); 
  tetrisboard.drawBoard();
  drawTetrisBlocks();
  checkFilledRow();

  // for (let index = 0; index < tetrisBlocks[tetrisBlocks.length-1].getSkeleton().length; index++) {
  //   let skeleton = tetrisBlocks[tetrisBlocks.length-1].getSkeleton();
  //   skeleton[index].blockIndexY += 1;
  //   skeleton[index].pixelY += 20;
  // }
  
  // if a brick collides with something on the grid that means that, ie the floor or another brick:
  // 1. we can generate a new tetris brick
  // 2. we can update the grid with the current sate of tetris block 
  //   positions with in the grid cells them selfs
  if(checkBrickBottomCollision() || checkBrickOnBrickCollision()){
     updateGrid();
     generateTetrisBlocks();
  }
 
  //isGameOver();
}

const tetrisboard = new TetrisBoard();
tetrisboard.createLogicGrid();
generateTetrisBlocks(); // start with one block generated


setInterval(main, 80);
