import PropTypes from 'prop-types'
import styled from "styled-components"

const Btn = styled.button`
    font-size: 18px;
    padding: 10px;
    width: ${({width='100%'})=>width};
    cursor: ${({disabled })=> disabled ? 'default' : 'pointer' } ;
  `;

const ButtonContainer = ({children, disabled,className,...props }) => {

  return(
    <>
    <div className={className} {...props} >
      <Btn disabled={disabled}>
        {children}
      </Btn>
    </div>
    </>
  )
}

export const Button = styled(ButtonContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({width='100%'})=>width};
  border: 0.5 solid black;
  
`;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string
}