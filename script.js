const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const height = canvas.height;
const width = canvas.width;
let tetrisBlocks = [];

class Cell {
  constructor(xPos, yPos, xPosPixel, yPosPixel, containedBlock, width, height) {
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
  constructor() {
    // 400 blocks
    this.columns = 20;
    this.rows = 20;
    this.color = "black";
    this.cellWidth = width / this.columns;
    this.cellHeight = height / this.rows;
    this.grid = [];
  }

  drawBoard() {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        let cellX = this.cellWidth * column;
        let cellY = this.cellHeight * row;

        ctx.fillStyle = this.color;
        ctx.strokeRect(cellX, cellY, this.cellWidth, this.cellHeight);
      }
    }
  }

  createLogicGrid() {
    for (let row = 0; row < this.rows; row++) {
      this.grid.push([]);
      for (let column = 0; column < this.columns; column++) {
        let cellXPixel = this.cellWidth * column;
        let cellYPixel = this.cellHeight * row;
        this.grid[row].push(
          new Cell(
            column,
            row,
            cellXPixel,
            cellYPixel,
            [],
            this.cellWidth,
            this.cellHeight
          )
        );
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
  constructor(color, skeleton) {
    this.color = color;
    this.skeleton = skeleton;
  }
  draw() {
    for (let index = 0; index < this.skeleton.length; index++) {
      ctx.fillStyle = this.color;
      ctx.fillRect(
        this.skeleton[index].pixelX,
        this.skeleton[index].pixelY,
        tetrisboard.cellWidth,
        tetrisboard.cellHeight,
        0.2
      );
    }
  }
  getSkeletonBrick(index) {
    return this.skeleton[index];
  }
  getSkeleton() {
    return this.skeleton;
  }
}

class ZBlock extends TetrisBlock {
  constructor(color, skeleton) {
    super(color, skeleton);
  }
}

class OBlock extends TetrisBlock {
  constructor(color, skeleton) {
    super(color, skeleton);
  }
}

class SBlock extends TetrisBlock {
  constructor(color, skeleton) {
    super(color, skeleton);
  }
}

class TBlock extends TetrisBlock {
  constructor(color, skeleton) {
    super(color, skeleton);
  }
}

class IBlock extends TetrisBlock {
  constructor(color, skeleton) {
    super(color, skeleton);
  }
}

class LBlock extends TetrisBlock {
  constructor(color, skeleton) {
    super(color, skeleton);
  }
}

class JBlock extends TetrisBlock {
  constructor(color, skeleton) {
    super(color, skeleton);
  }
}

// update the brick indexes
document.onkeydown = event => {
  let skeleton = tetrisBlocks[tetrisBlocks.length - 1].getSkeleton();
  if (event.keyCode === 38) {
    // up
    //updateTetrisBlockPosition();
  } else if (event.keyCode === 39) {
    // right
    if (
      skeleton[0].blockIndexX < tetrisboard.columns - 1 &&
      skeleton[1].blockIndexX < tetrisboard.columns - 1 &&
      skeleton[3].blockIndexX < tetrisboard.columns - 1
    ) {
      for (
        let index = 0;
        index < tetrisBlocks[tetrisBlocks.length - 1].getSkeleton().length;
        index++
      ) {
        skeleton[index].blockIndexX += 1;
        skeleton[index].pixelX += 15;
      }
    }
  } else if (event.keyCode === 37) {
    // left
    if (
      skeleton[0].blockIndexX > 0 &&
      skeleton[1].blockIndexX > 0 &&
      skeleton[2].blockIndexX > 0 &&
      skeleton[3].blockIndexX > 0
    ) {
      for (
        let index = 0;
        index < tetrisBlocks[tetrisBlocks.length - 1].getSkeleton().length;
        index++
      ) {
        skeleton[index].blockIndexX -= 1;
        skeleton[index].pixelX -= 15;
      }
    }
  } else if (event.keyCode === 40) {
    // down
    for (
      let index = 0;
      index < tetrisBlocks[tetrisBlocks.length - 1].getSkeleton().length;
      index++
    ) {
      let skeleton = tetrisBlocks[tetrisBlocks.length - 1].getSkeleton();
      skeleton[index].blockIndexY += 1;
      skeleton[index].pixelY += 20;
    }
  }
};

function getRandomNum(list) {
  return Math.floor(Math.random() * list.length);
}

function generateTetrisBlocks() {
  let constructorList = [
    new SBlock("green", [
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
      }
    ]),
    new OBlock("yellow", [
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
      }
    ]),
    new ZBlock("red", [
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
      }
    ]),
    new TBlock("purple", [
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
        blockIndexX: 12,
        blockIndexY: 0,
        pixelX: tetrisboard.grid[0][12].xPosPixel,
        pixelY: tetrisboard.grid[0][12].yPosPixel,
        index: 1
      },
      {
        blockIndexX: 11,
        blockIndexY: 1,
        pixelX: tetrisboard.grid[1][11].xPosPixel,
        pixelY: tetrisboard.grid[1][11].yPosPixel,
        index: 1
      }
    ]),
    new TBlock("Aqua", [
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
        blockIndexX: 12,
        blockIndexY: 0,
        pixelX: tetrisboard.grid[0][12].xPosPixel,
        pixelY: tetrisboard.grid[0][12].yPosPixel,
        index: 1
      },
      {
        blockIndexX: 13,
        blockIndexY: 0,
        pixelX: tetrisboard.grid[0][13].xPosPixel,
        pixelY: tetrisboard.grid[0][13].yPosPixel,
        index: 1
      }
    ]),
    new TBlock("orange", [
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
        blockIndexX: 12,
        blockIndexY: 0,
        pixelX: tetrisboard.grid[0][12].xPosPixel,
        pixelY: tetrisboard.grid[0][12].yPosPixel,
        index: 1
      },
      {
        blockIndexX: 10,
        blockIndexY: 1,
        pixelX: tetrisboard.grid[1][10].xPosPixel,
        pixelY: tetrisboard.grid[1][10].yPosPixel,
        index: 1
      }
    ]),
    new TBlock("blue", [
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
        blockIndexX: 12,
        blockIndexY: 0,
        pixelX: tetrisboard.grid[0][12].xPosPixel,
        pixelY: tetrisboard.grid[0][12].yPosPixel,
        index: 1
      },
      {
        blockIndexX: 12,
        blockIndexY: 1,
        pixelX: tetrisboard.grid[1][12].xPosPixel,
        pixelY: tetrisboard.grid[1][12].yPosPixel,
        index: 1
      }
    ])
  ];
  let tetrisblock = constructorList[getRandomNum(constructorList)];
  tetrisBlocks.push(tetrisblock);
}

