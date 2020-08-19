function isPosition(x, y, diffX, diffY) {
  return x === diffX && y === diffY
}

function isSnake(snakeCoordinates, x, y) {
  if (!snakeCoordinates.length) { return 0 }

  return snakeCoordinates.filter(coord => isPosition(
      coord.x,
      coord.y,
      x,
      y
    )
  ).length
}

function isSnack(x, y, snack) {
  return isPosition(
    x,
    y,
    snack.coordinate.x,
    snack.coordinate.y
  )
}

export {
  isPosition,
  isSnake,
  isSnack
}