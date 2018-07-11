var board = new Array();
var score = 0;
var hasConflicted = new Array();
/* var numbers = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192]; */
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

$(document).ready(function () {
  prepareForMobile();
  newGame();
});

function prepareForMobile () {
  if (documentWidth > 500) {
    gridContainerWidth = 500;
    cellSpaace = 20;
    cellSideLength = 100;
  }
  /* modify grid container css */
  $('.grid-container').css('width', gridContainerWidth - 2 * cellSpaace);
  $('.grid-container').css('height', gridContainerWidth - 2 * cellSpaace);
  $('.grid-container').css('padding', cellSpaace);
  $('.grid-container').css('border-radius', gridContainerWidth * 0.02);

  /** modify cell css */
  $('.grid-cell').css('width', cellSideLength);
  $('.grid-cell').css('height', cellSideLength);
  $('.grid-cell').css('border-radius', cellSideLength * 0.02);
  
}

function newGame () {
  // initialize borad ui and data
  init();

  // generate numbers in two random cells.
  generateOneNumber();
  generateOneNumber();
}

function init () {
  /* initialize board ui */
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      /* get grid cell by i and j */
      var gridCell = $('#grid-cell-' + i + '-' + j);

      /* get position by i and j and set the css */
      gridCell.css('top', getPosTop(i, j));
      gridCell.css('left', getPosLeft(i, j));
    }
  }

  /* initialize board data */
  for (var i = 0; i < 4; i++) {
    board[i] = new Array();
    hasConflicted[i] = new Array();
    for (var j = 0; j < 4; j++) {
      board[i][j] = 0;
      hasConflicted[i][j] = false;
    }
  }

  /** update ui */
  updateBoardView();

  score = 0;
  $('#gameResult').text("");
  $('#score').text(score)
}

function updateBoardView () {
  $('.number-cell').remove();
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      $('.grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
      var theNumberCell = $('#number-cell-' + i + '-' + j);
      if (board[i][j] === 0) {
        theNumberCell.css('width', '0px');
        theNumberCell.css('height', '0px');
        theNumberCell.css('top', getPosTop(i, j) + (cellSideLength / 2));
        theNumberCell.css('left', getPosLeft(i, j) + (cellSideLength / 2));
      } else {
        theNumberCell.css('width', cellSideLength);
        theNumberCell.css('height', cellSideLength);
        theNumberCell.css('top', getPosTop(i, j));
        theNumberCell.css('left', getPosLeft(i, j));
        theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
        theNumberCell.css('color', getNumberColor(board[i][j]));
        theNumberCell.text(board[i][j]);
      }

      hasConflicted[i][j] = false;
    }
  }
  $('.number-cell').css('line-height', cellSideLength + 'px');
  $('.number-cell').css('font-size', 0.4 * cellSideLength + 'px');
}

function generateOneNumber () {
  if (nospace(board)) {
    return false;
  }
  
  // get a random position
  var x = parseInt(Math.floor(Math.random() * 4));
  var y = parseInt(Math.floor(Math.random() * 4));
  var times = 0;
  while (times < 50) {
    if (board[x][y] === 0) {
      break;
    }

    x = parseInt(Math.floor(Math.random() * 4));
    y = parseInt(Math.floor(Math.random() * 4));
    times ++;
  }

  if (times == 50) {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (board[i][j] == 0) {
          x = i;
          y = j;
        }
      }
    }
  }

  // get a random number
  var randomNum = Math.random() < 0.5 ? 2 : 4;

  board[x][y] = randomNum;

  showNumberWithAnimation(x, y, randomNum);

  return true;
}

$(document).keydown(function (event) {
  event.preventDefault();
  switch (event.keyCode) {
    case 37: //left
      if (moveLeft()) {
        generateNumberAndCheckGameOver();
      }
      break;

    case 38: //up
      if (moveUp()) {
        generateNumberAndCheckGameOver();
      }
      break;

    case 39: //right
      if (moveRight()) {
        generateNumberAndCheckGameOver();
      }
      break;

    case 40: //down
      if (moveDown()) {
        generateNumberAndCheckGameOver();
      }
      break;

    default:
      break;
  }
});

document.addEventListener('touchstart', function (event) {
  startX = event.touches[0].pageX;
  startY = event.touches[0].pageY;
});

