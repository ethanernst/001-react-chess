import styled from 'styled-components';

const ScTile = styled.td`
  width: 75px;
  height: 75px;
  background-color: ${({ color }) => color};
`;

function Tile({ color }) {
  return <ScTile color={color} />;
}

export default Tile;
