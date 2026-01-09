import logo from '../../../../public/icons/logo.png'
import styled from 'styled-components';

const LogoImg = styled.img `
    width:50px;
    height:50px;
    margin-right: 20px;

  `;
export const Logo = () => {
  return(
    <div>
      <LogoImg src={logo} />
    </div>
  )
}