// updates the context highlightMap with the moves for a given piece
function calculateMoveHelper(
  boardState,
  currentTurn,
  selectedTile,
  setHighlightMap
) {
  const piece = boardState[selectedTile.row][selectedTile.column].piece;

  const moves = [];

  // checks if offsets are out of bounds
  const checkEdges = (rowOffset, columnOffset) => {
    if (
      selectedTile.row + rowOffset < 0 ||
      selectedTile.row + rowOffset > 7 ||
      selectedTile.column + columnOffset < 0 ||
      selectedTile.column + columnOffset > 7
    ) {
      return false;
    }
    return true;
  };

  // adds valid tiles to moves array for pawn moveset
  const checkPawn = (direction, startingPos) => {
    // check 2 tiles in front
    if (
      boardState[selectedTile.row + direction][selectedTile.column].piece ===
      null
    ) {
      moves.push({
        row: selectedTile.row + direction,
        column: selectedTile.column,
      });
      if (
        startingPos &&
        boardState[selectedTile.row + 2 * direction][selectedTile.column]
          .piece === null
      ) {
        moves.push({
          row: selectedTile.row + 2 * direction,
          column: selectedTile.column,
        });
      }
    }
    // check diagonal tiles
    if (
      selectedTile.column - 1 >= 0 &&
      boardState[selectedTile.row + direction][selectedTile.column - 1]
        .piece !== null &&
      boardState[selectedTile.row + direction][selectedTile.column - 1].piece
        .color !== currentTurn
    ) {
      moves.push({
        row: selectedTile.row + direction,
        column: selectedTile.column - 1,
      });
    }
    if (
      selectedTile.column + 1 < 7 &&
      boardState[selectedTile.row + direction][selectedTile.column + 1]
        .piece !== null &&
      boardState[selectedTile.row + direction][selectedTile.column + 1].piece
        .color !== currentTurn
    ) {
      moves.push({
        row: selectedTile.row + direction,
        column: selectedTile.column + 1,
      });
    }
  };

  // adds valid tiles to moves array in a line in a given direction (direction = 'up'||'down'||'left'||'right')
  const checkLine = direction => {
    let rowOffset = direction === 'up' ? -1 : direction === 'down' ? 1 : 0;
    let columnOffset =
      direction === 'left' ? -1 : direction === 'right' ? 1 : 0;
    while (true) {
      // check for board edges
      if (!checkEdges(rowOffset, columnOffset)) {
        break;
      }
      // check for empty tile
      if (
        boardState[selectedTile.row + rowOffset][
          selectedTile.column + columnOffset
        ].piece === null
      ) {
        moves.push({
          row: selectedTile.row + rowOffset,
          column: selectedTile.column + columnOffset,
        });
        if (rowOffset > 0) rowOffset++;
        if (rowOffset < 0) rowOffset--;
        if (columnOffset > 0) columnOffset++;
        if (columnOffset < 0) columnOffset--;
      }
      // check for enemy piece
      else if (
        boardState[selectedTile.row + rowOffset][
          selectedTile.column + columnOffset
        ].piece.color !== currentTurn
      ) {
        moves.push({
          row: selectedTile.row + rowOffset,
          column: selectedTile.column + columnOffset,
        });
        break;
      } else {
        break;
      }
    }
  };

  // adds valid tiles to moves array in a diagonal with a given offset and optional loop break to only run one cycle
  const checkDiagonal = (yOffset, xOffset, loop = true) => {
    let rowOffset = yOffset;
    let columnOffset = xOffset;
    let cycle = 0;
    while (true) {
      // optional break so only one loop is checked
      if (!loop && cycle > 0) {
        break;
      }
      // check for board edges
      if (!checkEdges(rowOffset, columnOffset)) {
        break;
      }
      // check for empty tile
      if (
        boardState[selectedTile.row + rowOffset][
          selectedTile.column + columnOffset
        ].piece === null
      ) {
        moves.push({
          row: selectedTile.row + rowOffset,
          column: selectedTile.column + columnOffset,
        });
        if (rowOffset > 0) rowOffset++;
        if (rowOffset < 0) rowOffset--;
        if (columnOffset > 0) columnOffset++;
        if (columnOffset < 0) columnOffset--;
        cycle++;
      }
      // check for enemy piece
      else if (
        boardState[selectedTile.row + rowOffset][
          selectedTile.column + columnOffset
        ].piece.color !== currentTurn
      ) {
        moves.push({
          row: selectedTile.row + rowOffset,
          column: selectedTile.column + columnOffset,
        });
        break;
      } else {
        break;
      }
    }
  };

  if (piece.type === 'pawn') {
    const direction = currentTurn === 'white' ? -1 : 1;
    const startingPos =
      (currentTurn === 'white' && selectedTile.row === 6) ||
      (currentTurn === 'black' && selectedTile.row === 1);
    checkPawn(direction, startingPos);
  }

  if (piece.type === 'rook') {
    checkLine('up');
    checkLine('down');
    checkLine('left');
    checkLine('right');
  }

  if (piece.type === 'bishop') {
    checkDiagonal(1, 1);
    checkDiagonal(1, -1);
    checkDiagonal(-1, 1);
    checkDiagonal(-1, -1);
  }

  if (piece.type === 'knight') {
    checkDiagonal(1, 2, false);
    checkDiagonal(2, 1, false);
    checkDiagonal(1, -2, false);
    checkDiagonal(2, -1, false);
    checkDiagonal(-1, 2, false);
    checkDiagonal(-2, 1, false);
    checkDiagonal(-1, -2, false);
    checkDiagonal(-2, -1, false);
  }

  if (piece.type === 'queen') {
    checkLine('up');
    checkLine('down');
    checkLine('left');
    checkLine('right');
    checkDiagonal(1, 1);
    checkDiagonal(1, -1);
    checkDiagonal(-1, 1);
    checkDiagonal(-1, -1);
  }

  if (piece.type === 'king') {
    checkDiagonal(1, 1, false);
    checkDiagonal(1, 0, false);
    checkDiagonal(1, -1, false);
    checkDiagonal(0, 1, false);
    checkDiagonal(0, -1, false);
    checkDiagonal(-1, 1, false);
    checkDiagonal(-1, 0, false);
    checkDiagonal(-1, -1, false);
  }

  // if available moves, update highlightMap
  if (moves) {
    setHighlightMap(prev => {
      const updatedHighlightMap = [...prev];

      // loop through moves and update corresponding highlights
      moves.forEach(move => {
        const enemyPiece =
          boardState[move.row][move.column].piece &&
          boardState[move.row][move.column].piece.color !== currentTurn;

        updatedHighlightMap[move.row][move.column] = enemyPiece
          ? 'enemy'
          : 'highlighted';
      });

      updatedHighlightMap[selectedTile.row][selectedTile.column] = 'active';
      return updatedHighlightMap;
    });
  }
}

export default calculateMoveHelper;
