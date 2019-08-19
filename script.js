const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const height = canvas.height;
const width = canvas.width;
const scoringBox = document.getElementById("scoreBox");
let tetrisBlocks = [];
let score = 0;

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
    this.columns = 10; //2
    this.rows = 20;    //20
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
  constructor(color, skeleton, mods) {
    this.color = color;
    this.skeleton = skeleton;
    this.mods = mods;
    this.currentModIndex = 0;
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
  flip() {
    console.log("flipping");
  }
}

// can be flliped once
class ZBlock extends TetrisBlock {
  constructor(color, skeleton, mods) {
    super(color, skeleton, mods);
  }
  flip() {
    super.flip();
    // can be flipped back and forth 2
    // mods
    if (this.currentModIndex === this.mods.length) {
      this.currentModIndex = 0;
    }
    switch (
      this.mods[this.currentModIndex] //x = 15, y = 20
    ) {
      case "mode2":
        this.skeleton[0].blockIndexX += 1;
        this.skeleton[1].blockIndexY += 1;
        this.skeleton[2].blockIndexX -= 1;
        this.skeleton[3].blockIndexY += 1;
        this.skeleton[3].blockIndexX -= 2;

        this.skeleton[0].pixelX += 30;
        this.skeleton[1].pixelY += 20;
        this.skeleton[2].pixelX -= 30;
        this.skeleton[3].pixelX -= 60;
        this.skeleton[3].pixelY += 20;
        break;
      case "mode1":
        this.skeleton[0].blockIndexX -= 1;
        this.skeleton[1].blockIndexY -= 1;
        this.skeleton[2].blockIndexX += 1;
        this.skeleton[3].blockIndexX += 2;
        this.skeleton[3].blockIndexY -= 1;

        this.skeleton[0].pixelX -= 30;
        this.skeleton[1].pixelY -= 20;
        this.skeleton[2].pixelX += 30;
        this.skeleton[3].pixelX += 60;
        this.skeleton[3].pixelY -= 20;
        break;
    }
    this.currentModIndex += 1;
  }
}

// cannot be fliped
class OBlock extends TetrisBlock {
  constructor(color, skeleton, mods) {
    super(color, skeleton, mods);
  }
  flip() {
    super.flip();
    // can be flipped back and forth 2
    // mods
    if (this.currentModIndex === this.mods.length) {
      this.currentModIndex = 0;
    }
    switch (this.mods[this.currentModIndex]) {
      case "mode2":
        break;
      case "mode1":
        break;
    }
    this.currentModIndex += 1;
  }
}

// can be flliped once
class SBlock extends TetrisBlock {
  constructor(color, skeleton, mods) {
    super(color, skeleton, mods);
  }
  flip() {
    super.flip();
    // can be flipped back and forth 2
    // mods
    if (this.currentModIndex === this.mods.length) {
      this.currentModIndex = 0;
    }
    switch (this.mods[this.currentModIndex]) {
      case "mode2":
        this.skeleton[0].blockIndexX += 1;
        this.skeleton[1].blockIndexY -= 1;
        this.skeleton[2].blockIndexX -= 1;
        this.skeleton[3].blockIndexY -= 1;
        this.skeleton[3].blockIndexX -= 2;

        this.skeleton[0].pixelX += 30; //15
        this.skeleton[1].pixelY -= 20; //20
        this.skeleton[2].pixelX -= 30; //15
        this.skeleton[3].pixelX -= 60; //30
        this.skeleton[3].pixelY -= 20; //20
        break;
      case "mode1":
        this.skeleton[0].blockIndexX -= 1;
        this.skeleton[1].blockIndexY += 1;
        this.skeleton[2].blockIndexX += 1;
        this.skeleton[3].blockIndexY += 1;
        this.skeleton[3].blockIndexX += 2;

        this.skeleton[0].pixelX -= 30; //15
        this.skeleton[1].pixelY += 20; //20
        this.skeleton[2].pixelX += 30; //15
        this.skeleton[3].pixelX += 60; //30
        this.skeleton[3].pixelY += 20; //20
        break;
    }
    this.currentModIndex += 1;
  }
}