function remove(array, element) {
  let index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  }
}

function getFilledCells(array) {
  let FilledCells = [];
  for (let index = 0; index < array.length; index++) {
    if (array[index].containedBlock.length > 0) {
      FilledCells.push(array[index].containedBlock[0]);
    }
  }
  return FilledCells;
}

// has to also be removed from the grid itself
function removeSpecificBrick(skeleton, rowOfCells) {
  //console.log(rowOfCells);
  let rowOfFilledCells = getFilledCells(rowOfCells);
  //console.log(rowOfFilledCells);

  for (let indexCells = 0; indexCells < rowOfFilledCells.length; indexCells++) {
    for (
      let indexSkeleton = 0;
      indexSkeleton < skeleton.length;
      indexSkeleton++
    ) {
      if (
        rowOfFilledCells[indexCells].blockIndexX ===
          skeleton[indexSkeleton].blockIndexX &&
        rowOfFilledCells[indexCells].blockIndexY ===
          skeleton[indexSkeleton].blockIndexY
      ) {
        // brick contained with in the cleared row
        // remove blocks from block list and from grid
        //cells
        tetrisboard.grid[skeleton[indexSkeleton].blockIndexY][
          skeleton[indexSkeleton].blockIndexX
        ].containedBlock.pop();
        remove(skeleton, skeleton[indexSkeleton]);
      } else {
        continue;
      }
    }
  }
}

function clearRow(rowOfCells) {
  for (let index = 0; index < tetrisBlocks.length; index++) {
    let currentSkeleton = tetrisBlocks[index].getSkeleton();
    removeSpecificBrick(currentSkeleton, rowOfCells);
  }
}

// return true if the row is filled
function checkRow(array) {
  numberOfFilledCells = 0;
  for (let index = 0; index < array.length; index++) {
    if (array[index].containedBlock.length === 1) {
      numberOfFilledCells += 1;
    }
  }

  if (numberOfFilledCells === 4) {
    //tetrisboard.columns
    return true;
  } else {
    return false;
  }
}

function incresseYPosBlockList(BlockObject) {
  BlockObject.blockIndexY += 1;
}

function incresseYPosGridCellBlocks(BlockObject){
  console.log(BlockObject.blockIndexX);
  let yPos = BlockObject.blockIndexY;
  let xPos = BlockObject.blockIndexX;
  tetrisboard.grid[yPos][xPos].containedBlock.pop();
  tetrisboard.grid[yPos + 1][xPos].containedBlock.push(BlockObject);
}

function checkBlocksNextCell(array) {
  for (let index = 0; index < array.length; index++) {
    let yPos = array[index].blockIndexY;
    let xPos = array[index].blockIndexX;
    // incresse Y pos
    if (tetrisboard.grid[yPos + 1][xPos].containedBlock.length === 0) {
      incresseYPosBlockList(array[index]);
      incresseYPosGridCellBlocks(array[index]);
    } else if (tetrisboard.grid[yPos + 1][xPos].containedBlock.length === 1) {
      continue;
    }
  }
}

function dropUpperBlocks() {
  for (let index = 0; index < tetrisBlocks.length-1; index++) {
    checkBlocksNextCell(tetrisBlocks[index].skeleton);
  }
}

function checkFilledRow() {
  let filledCellCounter = 0;
  for (let row = 0; row < tetrisboard.rows; row++) {
    //console.log(tetrisboard.grid[row]);
    if (checkRow(tetrisboard.grid[row])) {
      clearRow(tetrisboard.grid[row]);
      dropUpperBlocks(); 
    } else {
      continue;
    }
  }
}

