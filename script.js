import { tetreminoBlockI, tetreminoBlockJ, tetreminoBlockL, tetreminoBlockO } from './tetrisBlocks.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const height = canvas.height;
const width = canvas.width

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

// drawBoard();

// create the Tetromino blocks
// maybe use the boardBlock object to create the tetromino blocks
// tetremino block will be built by multiple boardBlock objects


const drawTerminoBlock = (block) => {
   for (var i = 0; i < block.length; i++) {
     ctx.fillStyle = block[i].color;
     ctx.fillRect(block[i].posX, block[i].posY,
                  block[i].width, block[i].height);
   }
};

drawBoard();
drawTerminoBlock(tetreminoBlockO);