// can be fllipped three times
class TBlock extends TetrisBlock {
  constructor(color, skeleton, mods) {
    super(color, skeleton, mods);
  }
  flip() {
    super.flip();
    // can be flipped back and forth 2
    // mods
    if (this.currentModIndex === this.mods.length) {
      this.currentModIndex = 0;
    }
    switch (this.mods[this.currentModIndex]) {
      case "mode2":
        this.skeleton[0].blockIndexX += 1;
        this.skeleton[0].blockIndexY -= 1;
        this.skeleton[2].blockIndexY += 1;
        this.skeleton[2].blockIndexX -= 1;
        this.skeleton[3].blockIndexY -= 1;
        this.skeleton[3].blockIndexX -= 1;

        this.skeleton[0].pixelX += 30;
        this.skeleton[0].pixelY -= 20;
        this.skeleton[2].pixelY += 20;
        this.skeleton[2].pixelX -= 30;
        this.skeleton[3].pixelX -= 30;
        this.skeleton[3].pixelY -= 20;
        break;
      case "mode3":
        this.skeleton[0].blockIndexX += 1;
        this.skeleton[0].blockIndexY += 1;
        this.skeleton[2].blockIndexY -= 1;
        this.skeleton[2].blockIndexX -= 1;
        this.skeleton[3].blockIndexY -= 1;
        this.skeleton[3].blockIndexX += 1;

        this.skeleton[0].pixelX += 30;
        this.skeleton[0].pixelY += 20;
        this.skeleton[2].pixelY -= 20;
        this.skeleton[2].pixelX -= 30;
        this.skeleton[3].pixelX += 30;
        this.skeleton[3].pixelY -= 20;
        break;
      case "mode4":
        this.skeleton[0].blockIndexX -= 1;
        this.skeleton[0].blockIndexY += 1;
        this.skeleton[2].blockIndexY -= 1;
        this.skeleton[2].blockIndexX += 1;
        this.skeleton[3].blockIndexY += 1;
        this.skeleton[3].blockIndexX += 1;

        this.skeleton[0].pixelX -= 30;
        this.skeleton[0].pixelY += 20;
        this.skeleton[2].pixelY -= 20;
        this.skeleton[2].pixelX += 30;
        this.skeleton[3].pixelX += 30;
        this.skeleton[3].pixelY += 20;
        break;
      case "mode1":
        this.skeleton[0].blockIndexX -= 1;
        this.skeleton[0].blockIndexY -= 1;
        this.skeleton[2].blockIndexY += 1;
        this.skeleton[2].blockIndexX += 1;
        this.skeleton[3].blockIndexY += 1;
        this.skeleton[3].blockIndexX -= 1;

        this.skeleton[0].pixelX -= 30;
        this.skeleton[0].pixelY -= 20;
        this.skeleton[2].pixelY += 20;
        this.skeleton[2].pixelX += 30;
        this.skeleton[3].pixelX -= 30;
        this.skeleton[3].pixelY += 20;
        break;
    }
    this.currentModIndex += 1;
  }
}

// can be flliped once
class IBlock extends TetrisBlock {
  constructor(color, skeleton, mods) {
    super(color, skeleton, mods);
  }
  flip() {
    super.flip();
    // can be flipped back and forth 2
    // mods
    if (this.currentModIndex === this.mods.length) {
      this.currentModIndex = 0;
    }
    switch (this.mods[this.currentModIndex]) {
      case "mode2":
        this.skeleton[0].blockIndexX += 2;
        this.skeleton[0].blockIndexY -= 2;
        this.skeleton[1].blockIndexY -= 1;
        this.skeleton[1].blockIndexX += 1;
        this.skeleton[3].blockIndexY += 1;
        this.skeleton[3].blockIndexX -= 1;

        this.skeleton[0].pixelX += 60;
        this.skeleton[0].pixelY -= 40;
        this.skeleton[1].pixelY -= 20;
        this.skeleton[1].pixelX += 30;
        this.skeleton[3].pixelX -= 30;
        this.skeleton[3].pixelY += 20;
        break;
      case "mode1":
        this.skeleton[0].blockIndexX -= 2;
        this.skeleton[0].blockIndexY += 2;
        this.skeleton[1].blockIndexY += 1;
        this.skeleton[1].blockIndexX -= 1;
        this.skeleton[3].blockIndexY -= 1;
        this.skeleton[3].blockIndexX += 1;

        this.skeleton[0].pixelX -= 60;
        this.skeleton[0].pixelY += 40;
        this.skeleton[1].pixelY += 20;
        this.skeleton[1].pixelX -= 30;
        this.skeleton[3].pixelX += 30;
        this.skeleton[3].pixelY -= 20;
        break;
    }
    this.currentModIndex += 1;
  }
}

