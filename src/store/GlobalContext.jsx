import React, { useState, createContext } from 'react';

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
      row: rowIndex,
      column: currentIndex,
      piece: current,
      highlight: null,
    }))
  );

  const [boardState, setBoardState] = useState(initialBoardState);
  const [selectedTile, setSelectedTile] = useState(null);
  const [currentTurn, setCurrentTurn] = useState('white');
  const [isGameWon, setIsGameWon] = useState(false);

  const handleMove = (row, column) => {
    setSelectedTile(null);
    updateTiles({ row, column });
  };

  const updateTiles = selectedTile => {
    setBoardState(prev => {
      const updatedBoard = [...prev];
      updatedBoard[selectedTile.row][selectedTile.column].highlight = 'active';
      return updatedBoard;
    });
  };

  const handleTileClick = (row, column) => {
    if (selectedTile) {
      handleMove(row, column);
    } else {
      setSelectedTile({ row, column });
      updateTiles({ row, column });
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
