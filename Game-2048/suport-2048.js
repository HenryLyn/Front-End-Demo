var documentWidth = window.screen.availWidth;
var gridContainerWidth = 0.92 * documentWidth;
var cellSideLength = 0.18 * documentWidth;
var cellSpaace = 0.04 * documentWidth;

function getPosTop (i, j) {
  return cellSpaace + i * (cellSideLength + cellSpaace);
}

function getPosLeft (i, j) {
  return cellSpaace + j * (cellSideLength + cellSpaace);
}

function getNumberBackgroundColor (number) {
  switch (number) {
    case 2: return '#eee4da'; break;
    case 4: return '#ede0c8'; break;
    case 8: return '#f2b179'; break;
    case 16: return '#f59563'; break;
    case 32: return '#f67c5f'; break;
    case 64: return '#f65e3b'; break;
    case 128: return '#edcf72'; break;
    case 256: return '#edcc61'; break;
    case 512: return '#9c0'; break;
    case 1024: return '#33b5e5'; break;
    case 2048: return '#09c'; break;
    case 4096: return '#a6c'; break;
    case 8192: return '#93c'; break;
    default: return '#000'; break;
  }
}

function getNumberColor (number) {
  if (number <= 4) {
    return '#776e65';
  } else {
    return '#fff';
  }
} 

function nospace (board) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

function canMoveLeft (board) {
  for (var i = 0; i < 4; i++) {
    for(var j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        if ((board[i][j - 1] === 0) || (board[i][j - 1] === board[i][j])) {
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveUp (board) {
  for (var i = 1; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        if ((board[i - 1][j] === 0) || (board[i - 1][j] === board[i][j])) {
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveRight (board) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j] != 0) {
        if ((board[i][j + 1] === 0) || (board[i][j + 1] === board[i][j])) {
          return true;
        }
      }
    }
  }
  return false;
}

function canMoveDown (board) {
  for (var i = 0; i < 3; i++) {
    for(var j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        if ((board[i + 1][j] === 0) || (board[i + 1][j] === board[i][j])) {
          return true;
        }
      }
    }
  }
  return false;
}

function noBlockHorizontal (row, colBegin, colEnd, board) {
  for (var i = colBegin + 1; i < colEnd; i++) {
    if (board[row][i] != 0) {
      return false;
    }
  }
  return true;
}

function noBlockVirtical (col, rowBegin, rowEnd, board) {
  for (var i = rowBegin + 1; i < rowEnd; i++){
    if (board[i][col] != 0) {
      return false;
    }
  }
  return true;
}

function noMove (board) {
  if (canMoveDown(board) 
    || canMoveLeft(board)
    || canMoveRight(board)
    || canMoveUp(board)) {
    return false;
  }
  return true;
}


/*
function moveHorizontal (row, colBegin, colEnd, board) {
  if ((board[row][colEnd] === 0) && noBlockHorizontal(row, colBegin, colEnd, board)){
    // move
    showMoveAnimation(row, colBegin, row, colEnd);
    board[row][colEnd] = board[row][colBegin];
    board[row][colBegin] = 0;

  } else if (board[row][colEnd] === board[row][colBegin] && noBlockHorizontal(row, colBegin, colEnd, board)) {
    // move
    showMoveAnimation(row, colBegin, row, colEnd);
    // add
    board[row][colEnd] += board[row][colBegin];
    board[row][colBegin] = 0;
  }
}*/