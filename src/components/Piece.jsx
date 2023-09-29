import styled from 'styled-components';

const ScPiece = styled.img`
  width: 60px;
  height: 60px;
`;

const pieces = [
  { type: 'bishop', color: 'black', url: '../assets/Chess_bdt45.svg' },
  { type: 'bishop', color: 'white', url: '../assets/Chess_blt45.svg' },
  { type: 'king', color: 'black', url: '../assets/Chess_kdt45.svg' },
  { type: 'king', color: 'white', url: '../assets/Chess_klt45.svg' },
  { type: 'knight', color: 'black', url: '../assets/Chess_ndt45.svg' },
  { type: 'knight', color: 'white', url: '../assets/Chess_nlt45.svg' },
  { type: 'pawn', color: 'black', url: '../assets/Chess_pdt45.svg' },
  { type: 'pawn', color: 'white', url: '../assets/Chess_plt45.svg' },
  { type: 'queen', color: 'black', url: '../assets/Chess_qdt45.svg' },
  { type: 'queen', color: 'white', url: '../assets/Chess_qlt45.svg' },
  { type: 'rook', color: 'black', url: '../assets/Chess_rdt45.svg' },
  { type: 'rook', color: 'white', url: '../assets/Chess_rlt45.svg' },
];

function Piece({ type, color }) {
  const imageSrc = pieces.find(
    piece => piece.type === type && piece.color === color
  ).url;

  return <ScPiece src={imageSrc} />;
}

export default Piece;
