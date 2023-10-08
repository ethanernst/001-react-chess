import styled from 'styled-components';

import Board from './components/Board';
import ProjectInfo from './components/ProjectInfo';

const Main = styled.div`
  width: 100vw;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Footer = styled.div`
  width: 100vw;
  height: min-content;
  text-align: center;
`;

const license =
  'Chess Piece Assets: Cburnett, CC BY-SA 3.0 <http://creativecommons.org/licenses/by-sa/3.0/>, via Wikimedia Commons';

function App() {
  return (
    <>
      <ProjectInfo />
      <Main>
        <Board />
      </Main>
      <Footer>
        <p>{license}</p>
      </Footer>
    </>
  );
}

export default App;
