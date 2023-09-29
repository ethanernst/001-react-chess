import styled from 'styled-components';
import useChessBoard from '../store/useChessboard';

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

function Tile({ row, column, color }) {
  const { getValue } = useChessBoard();

  const cellValue = getValue(row, column);

  return (
    <ScTile color={color}>
      {cellValue && <img src={getPiece(cellValue)} />}
    </ScTile>
  );
}

export default Tile;
