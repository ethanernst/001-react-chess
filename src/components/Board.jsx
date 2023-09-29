import { useState } from 'react';

import styled from 'styled-components';

import Tile from './Tile';

const ScBoard = styled.table`
  width: auto;
  height: auto;
  background-color: gray;

  th {
    background-color: transparent;
    padding: 10px;
  }
`;

const generateBoard = () => {
  const board = [];
  const rowLabels = [8, 7, 6, 5, 4, 3, 2, 1];
  const columnLabels = ['H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];

  board.push(<th></th>);
  board.push(columnLabels.map(label => <th>{label}</th>));
  for (let row = 0; row < 8; row++) {
    const rowTiles = [];
    for (let col = 0; col < 8; col++) {
      const color = (row + col) % 2 === 0 ? 'white' : 'black';
      rowTiles.push(<Tile key={`${row}:${col}`} color={color} />);
    }
    board.push(
      <tr key={row}>
        <th>{rowLabels[row]}</th>
        {...rowTiles}
        <th>{rowLabels[row]}</th>
      </tr>
    );
  }
  board.push(<th></th>);
  board.push(columnLabels.map(label => <th>{label}</th>));

  return board;
};

function Board() {
  // const [activeTile, setActiveTile] = useState(null);

  const board = generateBoard();

  return (
    <ScBoard>
      <tbody>{board}</tbody>
    </ScBoard>
  );
}

export default Board;
