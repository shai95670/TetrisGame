import {
  tetreminoBlockI,
  tetreminoBlockJ,
  tetreminoBlockL,
  tetreminoBlockO,
  tetreminoBlockS,
  tetreminoBlockT,
  tetreminoBlockZ
} from './tetrisBlocks.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const width = canvas.width;
let dx = 2;
let dy = 2;
let currentBlock;

// create the tetris board
let boardBlock = {
  color: 'black',
  width: 32,
  height: 32,
  posX: 0,
  posY: 0
};

let tetrisBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const drawBoard = () => {
  for (var index = 0; index < tetrisBoard.length; index++) {
    for (var j = 0; j < tetrisBoard[index].length; j++) {
      if (tetrisBoard[index][j] === 0) {
        ctx.fillStyle = boardBlock.color;
        ctx.fillRect(boardBlock.posX, boardBlock.posY, boardBlock.width, boardBlock.height);
      }
      boardBlock.posX += 32;
    }
    boardBlock.posX = 0;
    boardBlock.posY += 32;
  }
};

// create the Tetromino blocks
// maybe use the boardBlock object to create the tetromino blocks
// tetremino block will be built by multiple boardBlock objects
let terminoBlocksArray = [
  tetreminoBlockI,
  tetreminoBlockJ,
  tetreminoBlockL,
  tetreminoBlockO,
  tetreminoBlockS,
  tetreminoBlockT,
  tetreminoBlockZ
];
// let currentBlock = terminoBlocksArray[Math.floor(Math.random() * terminoBlocksArray.length)];

const drawTerminoBlock = () => {
  currentBlock = terminoBlocksArray[Math.floor(Math.random() * terminoBlocksArray.length)];
  for (var i = 0; i < currentBlock.length; i++) {
    ctx.fillStyle = currentBlock[i].color;
    ctx.fillRect(currentBlock[i].posX, currentBlock[i].posY,
      currentBlock[i].width, currentBlock[i].height);
  }
};



// test method to move a block
const moveTest = () => {
  debugger;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTerminoBlock();
  for (var i = 0; i < currentBlock.length; i++) {
    currentBlock[i].posY += dy;
    if (currentBlock[i].posY === 480) { //colided with the bottom border
        dy = 0;
    }
  }
}

drawBoard();
setInterval(moveTest, 10);
