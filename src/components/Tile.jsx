import { useContext } from 'react';
import GlobalContext from '../store/GlobalContext';

import styled from 'styled-components';

import blackRook from '../assets/Chess_rdt45.svg';
import blackBishop from '../assets/Chess_bdt45.svg';
import blackKnight from '../assets/Chess_ndt45.svg';
import blackQueen from '../assets/Chess_qdt45.svg';
import blackKing from '../assets/Chess_kdt45.svg';
import blackPawn from '../assets/Chess_pdt45.svg';

import whiteRook from '../assets/Chess_rlt45.svg';
import whiteBishop from '../assets/Chess_blt45.svg';
import whiteKnight from '../assets/Chess_nlt45.svg';
import whiteQueen from '../assets/Chess_qlt45.svg';
import whiteKing from '../assets/Chess_klt45.svg';
import whitePawn from '../assets/Chess_plt45.svg';

const ScTile = styled.td`
  width: 75px;
  height: 75px;
  text-align: center;
  background-color: ${({ color }) => color};

  img {
    width: 65px;
    height: 65px;
    pointer-events: none;
  }
`;

const pieces = [
  { type: 'rook', color: 'black', url: blackRook },
  { type: 'bishop', color: 'black', url: blackBishop },
  { type: 'knight', color: 'black', url: blackKnight },
  { type: 'queen', color: 'black', url: blackQueen },
  { type: 'king', color: 'black', url: blackKing },
  { type: 'pawn', color: 'black', url: blackPawn },
  { type: 'rook', color: 'white', url: whiteRook },
  { type: 'bishop', color: 'white', url: whiteBishop },
  { type: 'knight', color: 'white', url: whiteKnight },
  { type: 'queen', color: 'white', url: whiteQueen },
  { type: 'king', color: 'white', url: whiteKing },
  { type: 'pawn', color: 'white', url: whitePawn },
];

const getPiece = value => {
  return pieces.find(
    piece => piece.type === value.type && piece.color === value.color
  ).url;
};

const getColor = highlight => {
  switch (highlight) {
    case 'active':
      return 'blue';
    case 'highlighted':
      return 'skyblue';
    case 'enemy':
      return 'lightcoral';
  }
};

function Tile({ row, column }) {
  const { boardState, handleTileClick } = useContext(GlobalContext);

  const tile = boardState[row][column];

  const piece = tile.piece;
  const tileColor = tile.highlight
    ? getColor(tile.highlight)
    : (row + column) % 2 === 0
    ? 'white'
    : 'gray';

  const handleClick = () => {
    handleTileClick(row, column);
  };

  return (
    <ScTile onClick={handleClick} color={tileColor}>
      {piece && <img src={getPiece(piece)} />}
    </ScTile>
  );
}

export default Tile;
