import { useContext } from 'react';
import GlobalContext from '../store/GlobalContext';

import styled from 'styled-components';

const ScContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: space-around;

  h1 {
    font-size: 4rem;
    margin: 20px;
    color: white;
  }

  p {
    margin: 0 10px;
    display: inline;
  }

  #gamemode-toggle {
    font-family: inherit;
    font-size: 2rem;
    margin: 0px;
    padding: 3px;
  }

  #reset-toggle {
    font-family: inherit;
    font-size: 1.3rem;
  }

  .title {
    height: 100%;
    border-bottom: 5px dotted white;
    text-align: center;
  }

  .settings {
    height: 100%;
    border-bottom: 5px dotted white;
    width: 45%;
    height: 100%;
    text-align: center;
    font-size: 1.5rem;
  }
`;

function ProjectInfo() {
  const { currentTurn, isGameWon, gameType, setGameType, resetBoard } =
    useContext(GlobalContext);

  const handleToggleGamemode = () => {
    setGameType(prev => (prev === 'chess' ? 'checkers' : 'chess'));
  };

  const handleReset = () => {
    resetBoard();
  };

  return (
    <ScContainer>
      <div className="title">
        <h1>react-chess</h1>
        <h2>(and checkers)</h2>
      </div>
      <div className="settings">
        <h2>
          A game of{' '}
          <button id={'gamemode-toggle'} onClick={handleToggleGamemode}>
            {gameType}
          </button>
        </h2>
        {!isGameWon && <p>{currentTurn}'s turn</p>}
        {isGameWon && <p>Winner is {currentTurn}</p>}
        <button id={'reset-toggle'} onClick={handleReset}>
          Reset?
        </button>
      </div>
    </ScContainer>
  );
}

export default ProjectInfo;
