import styled from 'styled-components';

import { useContext, useEffect } from 'react';
import GlobalContext from '../store/GlobalContext';

import Tile from './Tile';

const ScBoard = styled.table`
  width: auto;
  height: auto;
  background-color: black;

  th {
    height: 40px;
    width: 40px;
    background-color: transparent;
    font-size: 25px;
    pointer-events: none;
  }
`;

const generateBoard = () => {
  console.log('Generating board');

  const board = [];
  const rowLabels = [8, 7, 6, 5, 4, 3, 2, 1];
  const columnLabels = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  // top row of labels
  board.push(
    <tr key={'topLabels'}>
      {columnLabels.map((label, i) => (
        <th key={`topLabel${i}`}>{label}</th>
      ))}
    </tr>
  );

  // board tiles
  for (let row = 0; row < 8; row++) {
    const rowTiles = [];

    for (let col = 0; col < 8; col++) {
      const color = (row + col) % 2 === 0 ? 'white' : 'gray';
      rowTiles.push(
        <Tile row={row} column={col} color={color} key={`${row}${col}`} />
      );
    }

    board.push(
      <tr key={row}>
        <th key={`leftLabel:${row}`}>{rowLabels[row]}</th>
        {...rowTiles}
        <th key={`rightLabel:${row}`}>{rowLabels[row]}</th>
      </tr>
    );
  }

  // bottom row of labels
  board.push(
    <tr key={'bottomLabels'}>
      {columnLabels.map((label, i) => (
        <th key={`topLabel${i}`}>{label}</th>
      ))}
    </tr>
  );

  return board;
};

function Board() {
  const { isGameWon } = useContext(GlobalContext); // for resetting in the future

  const board = generateBoard();

  useEffect(() => {
    board.push();
  }, []);

  return (
    <ScBoard className="noselect">
      <tbody>{board}</tbody>
    </ScBoard>
  );
}

export default Board;
