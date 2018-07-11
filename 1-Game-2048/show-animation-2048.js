function showNumberWithAnimation (x, y, number) {
  var numberCell = $('#number-cell-' + x + '-' + y);

  numberCell.css('background-color', getNumberBackgroundColor(number));
  numberCell.css('color', getNumberColor(number));
  numberCell.text(number);

  numberCell.animate({
    'width': cellSideLength,
    'height': cellSideLength,
    'top': getPosTop(x, y),
    'left': getPosLeft(x, y)
  }, 50);
}

function showMoveAnimation(fromX, fromY, toX, toY) {
  var numberCell = $('#number-cell-' + fromX + '-' + fromY);
  numberCell.animate({
    top: getPosTop(toX, toY),
    left: getPosLeft(toX, toY)
  }, 200);
}

function updateScore (score) {
  $('#score').text(score);
}