// can be fllipped three times
class LBlock extends TetrisBlock {
  constructor(color, skeleton, mods) {
    super(color, skeleton, mods);
  }
  flip() {
    super.flip();
    // can be flipped back and forth 2
    // mods
    if (this.currentModIndex === this.mods.length) {
      this.currentModIndex = 0;
    }
    switch (this.mods[this.currentModIndex]) {
      case "mode2":
        this.skeleton[0].blockIndexX += 2;
        this.skeleton[0].blockIndexY -= 2;
        this.skeleton[1].blockIndexY -= 1;
        this.skeleton[1].blockIndexX += 1;
        this.skeleton[3].blockIndexX += 1;
        this.skeleton[3].blockIndexY += 1;

        this.skeleton[0].pixelX += 60;
        this.skeleton[0].pixelY -= 40;
        this.skeleton[1].pixelY -= 20;
        this.skeleton[1].pixelX += 30;
        this.skeleton[3].pixelY += 20;
        this.skeleton[3].pixelX += 30;
        break;
      case "mode3":
        this.skeleton[0].blockIndexY += 2;
        this.skeleton[0].blockIndexX += 2;
        this.skeleton[1].blockIndexX += 1;
        this.skeleton[1].blockIndexY += 1;
        this.skeleton[3].blockIndexY += 1;
        this.skeleton[3].blockIndexX -= 1;

        this.skeleton[0].pixelY += 40;
        this.skeleton[0].pixelX += 60;
        this.skeleton[1].pixelY += 20;
        this.skeleton[1].pixelX += 30;
        this.skeleton[3].pixelX -= 30;
        this.skeleton[3].pixelY += 20;
        break;
      case "mode4":
        this.skeleton[0].blockIndexY += 2;
        this.skeleton[0].blockIndexX -= 2;
        this.skeleton[1].blockIndexX -= 1;
        this.skeleton[1].blockIndexY += 1;
        this.skeleton[3].blockIndexY -= 1;
        this.skeleton[3].blockIndexX -= 1;

        this.skeleton[0].pixelY += 40;
        this.skeleton[0].pixelX -= 60;
        this.skeleton[1].pixelY += 20;
        this.skeleton[1].pixelX -= 30;
        this.skeleton[3].pixelX -= 30;
        this.skeleton[3].pixelY -= 20;
        break;
      case "mode1":
        this.skeleton[0].blockIndexY -= 2;
        this.skeleton[0].blockIndexX -= 2;
        this.skeleton[1].blockIndexX -= 1;
        this.skeleton[1].blockIndexY -= 1;
        this.skeleton[3].blockIndexY -= 1;
        this.skeleton[3].blockIndexX += 1;

        this.skeleton[0].pixelY -= 40;
        this.skeleton[0].pixelX -= 60;
        this.skeleton[1].pixelY -= 20;
        this.skeleton[1].pixelX -= 30;
        this.skeleton[3].pixelX += 30;
        this.skeleton[3].pixelY -= 20;
        break;
    }
    this.currentModIndex += 1;
  }
}

