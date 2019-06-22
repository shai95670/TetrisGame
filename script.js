// import {
//   tetreminoBlockI,
//   tetreminoBlockJ,
//   tetreminoBlockL,
//   tetreminoBlockO,
//   tetreminoBlockS,
//   tetreminoBlockT,
//   tetreminoBlockZ
// } from './tetrisBlocks.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const HEIGHT = canvas.height;
const WIDTH = canvas.width;
let dx = 2;
let dy = 2;
let currentBlock;

// Game Objects
let boardBlock = {
  color: 'black',
  width: 32,
  height: 32,
  posX: 0,
  posY: 0
};


// let tileMap = {
//     cols: 8,
//     rows: 8,
//     tsize: 64,
//     color: 'black',
//     LogicTileMap: [
//            2, 0, 0, 0, 0, 0, 0, 2,
//            2, 0, 0, 0, 0, 0, 0, 2,
//            2, 0, 0, 0, 0, 0, 0, 2,
//            2, 0, 0, 0, 0, 0, 0, 2,
//            2, 0, 0, 0, 0, 0, 0, 2,
//            2, 0, 0, 0, 0, 0, 0, 2,
//            2, 0, 0, 0, 0, 0, 0, 2,
//            2, 2, 2, 2, 2, 2, 2, 2
//     ],
//     getTile: function (col, row) {
//         return this.tiles[row * map.cols + col];
//     },
//     drawLogicMap: function () {
//       for (var c = 0; c < this.cols; c++) {
//        for (var r = 0; r < this.rows; r++) {
//            var tile = map.getTile(c, r);
//            if (tile !== 0) { // 0 => empty tile
//                ctx.drawImage(
//                    this.color, // image
//                    (tile - 1) * map.tsize, // source x
//                    0, // source y
//                    this.tsize, // source width
//                    this.tsize, // source height
//                    c * this.tsize,  // target x
//                    r * this.tsize, // target y
//                    this.tsize, // target width
//                    this.tsize // target height
//                );
//            }
//        }
//     }
// }

function TetrisBlock(blockList, ) {
  this.blockList = blockList;
  
}

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
}

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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  currentBlock = terminoBlocksArray[Math.floor(Math.random() * terminoBlocksArray.length)];
  for (const miniBlock of currentBlock) {
    ctx.fillStyle = miniBlock.color;
    ctx.fillRect(miniBlock.posX, miniBlock.posY,
                 miniBlock.width, miniBlock.height);
  }
};



// test method to move a block
const floorCollision = () => {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < currentBlock.length; i++) {
    currentBlock[i].posY += dy;
    if (currentBlock[i].posY === 480) { //colided with the bottom border
        dy = 0;
    }
  }
}

const main = () => {
  drawBoard();
  drawTerminoBlock();
  floorCollision();
};

// setInterval(main, 100);