document.addEventListener('touchmove', function (event) {
  event.preventDefault();
});

document.addEventListener('touchend', function (event) {
  endX = event.changedTouches[0].pageX;
  endY = event.changedTouches[0].pageY;

  var deltaX = endX - startX;
  var deltaY = endY - startY;

  if ((Math.abs(deltaX) < 0.2 * documentWidth) && (Math.abs(deltaY) < 0.2* documentWidth)) {
    return false;
  }

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // x
    if (deltaX > 0) {
      // right
      if (moveRight()) {
        generateNumberAndCheckGameOver();
      }

    }else {
      // left
      if (moveLeft()) {
        generateNumberAndCheckGameOver();
      }
    }
  } else {
    // y
    if (deltaY > 0) {
      // down
      if (moveDown()) {
        generateNumberAndCheckGameOver();
      }

    } else {
      // up
      if (moveUp()) {
        generateNumberAndCheckGameOver();
      }

    }
  }
});

function generateNumberAndCheckGameOver () {
  setTimeout('generateOneNumber()', 210);
  setTimeout('isGameOver()', 300);
}

function moveLeft () {
  if (!canMoveLeft(board)) {
    return false;
  }

  // move left
  for (var i = 0; i < 4; i++) {
    for (var j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        for (var k = 0; k < j; k++) {
          if ((board[i][k] === 0) && noBlockHorizontal(i, k, j, board)){
            // move
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;

            continue;
          } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
            // move
            showMoveAnimation(i, j, i, k);
            // add
            board[i][k] += board[i][j];
            board[i][j] = 0;
            hasConflicted[i][k] = true;
            // add score
            score += board[i][k];
            updateScore(score);

            continue;
          }
        }
      }
    }
  }

  setTimeout('updateBoardView()', 200);

  return true;
}

function moveRight () {
  // can move right?
  if (!canMoveRight(board)) {
    return false;
  }
  // move right
  for (var i = 0; i < 4; i++) {
    for (var j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        for (var k = 3; k > j; k--) {
          if ((board[i][k] === 0) && noBlockHorizontal(i, j, k, board)) {
            // move
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;

            continue;
          } else if ((board[i][k] === board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k])) {
            // move
            showMoveAnimation(i, j, i, k);
            // add
            board[i][k] += board[i][j];
            board[i][j] = 0;
            hasConflicted[i][k] = true;
            // add score
            score += board[i][k];
            updateScore(score);

            continue;
          }
        }
      }
    }
  }

  setTimeout('updateBoardView()', 200);
  return true;
}

function moveUp () {
  // can move up?
  if (!canMoveUp(board)) {
    return false;
  }
  // move up
  for (var i = 1; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        for (var k = 0; k < i; k++) {
          if ((board[k][j] === 0) && noBlockVirtical(j, k, i, board)) {
            // move
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;

          } else if ((board[k][j] === board[i][j]) && noBlockVirtical(j, k, i, board) && !hasConflicted[k][j]) {
            // move
            showMoveAnimation(i, j, k, j);
            // add
            board[k][j] += board[i][j];
            board[i][j] = 0;
            hasConflicted[k][j] = true;
            // add score
            score += board[k][j];
            updateScore(score);

            continue;
          }
        }
      }
    }
  }

  setTimeout('updateBoardView()', 200);
  return true;
}

function moveDown () {
  // can move down?
  if (!canMoveDown(board)) {
    return false;
  }
  // move down
  for (var i = 2; i >= 0; i--) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        for (var k = 3; k > i; k--) {
          if ((board[k][j] === 0) && noBlockVirtical(j, i, k, board)) {
            // move
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;

          } else if ((board[k][j] === board[i][j]) && noBlockVirtical(j, i, k, board) && !hasConflicted[k][j]) {
            // move 
            showMoveAnimation(i, j, k, j);
            // add
            board[k][j] += board[i][j];
            board[i][j] = 0;
            hasConflicted[k][j] = true;
            // add score
            score += board[k][j];
            updateScore(score);
            continue;
          }
        }
      }
    }
  }

  setTimeout('updateBoardView()', 200);
  return true;
}

function isGameOver () {
  if (nospace(board) && noMove(board)) {
    gameOver();
  }
}

function gameOver () {
  $('#gameResult').text('Game Over!');
}