// can be fllipped three times
class JBlock extends TetrisBlock {
  constructor(color, skeleton, mods) {
    super(color, skeleton, mods);
  }
  flip() {
    super.flip();
    // can be flipped back and forth 2
    // mods
    if (this.currentModIndex === this.mods.length) {
      this.currentModIndex = 0;
    }
    switch (this.mods[this.currentModIndex]) {
      case "mode2":
        this.skeleton[0].blockIndexX += 1;
        this.skeleton[0].blockIndexY -= 1;
        this.skeleton[1].blockIndexY -= 2;
        this.skeleton[2].blockIndexY -= 1;
        this.skeleton[2].blockIndexX -= 1;
        this.skeleton[3].blockIndexX -= 2;

        this.skeleton[0].pixelX += 30;
        this.skeleton[0].pixelY -= 20;
        this.skeleton[1].pixelY -= 40;
        this.skeleton[2].pixelY -= 20;
        this.skeleton[2].pixelX -= 30;
        this.skeleton[3].pixelX -= 60;
        break;
      case "mode3":
        this.skeleton[0].blockIndexY += 1;
        this.skeleton[1].blockIndexX += 1;
        this.skeleton[2].blockIndexY -= 1;
        this.skeleton[3].blockIndexY -= 2;
        this.skeleton[3].blockIndexX -= 1;

        this.skeleton[0].pixelY += 20;
        this.skeleton[1].pixelX += 30;
        this.skeleton[2].pixelY -= 20;
        this.skeleton[3].pixelX -= 30;
        this.skeleton[3].pixelY -= 40;
        break;
      case "mode4":
        this.skeleton[0].blockIndexX -= 1;
        this.skeleton[1].blockIndexY += 1;
        this.skeleton[2].blockIndexX += 1;
        this.skeleton[3].blockIndexY -= 1;
        this.skeleton[3].blockIndexX += 2;

        this.skeleton[0].pixelX -= 30;
        this.skeleton[1].pixelY += 20;
        this.skeleton[2].pixelX += 30;
        this.skeleton[3].pixelX += 60;
        this.skeleton[3].pixelY -= 20;
        break;
      case "mode1":
        this.skeleton[1].blockIndexY += 1;
        this.skeleton[1].blockIndexX -= 1;
        this.skeleton[2].blockIndexY += 2;
        this.skeleton[3].blockIndexX += 1;
        this.skeleton[3].blockIndexY += 3;

        this.skeleton[1].pixelX -= 30;
        this.skeleton[1].pixelY += 20;
        this.skeleton[2].pixelY += 40;
        this.skeleton[3].pixelX += 30;
        this.skeleton[3].pixelY += 60;
        break;
    }
    this.currentModIndex += 1;
  }
}

