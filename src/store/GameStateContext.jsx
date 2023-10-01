import React, { useState, createContext, useContext, useMemo } from 'react';

const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const [currentTurn, setCurrentTurn] = useState('white');
  const [isGameWon, setIsGameWon] = useState(false);

  const gameStateValue = useMemo(
    () => ({
      currentTurn,
      setCurrentTurn,
      isGameWon,
      setIsGameWon,
    }),
    [currentTurn, setCurrentTurn, isGameWon, setIsGameWon]
  );

  return (
    <GameStateContext.Provider value={gameStateValue}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => useContext(GameStateContext);
