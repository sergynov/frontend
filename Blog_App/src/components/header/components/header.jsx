import styled from 'styled-components'
import { Logo } from './logo';
import { ButtonBlock } from './buttonBlock';

const Wrapper = styled.div `
  margin-left: 112px;
  margin-right: 112px;
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div `
  display: flex;
  align-items: center;
  font-style: italic;
`;


const HeaderContainer = ({className}) => {

  return (
    <>
    <div className={className}>
      <Wrapper>
        <Logo />
        <Title>
          <p>Web tecnologies <br/>Code writing <br/> Error analytics </p>
        </Title>
      <ButtonBlock className="button-block" />
      </Wrapper>
      </div>
    </>
  )
}

export const Header = styled(HeaderContainer) `
    position: sticky;
    top: 0;
    z-index: 100;
    width: 1300px;
    background-color: white;
    box-shadow: 0 4px 16px -10px #000;
    

`;