// draws the tetris blocks from the tetrisBlocks list, we have two data objects for the tetris blocks
// that are colliding, the tetrisBlocks and the grid itself - each cell with in the grid can hold a single,
// tetris block
// bug - the blocks wont be cleard because they are drawn from the list itself and not from the grid cells

function drawTetrisBlocks() {
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
function updateGrid() {
  for (
    let index = 0;
    index < tetrisBlocks[tetrisBlocks.length - 1].getSkeleton().length;
    index++
  ) {
    let currentBrick = tetrisBlocks[tetrisBlocks.length - 1].getSkeletonBrick(
      index
    );
    let currentBrickXIndex = tetrisBlocks[
      tetrisBlocks.length - 1
    ].getSkeletonBrick(index).blockIndexX;
    let currentBrickYIndex = tetrisBlocks[
      tetrisBlocks.length - 1
    ].getSkeletonBrick(index).blockIndexY;

    if (tetrisboard.grid[currentBrickYIndex][currentBrickXIndex]) {
      tetrisboard.grid[currentBrickYIndex][
        currentBrickXIndex
      ].containedBlock.push(currentBrick);
    }
  }
  console.log(tetrisboard.grid[0][0]);
}

function checkBrickBottomCollision() {
  let skeleton = tetrisBlocks[tetrisBlocks.length - 1].getSkeleton();

  // bottom
  // check only the bricks that will collide with the bottom
  if (
    skeleton[0].blockIndexY >= tetrisboard.rows - 1 ||
    skeleton[1].blockIndexY >= tetrisboard.rows - 1 ||
    skeleton[2].blockIndexY >= tetrisboard.rows - 1 ||
    skeleton[3].blockIndexY >= tetrisboard.rows - 1
  ) {
    for (
      let index = 0;
      index < tetrisBlocks[tetrisBlocks.length - 1].getSkeleton().length;
      index++
    ) {
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
function checkBrickOnBrickCollision() {
  let skeleton = tetrisBlocks[tetrisBlocks.length - 1].getSkeleton();

  switch (tetrisBlocks[tetrisBlocks.length - 1].color) {
    case "green":
      if (
        tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
          .containedBlock.length > 0 ||
        tetrisboard.grid[skeleton[1].blockIndexY + 1][skeleton[1].blockIndexX]
          .containedBlock.length > 0 ||
        tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length > 0
      ) {
        return true;
      }
      break;
    case "yellow":
      if (
        tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[2].blockIndexX]
          .containedBlock.length > 0 ||
        tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length > 0
      ) {
        return true;
      }
      break;
    case "red":
      if (
        tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
          .containedBlock.length > 0 ||
        tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[2].blockIndexX]
          .containedBlock.length > 0 ||
        tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length > 0
      ) {
        return true;
      }
      break;
    case "purple":
      if (
        tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
          .containedBlock.length > 0 ||
        tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[2].blockIndexX]
          .containedBlock.length > 0 ||
        tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length > 0
      ) {
        return true;
      }
      break;
    case "Aqua":
      if (
        tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
          .containedBlock.length > 0 ||
        tetrisboard.grid[skeleton[1].blockIndexY + 1][skeleton[2].blockIndexX]
          .containedBlock.length > 0 ||
        tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length > 0 ||
        tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length > 0
      ) {
        return true;
      }
      break;
    case "orange":
      if (
        tetrisboard.grid[skeleton[1].blockIndexY + 1][skeleton[2].blockIndexX]
          .containedBlock.length > 0 ||
        tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length > 0 ||
        tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length > 0
      ) {
        return true;
      }
      break;
    case "blue":
      if (
        tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[2].blockIndexX]
          .containedBlock.length > 0 ||
        tetrisboard.grid[skeleton[1].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length > 0 ||
        tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length > 0
      ) {
        return true;
      }
      break;
  }
}

function moveCurrentBlock() {
   for (let index = 0; index < tetrisBlocks[tetrisBlocks.length-1].getSkeleton().length; index++) {
    let skeleton = tetrisBlocks[tetrisBlocks.length-1].getSkeleton();
    skeleton[index].blockIndexY += 0.5;
    skeleton[index].pixelY += 10;
  }
};

const main = () => {
  ctx.clearRect(0, 0, width, height);
  tetrisboard.drawBoard();
  drawTetrisBlocks();


  //moveCurrentBlock();

  // if a brick collides with something on the grid that means that, ie the floor or another brick:
  // 1. we can generate a new tetris brick
  // 2. we can update the grid with the current sate of tetris block
  //   positions with in the grid cells them selfs
  if (checkBrickBottomCollision() || checkBrickOnBrickCollision()) {
    updateGrid();
    generateTetrisBlocks();
    checkFilledRow();
  }

  //isGameOver();
};

const tetrisboard = new TetrisBoard();
tetrisboard.createLogicGrid();
generateTetrisBlocks(); // start with one block generated

setInterval(main, 80);
