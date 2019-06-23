const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const width = canvas.width;
let tetrisBlocks = [];



class Cell {
  constructor(xPos, yPos, xPosPixel, yPosPixel, containedBlock, cellIndex, width, height){
    this.xPos = xPos;
    this.yPos = yPos;
    this.xPosPixel = xPosPixel;
    this.yPosPixel = yPosPixel;
    this.containedBlock = containedBlock;
    this.cellIndex = cellIndex;
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
    this.cellWidth = width / this.columns; // 300 / 10 = 30
    this.cellHeight = height / this.rows;  // 400 / 10 = 40  
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
          this.grid[row].push(new Cell(column, row, cellXPixel, cellYPixel, [], 0, this.cellWidth, this.cellHeight));
      }
    }
  }
}

class ZBlock {
  constructor(){
    this.color = 'red';
    this.skeleton = [
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
     ];
  }
  draw(){
    for (let index = 0; index < this.skeleton.length; index++) {
         ctx.fillStyle = this.color;
         ctx.fillRect(this.skeleton[index].pixelX, this.skeleton[index].pixelY, tetrisboard.cellWidth, tetrisboard.cellHeight);  
    }
  }
  getSkeletonBrick(index){
    return this.skeleton[index];
  }
  getSkeleton(){
    return this.skeleton;
  }
}

class OBlock {
  constructor(){
    this.color = 'yellow';
    this.skeleton = [
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
    ];
  }  
  draw() {
    for (let index = 0; index < this.skeleton.length; index++) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.skeleton[index].playerPixelX, this.skeleton[index].playerPixelY, tetrisboard.cellWidth, tetrisboard.cellHeight); ;  
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
  let skeleton = tetrisBlocks[tetrisBlocks.length-1].getSkeleton(); 

  switch (keyCode) {
    case 39: // right
        //let skeleton = tetrisBlocks[tetrisBlocks.length-1].getSkeleton(); 
        if(skeleton[0].blockIndexX < tetrisboard.columns - 1 &&
           skeleton[1].blockIndexX < tetrisboard.columns - 1 &&
           skeleton[2].blockIndexX < tetrisboard.columns - 1 && 
           skeleton[3].blockIndexX < tetrisboard.columns - 1) {
           for (let index = 0; index < tetrisBlocks[tetrisBlocks.length-1].getSkeleton().length; index++) {  
                skeleton[index].blockIndexX += 1;
                skeleton[index].pixelX += 15;
           }
        } 
    break;
    case 37:  // left
        //let skeleton = tetrisBlocks[tetrisBlocks.length-1].getSkeleton();
        if(skeleton[0].blockIndexX > 0 &&
           skeleton[1].blockIndexX > 0 &&
           skeleton[2].blockIndexX > 0 && 
           skeleton[3].blockIndexX > 0) {
          for (let index = 0; index < tetrisBlocks[tetrisBlocks.length-1].getSkeleton().length; index++) {
            skeleton[index].blockIndexX -= 1;
            skeleton[index].pixelX -= 15;
          }
        }  
    break;
    case 40:  // down
    if(skeleton[0].blockIndexY < tetrisboard.rows - 1 &&
       skeleton[1].blockIndexY < tetrisboard.rows - 1 &&
       skeleton[2].blockIndexY < tetrisboard.rows - 1 && 
       skeleton[3].blockIndexY < tetrisboard.rows - 1) {
       for (let index = 0; index < tetrisBlocks[tetrisBlocks.length-1].getSkeleton().length; index++) {
          let skeleton = tetrisBlocks[tetrisBlocks.length-1].getSkeleton();
          skeleton[index].blockIndexY += 1;
          skeleton[index].pixelY += 20;
       }
    }  
    break;   
  }
}

// update the brick indexes
document.onkeydown = (event) => {
  if (event.keyCode === 38) { // up
    updateTetrisBlockPosition();
  } else if (event.keyCode === 39) { // right
    updateTetrisBlockPosition(39);
    console.log(tetrisBlocks[tetrisBlocks.length-1].skeleton);
  } else if (event.keyCode === 37) { // left
    updateTetrisBlockPosition(37);
    console.log(tetrisBlocks[tetrisBlocks.length-1].skeleton);
  } else if (event.keyCode === 40) { // down
    updateTetrisBlockPosition(40);
    console.log(tetrisBlocks[tetrisBlocks.length-1].skeleton);
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

function clearRow(rowNum) {
  for (let index = 0; index < tetrisboard.grid[rowNum].length; index++) {
      tetrisboard.grid[rowNum][index].containedBlock.pop(); 
  }
}

function checkFilledRow(){
  let filledCellCounter = 0;
  for (let row = 0; row < tetrisboard.rows; row++) {
    for (let column = 0; column < tetrisboard.columns; column++) {
        if (tetrisboard.grid[row][column].containedBlock.length != 0) {
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
tetrisboard.createLogicGrid();
generateTetrisBlocks(); // start with one block generated



console.log(tetrisboard.grid);
console.log(tetrisBlocks);



setInterval(main, 70);

