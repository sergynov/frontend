import styled from 'styled-components'
import logo from '../../../../public/icons/logo_icon.png'
import { Link } from 'react-router';
import { BackButton } from './backButton';

const LogoImg = styled.img `
    width:50px;
    height:50px;
    margin-right: 20px;

  `;
  const LogoWrapper = styled.div `
  display:flex;
  justify-content: center;
  align-items: center;
  `;
  const LogoTextContainer = styled.div ``;

  const LogoText = styled.div `
    font-weight: 700;
    font-size: 25px;
    display: flex;
    flex-direction: column;
  `;

const LogoContainer = ({className}) => {

  return(
      <Link to="/" className={className}>
      <LogoWrapper  >
        <BackButton className="back-button" /> 
        <LogoImg src={logo}></LogoImg>
        <LogoTextContainer>
        <LogoText>Web</LogoText>
        <LogoText>Developer</LogoText>
        <LogoText>Blog</LogoText>
        </LogoTextContainer>
      </LogoWrapper>
      </Link>
    )
}

export const Logo = styled(LogoContainer) `

`;

{/*    const location = useLocation();
    const showBackButton = ["/login", "/register", "/users", "/blog", "/project", "/about"].includes(location.pathname); */}