import React, { useState, createContext, useEffect } from 'react';
import calculateMoveHelper from './calculateMoveHelper';

const initialPieces = [
  [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' },
  ],
  [
    { type: 'pawn', color: 'black' },
    { type: 'pawn', color: 'black' },
    { type: 'pawn', color: 'black' },
    { type: 'pawn', color: 'black' },
    { type: 'pawn', color: 'black' },
    { type: 'pawn', color: 'black' },
    { type: 'pawn', color: 'black' },
    { type: 'pawn', color: 'black' },
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    { type: 'pawn', color: 'white' },
    { type: 'pawn', color: 'white' },
    { type: 'pawn', color: 'white' },
    { type: 'pawn', color: 'white' },
    { type: 'pawn', color: 'white' },
    { type: 'pawn', color: 'white' },
    { type: 'pawn', color: 'white' },
    { type: 'pawn', color: 'white' },
  ],
  [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' },
  ],
];

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const initialBoardState = initialPieces.map((row, rowIndex) =>
    row.map((current, currentIndex) => ({
      // id: `${rowIndex}${currentIndex}`,
      row: rowIndex,
      column: currentIndex,
      piece: current,
      highlight: null,
    }))
  );

  const emptyHighlightMap = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  const [boardState, setBoardState] = useState(initialBoardState);
  const [highlightMap, setHighlightMap] = useState(emptyHighlightMap);
  const [selectedTile, setSelectedTile] = useState(null);
  const [currentTurn, setCurrentTurn] = useState('white');
  const [isGameWon, setIsGameWon] = useState(false);

  // effect that watches the highlight map and updates the board with new highlights when it changes
  useEffect(() => {
    console.log('current board state:', boardState);
    console.log('current selectedTile:', selectedTile);
    console.log('current highlight state:', highlightMap);
    setBoardState(prev => {
      const updatedBoard = [];

      prev.forEach((row, rowIndex) => {
        const rowTiles = [];
        row.forEach((tile, tileIndex) => {
          rowTiles.push({
            ...tile,
            highlight: highlightMap[rowIndex][tileIndex],
          });
        });
        updatedBoard.push(rowTiles);
      });

      if (selectedTile)
        updatedBoard[selectedTile.row][selectedTile.column].highlight =
          'active';
      console.log('updated board state:', updatedBoard);
      console.log('==========turn end==========');
      console.log('');
      return updatedBoard;
    });
  }, [highlightMap]);

  // moves piece from coord to coord
  const movePiece = (from, to) => {
    console.log(from, to);
    setBoardState(prev => {
      const selectedPiece = prev[from.row][from.column].piece;

      const updatedBoardState = prev.map(prevRow =>
        prevRow.map(tile => {
          if (tile.row === from.row && tile.column === from.column) {
            return { ...tile, piece: null };
          } else if (tile.row === to.row && tile.column === to.column) {
            return { ...tile, piece: selectedPiece };
          } else {
            return tile;
          }
        })
      );

      console.log(updatedBoardState);
      return updatedBoardState;
    });
    setHighlightMap(emptyHighlightMap);
  };

  // checks if the new selected tile is a valid move for the highlited piece
  const validateMove = (row, column) => {
    const selectedTile = boardState[row][column];
    return (
      selectedTile.highlight === 'highlighted' ||
      selectedTile.highlight === 'enemy'
    );
  };

  // main logic handler for tile click
  const handleTileClick = (row, column) => {
    const newSelectedTile = boardState[row][column];
    console.log(`currently selected tile: ${JSON.stringify(selectedTile)}`);
    console.log(`new selected tile: ${JSON.stringify(newSelectedTile)}`);

    // if there is a currently selected tile
    if (selectedTile) {
      // checks if selected tile is already selected and does nothing
      if (selectedTile.row === row && selectedTile.column === column) {
        console.log('selected tile is already selected, doing nothing');
        console.log('==========turn end==========');
        console.log('');
        return;
      }

      console.log('a tile is already selected, validating move');
      // checks if the selected tile is a valid move for the current piece
      const validMove = validateMove(row, column);
      console.log(`is valid move: ${validMove}`);

      if (validMove) {
        // valid: move piece, update score and captures pieces, reset selected piece, switch move, update board
        movePiece(selectedTile, { row, column });
        setSelectedTile(null);
        setCurrentTurn(prev => (prev === 'white' ? 'black' : 'white'));
      } else {
        // invalid: check if selected piece is the same as the turn
        console.log('checking if piece can be selected this turn');

        if (newSelectedTile?.piece?.color === currentTurn) {
          // set selected piece to new piece, get moves for tile, updateboard
          console.log('piece can be selected, changing selection');

          setSelectedTile({ row, column });
          setHighlightMap(emptyHighlightMap);
          calculateMoveHelper(
            boardState,
            currentTurn,
            { row, column },
            setHighlightMap
          );
        } else {
          // reset highlights, reset selected tile, update board
          console.log('piece is empty or invalid, resetting highlights');

          setSelectedTile(null);
          setHighlightMap(emptyHighlightMap);
        }
      }
    }
    // if there NOT a currently selected tile
    else {
      console.log('no selected tile, selecting new tile');
      const newTile = boardState[row][column];
      console.log(newTile);

      if (newTile?.piece && newTile.piece.color === currentTurn) {
        // valid selection, set selectedTile, getMoves for tile, updateBoard
        console.log('selection is valid');

        setSelectedTile({ row, column });
        calculateMoveHelper(
          boardState,
          currentTurn,
          { row, column },
          setHighlightMap
        );
      } else {
        console.log('invalid selection, doing nothing');
        console.log('==========turn end==========');
        console.log('');
      }
    }
  };

  const globalStateValue = {
    boardState,
    setBoardState,
    selectedTile,
    setSelectedTile,
    currentTurn,
    setCurrentTurn,
    isGameWon,
    setIsGameWon,
    handleTileClick,
  };

  return (
    <GlobalContext.Provider value={globalStateValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