// update the brick indexes
document.onkeydown = event => {
  let skeleton = tetrisBlocks[tetrisBlocks.length - 1].getSkeleton();
  if (event.keyCode === 38) {
    // up
    tetrisBlocks[tetrisBlocks.length - 1].flip();
    console.log(tetrisBlocks[tetrisBlocks.length - 1]);
  } else if (event.keyCode === 39) {
    // right
    if (
      skeleton[0].blockIndexX < tetrisboard.columns - 1  &&
      skeleton[1].blockIndexX < tetrisboard.columns - 1  &&
      skeleton[2].blockIndexX < tetrisboard.columns - 1  &&
      skeleton[3].blockIndexX < tetrisboard.columns - 1
    ) {
      for (
        let index = 0;
        index < tetrisBlocks[tetrisBlocks.length - 1].getSkeleton().length;
        index++
      ) {
        skeleton[index].blockIndexX += 1;
        skeleton[index].pixelX += 30;
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
        skeleton[index].pixelX -= 30;
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
  } else if (event.keyCode === 38) {
    // up arrow
    //tetrisBlocks[tetrisBlocks.length-1].flip();
  }
};

function getRandomNum(list) {
  return Math.floor(Math.random() * list.length);
}

function generateTetrisBlocks() {
  let constructorList = [
    new SBlock(
      "green",
      [
        {
          blockIndexX: 5, //10
          blockIndexY: 1, //1
          pixelX: tetrisboard.grid[1][5].xPosPixel,
          pixelY: tetrisboard.grid[1][5].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 6, //11
          blockIndexY: 1, //1
          pixelX: tetrisboard.grid[1][6].xPosPixel,
          pixelY: tetrisboard.grid[1][6].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 6, //11
          blockIndexY: 0,  // 0
          pixelX: tetrisboard.grid[0][6].xPosPixel,
          pixelY: tetrisboard.grid[0][6].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 7, //12
          blockIndexY: 0, //0
          pixelX: tetrisboard.grid[0][7].xPosPixel,
          pixelY: tetrisboard.grid[0][7].yPosPixel,
          index: 1
        }
      ],
      ["mode2", "mode1"]
    ),
    new OBlock(
      "yellow",
      [
        {
          blockIndexX: 5,
          blockIndexY: 0,
          pixelX: tetrisboard.grid[0][5].xPosPixel,
          pixelY: tetrisboard.grid[0][5].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 6,
          blockIndexY: 0,
          pixelX: tetrisboard.grid[0][6].xPosPixel,
          pixelY: tetrisboard.grid[0][6].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 5,
          blockIndexY: 1,
          pixelX: tetrisboard.grid[1][5].xPosPixel,
          pixelY: tetrisboard.grid[1][5].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 6,
          blockIndexY: 1,
          pixelX: tetrisboard.grid[1][6].xPosPixel,
          pixelY: tetrisboard.grid[1][6].yPosPixel,
          index: 1
        }
      ],
      ["mode1"]
    ),
    new ZBlock(
      "red",
      [
        {
          blockIndexX: 5,
          blockIndexY: 0,
          pixelX: tetrisboard.grid[0][5].xPosPixel,
          pixelY: tetrisboard.grid[0][5].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 6,
          blockIndexY: 0,
          pixelX: tetrisboard.grid[0][6].xPosPixel,
          pixelY: tetrisboard.grid[0][6].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 6,
          blockIndexY: 1,
          pixelX: tetrisboard.grid[1][6].xPosPixel,
          pixelY: tetrisboard.grid[1][6].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 7,
          blockIndexY: 1,
          pixelX: tetrisboard.grid[1][7].xPosPixel,
          pixelY: tetrisboard.grid[1][7].yPosPixel,
          index: 1
        }
      ],
      ["mode2", "mode1"]
    ),
    new TBlock(
      "purple",
      [
        {
          blockIndexX: 5,
          blockIndexY: 0,
          pixelX: tetrisboard.grid[0][5].xPosPixel,
          pixelY: tetrisboard.grid[0][5].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 6,
          blockIndexY: 0,
          pixelX: tetrisboard.grid[0][6].xPosPixel,
          pixelY: tetrisboard.grid[0][6].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 7,
          blockIndexY: 0,
          pixelX: tetrisboard.grid[0][7].xPosPixel,
          pixelY: tetrisboard.grid[0][7].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 6,
          blockIndexY: 1,
          pixelX: tetrisboard.grid[1][6].xPosPixel,
          pixelY: tetrisboard.grid[1][6].yPosPixel,
          index: 1
        }
      ],
      ["mode2", "mode3", "mode4", "mode1"]
    ),
    new IBlock(
      "Aqua",
      [
        {
          blockIndexX: 5,
          blockIndexY: 0,
          pixelX: tetrisboard.grid[0][5].xPosPixel,
          pixelY: tetrisboard.grid[0][5].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 6,
          blockIndexY: 0,
          pixelX: tetrisboard.grid[0][6].xPosPixel,
          pixelY: tetrisboard.grid[0][6].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 7,
          blockIndexY: 0,
          pixelX: tetrisboard.grid[0][7].xPosPixel,
          pixelY: tetrisboard.grid[0][7].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 8,
          blockIndexY: 0,
          pixelX: tetrisboard.grid[0][8].xPosPixel,
          pixelY: tetrisboard.grid[0][8].yPosPixel,
          index: 1
        }
      ],
      ["mode2", "mode1"]
    ),
    new LBlock(
      "orange",
      [
        {
          blockIndexX: 5,
          blockIndexY: 1,
          pixelX: tetrisboard.grid[1][5].xPosPixel,
          pixelY: tetrisboard.grid[1][5].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 6,
          blockIndexY: 1,
          pixelX: tetrisboard.grid[1][6].xPosPixel,
          pixelY: tetrisboard.grid[1][6].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 7,
          blockIndexY: 1,
          pixelX: tetrisboard.grid[1][7].xPosPixel,
          pixelY: tetrisboard.grid[1][7].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 7,
          blockIndexY: 0,
          pixelX: tetrisboard.grid[0][7].xPosPixel,
          pixelY: tetrisboard.grid[0][7].yPosPixel,
          index: 1
        }
      ],
      ["mode2", "mode3", "mode4", "mode1"]
    ),
    new JBlock(
      "blue",
      [
        {
          blockIndexX: 5,
          blockIndexY: 0,
          pixelX: tetrisboard.grid[0][5].xPosPixel,
          pixelY: tetrisboard.grid[0][5].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 5,
          blockIndexY: 1,
          pixelX: tetrisboard.grid[1][5].xPosPixel,
          pixelY: tetrisboard.grid[1][5].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 6,
          blockIndexY: 1,
          pixelX: tetrisboard.grid[1][6].xPosPixel,
          pixelY: tetrisboard.grid[1][6].yPosPixel,
          index: 1
        },
        {
          blockIndexX: 7,
          blockIndexY: 1,
          pixelX: tetrisboard.grid[1][7].xPosPixel,
          pixelY: tetrisboard.grid[1][7].yPosPixel,
          index: 1
        }
      ],
      ["mode2", "mode3", "mode4", "mode1"]
    )
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
  let rowOfFilledCells = getFilledCells(rowOfCells);

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
  // [{}, {}]
  for (let index = 0; index < tetrisBlocks.length; index++) {
    let currentSkeleton = tetrisBlocks[index].getSkeleton(); //[{}, {}, {}, {}]
    removeSpecificBrick(currentSkeleton, rowOfCells);
  }
}

function incresseYPosBlockList(BlockObject) {
  BlockObject.blockIndexY += 1;
}

function incresseYPixelPosBlockList(BlockObject) {
  BlockObject.pixelY += 20;
}

function incresseYBlockListAttributes(BlockObject) {
  incresseYPosBlockList(BlockObject);
  incresseYPixelPosBlockList(BlockObject);
}

function pushBrickToNextCelll(yPos, xPos, BlockObject) {
  // pop previous cell
  tetrisboard.grid[yPos - 1][xPos].containedBlock.pop();
  // push to the next cell
  if (checkGridInBounds(yPos)) {
    tetrisboard.grid[yPos][xPos].containedBlock.push(BlockObject);
  }
}

function advanceBlockToNextRow(BlockObject, YToDrop) {
  for (let index = 0; index < YToDrop; index++) {
    // let previousYPos = BlockObject.blockIndexY; // 17
    // let previousXPos = BlockObject.blockIndexX; // 11
    incresseYBlockListAttributes(BlockObject);
    pushBrickToNextCelll(
      BlockObject.blockIndexY,
      BlockObject.blockIndexX,
      BlockObject
    );
  }
}

function checkGridInBounds(nextGridYPos) {
  if (nextGridYPos <= 19) {
    return true;
  } else if (nextGridYPos > 19) {
    return false;
  }
}

function hasNoBlockInCell(cellYPos, cellXPos) {
  if (cellYPos > 18) {
    return false;
  }
  return tetrisboard.grid[cellYPos + 1][cellXPos].containedBlock.length === 0;
}

function checkDropConditions(BlockObject, nRowsToDrop) {
  // while (
  //   checkGridInBounds(BlockObject.blockIndexY + 1) &&
  //   hasNoBlockInCell(BlockObject.blockIndexY, BlockObject.blockIndexX)
  // ) {
  advanceBlockToNextRow(BlockObject, nRowsToDrop);
  // }
}

function removeZeroLengthBlocks() {
  for (let index = 0; index < tetrisBlocks.length - 1; index++) {
    if (tetrisBlocks[index].skeleton.length === 0) {
      remove(tetrisBlocks, tetrisBlocks[index]);
    }
  }
}

function getBricksToDrop(upperGrid) {
  let list = [];

  for (let row = upperGrid.length - 1; row >= 0; row--) {
    //loop from the last row upwards
    console.log(row);
    for (let cellIndex = 0; cellIndex < upperGrid[row].length; cellIndex++) {
      if (upperGrid[row][cellIndex].containedBlock.length === 1) {
        list.push(upperGrid[row][cellIndex].containedBlock[0]);
      }
    }
  }

  return list;
}

/*
 Loop through all the tetris blocks in the array,
 untill We reach the last tetris Block,
 Which has still not landed
*/
function dropUpperBlocks(upperGridPortaion, numOfRowsToDrop) {
  console.log(upperGridPortaion);
  let bricksToDrop = getBricksToDrop(upperGridPortaion);
  console.log(bricksToDrop);
  for (let index = bricksToDrop.length - 1; index >= 0; index--) {
    checkDropConditions(bricksToDrop[index], numOfRowsToDrop); // Pass the object itself
  }
}

function compareNumbers(a, b) {
  return a - b;
}

function getLastClearedRow(rows) {
  rows.sort(compareNumbers);
  return rows[0];
}

function checkIfRowFilled(array) {
  let numberOfFilledCells = 0;
  for (let index = 0; index < array.length; index++) {
    if (array[index].containedBlock.length === 1) {
      numberOfFilledCells += 1;
    }
  }

  if (numberOfFilledCells === tetrisboard.columns) {
    return true;
  } else {
    return false;
  }
}

function checkIfRowEmpthy(array) {
  let numberOfEmpthyCells = 0;
  for (let index = 0; index < array.length; index++) {
    if (array[index].containedBlock.length === 0) {
      numberOfEmpthyCells += 1;
    }
  }

  if (numberOfEmpthyCells === tetrisboard.columns) {
    return true;
  } else {
    return false;
  }
}

function addScore(numberOfLinesCleared) {
  switch (numberOfLinesCleared) {
    case 1:
      score += 40;
      break;
    case 2:
      score += 100;
      break;
    case 3:
      score += 300;
      break;
    case 4:
      score += 1200;
      break;
  }
  scoringBox.innerText = "Score: " + score;
}

function checkFilledRow() {
  //change function name
  let rowNumbersCleared = [];
  let numberOfRowsToDrop = undefined;
  let BoundaryRow = undefined;
  let upperGrid = undefined;
  // loop starting from the end of the grid ie index 19
  // if next row has no filled cells stop looping
  for (let row = tetrisboard.rows - 1; row >= 0; row--) {
    //console.log(tetrisboard.grid[row]);
    if (checkIfRowEmpthy(tetrisboard.grid[row])) {
      //19, 18
      break;
    }
    if (checkIfRowFilled(tetrisboard.grid[row])) {
      //19, 18
      rowNumbersCleared.push(row); // [19, 18]
      clearRow(tetrisboard.grid[row]); // [cell*19]
      //We can already assume that all the tetrisBlocks,
      //Prior to the last one have landed and are not,
      //Changing positions any  more
    }
  }
  console.log(upperGrid, numberOfRowsToDrop);
  numberOfRowsToDrop = rowNumbersCleared.length;
  addScore(numberOfRowsToDrop);
  BoundaryRow = getLastClearedRow(rowNumbersCleared); //18
  upperGrid = tetrisboard.grid.slice(0, BoundaryRow); // (0, 18) not including
  // Drop the upper blocks only when clearing of the,
  // lower rows is done
  if (upperGrid !== undefined && BoundaryRow !== undefined) {
    console.log(upperGrid, numberOfRowsToDrop);
    dropUpperBlocks(upperGrid, numberOfRowsToDrop);
  }
}

function drawTetrisBlocks() {
  ctx.globalAlpha = 0.7;
  for (let index = 0; index < tetrisBlocks.length; index++) {
    tetrisBlocks[index].draw();
  }
  ctx.globalAlpha = 1;
}

// loop through the tetrisbricks list,
// for each brick in that list check its skeletons brick x and y positions,
// with each cells x and y pos within the logic grid,
// if the coordinates  match between the current brick being checked and the cell
// push each object with in the bricks skeleton attribute into its equal coord cell
// thus updating the cells with their bricks accordingly
function updateGridWithBlockPositions() {
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
    case "green": // s- block
      if (
        tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
          .containedBlock.length === 1 ||
        tetrisboard.grid[skeleton[1].blockIndexY + 1][skeleton[1].blockIndexX]
          .containedBlock.length === 1 ||
        tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length === 1 ||
        (tetrisboard.grid[skeleton[1].blockIndexY + 1][skeleton[1].blockIndexX]
          .containedBlock.length === 1 ||
          tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
            .containedBlock.length === 1)
      ) {
        return true;
      }
      break;
    case "yellow": // o block
      if (
        tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[2].blockIndexX]
          .containedBlock.length === 1 ||
        tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length === 1
      ) {
        return true;
      }
      break;
    case "red": //ZBlock
      if (
        tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
          .containedBlock.length === 1 ||
        tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[2].blockIndexX]
          .containedBlock.length === 1 ||
        tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length === 1 ||
        (tetrisboard.grid[skeleton[1].blockIndexY + 1][skeleton[1].blockIndexX]
          .containedBlock.length === 1 ||
          tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
            .containedBlock.length === 1)
      ) {
        return true;
      }
      break;
    case "purple": // add all positions TBlock
      if (
        tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
          .containedBlock.length === 1 ||
        tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[2].blockIndexX]
          .containedBlock.length === 1 ||
        tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length === 1 ||
        (tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[2].blockIndexX]
          .containedBlock.length === 1 ||
          tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
            .containedBlock.length === 1) ||
        (tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[2].blockIndexX]
          .containedBlock.length === 1 ||
          tetrisboard.grid[skeleton[1].blockIndexY + 1][skeleton[1].blockIndexX]
            .containedBlock.length === 1 ||
          tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
            .containedBlock.length === 1) ||
        (tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
          .containedBlock.length === 1 ||
          tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
            .containedBlock.length === 1)
      ) {
        return true;
      }
      break;
    case "Aqua": //LBlock
      if (
        tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
          .containedBlock.length === 1 ||
        tetrisboard.grid[skeleton[1].blockIndexY + 1][skeleton[2].blockIndexX]
          .containedBlock.length === 1 ||
        tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length === 1 ||
        tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length === 1 ||
        tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length === 1
      ) {
        return true;
      }
      break;
    case "orange": // LBlock
      if (
        tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
          .containedBlock.length === 1 ||
        tetrisboard.grid[skeleton[1].blockIndexY + 1][skeleton[1].blockIndexX]
          .containedBlock.length === 1 ||
        tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[2].blockIndexX]
          .containedBlock.length === 1 ||
        (tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[2].blockIndexX]
          .containedBlock.length === 1 ||
          tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
            .containedBlock.length === 1) ||
        (tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
          .containedBlock.length === 1 ||
          tetrisboard.grid[skeleton[1].blockIndexY + 1][skeleton[1].blockIndexX]
            .containedBlock.length === 1 ||
          tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
            .containedBlock.length === 1) ||
        (tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
          .containedBlock.length === 1 ||
          tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
            .containedBlock.length === 1)
      ) {
        return true;
      }
      break;
    case "blue": //JBlock
      if (
        tetrisboard.grid[skeleton[1].blockIndexY + 1][skeleton[1].blockIndexX]
          .containedBlock.length === 1 ||
        tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[2].blockIndexX]
          .containedBlock.length === 1 ||
        tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
          .containedBlock.length === 1 ||
        (tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
          .containedBlock.length === 1 ||
          tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
            .containedBlock.length === 1) ||
        (tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
          .containedBlock.length === 1 ||
          tetrisboard.grid[skeleton[2].blockIndexY + 1][skeleton[2].blockIndexX]
            .containedBlock.length === 1 ||
          tetrisboard.grid[skeleton[3].blockIndexY + 1][skeleton[3].blockIndexX]
            .containedBlock.length === 1) ||
        (tetrisboard.grid[skeleton[0].blockIndexY + 1][skeleton[0].blockIndexX]
          .containedBlock.length === 1 ||
          tetrisboard.grid[skeleton[1].blockIndexY + 1][skeleton[1].blockIndexX]
            .containedBlock.length === 1)
      ) {
        return true;
      }
      break;
  }
}

function setInitialScore() {
  scoringBox.innerText = "Score: " + score;
}

function moveCurrentBlock() {
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

const main = () => {
  ctx.clearRect(0, 0, width, height);
  tetrisboard.drawBoard();
  drawTetrisBlocks();
  removeZeroLengthBlocks();

  //moveCurrentBlock();

  // if a brick collides with something on the grid that means that, ie the floor or another brick:
  // 1. we can generate a new tetris brick
  // 2. we can update the grid with the current sate of tetris block
  //   positions with in the grid cells them selfs
  if (checkBrickBottomCollision() || checkBrickOnBrickCollision()) {
    updateGridWithBlockPositions();
    generateTetrisBlocks();
    checkFilledRow();
  }

  //isGameOver();
};

// add block flips - Done
// add Scoring Box - Done
// add end game
// add movingBlocks - Done
// add opacity to the blocks - Done
// reduce number of cells

const tetrisboard = new TetrisBoard();
tetrisboard.createLogicGrid();
console.log(tetrisboard.grid);

generateTetrisBlocks(); // start with one block generated
setInitialScore();

// const movingBlocksInterval = setInterval(moveCurrentBlock, 1000);
// const gameInterval = setInterval(main, 80);
