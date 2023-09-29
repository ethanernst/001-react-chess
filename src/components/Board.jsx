import { useState } from 'react';
import useChessBoard from '../store/useChessboard';

import styled from 'styled-components';

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
  }
`;

const generateBoard = () => {
  const board = [];
  const rowLabels = [8, 7, 6, 5, 4, 3, 2, 1];
  const columnLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  board.push(<th key="topEmpty"></th>);
  board.push(columnLabels.map(label => <th>{label}</th>));
  for (let row = 0; row < 8; row++) {
    const rowTiles = [];
    for (let col = 0; col < 8; col++) {
      const color = (row + col) % 2 === 0 ? 'white' : 'gray';
      rowTiles.push(
        <Tile row={row} column={col} color={color} key={`${row}:${col}`} />
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
  board.push(<th key="bottomEmpty"></th>);
  board.push(columnLabels.map(label => <th>{label}</th>));

  return board;
};

function Board() {
  // const { boardState } = useChessBoard();

  const board = generateBoard();

  // prep for clicking logic
  const handleClick = e => {
    console.log(e.target);
  };

  return (
    <ScBoard onClick={handleClick}>
      <tbody>{board}</tbody>
    </ScBoard>
  );
}

export default Board;
