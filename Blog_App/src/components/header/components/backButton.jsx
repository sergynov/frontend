import styled from 'styled-components'
import { useNavigate } from 'react-router';

  const Back = styled.button `
    font-size: 25px;
    margin-right: 20px;
    background-color: white;
    cursor: pointer;

    div{
      font-size: 15px;
      line-height: 15px;
    }
`;

const BackButtonContainer = ({className}) => {
  
  const navigate = useNavigate();
  
  return(
  <div className={className}>
    <Back onClick={()=>navigate(-1)}>
        <i className="fa fa-arrow-left" aria-hidden="true"></i>
        {/*<div>Back</div>*/}
    </Back>
  </div>
  )
}

export const BackButton = styled(BackButtonContainer)`

`;