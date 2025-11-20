import styled from "styled-components";
import { Weather } from "./weather";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-left: 112px;
  margin-right: 112px;
  margin-bottom: 10px;
`;

const FooterInfo = styled.div`

.text{
  font-weight: 500;
}
`;
const year = new Date().getFullYear()

const FooterContainer = ({className}) => {
  
  return(
    <>
    <div className={className}>
    <Wrapper>
      <FooterInfo>
        <div className="text">
          Web Developer Blog
        </div>
        <div>Contact: web@developer.com </div>
        <div>{year}</div>
      </FooterInfo>
      <Weather/>
    </Wrapper>
    </div>
    </>

  )
}

export const Footer = styled(FooterContainer)`
    margin-top: auto;
    width: 1300px;
    background-color: white;
    box-shadow: 0 -4px 16px -10px #000;
`;
