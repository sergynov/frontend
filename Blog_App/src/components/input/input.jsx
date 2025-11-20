import PropTypes from 'prop-types'
import { forwardRef } from "react";
import styled from "styled-components";

  const AuthInput = styled.input`
    height: 50px;
    margin-bottom: 10px;
    margin: 0 0 10px ;
    border: 1px solid black;
    font-size: 17px;
  `;
const InputContainer = forwardRef(({className,width, ...props},ref) => {

  return(
    <>
    <AuthInput className={className} type="text" ref={ref} {...props} />
    </>
  )
})


export const Input = styled(InputContainer)`
    width: ${({width='100%'})=>width};
    height: 50px;
    margin-bottom: 10px;
    margin: 0 0 10px ;
    border: 1px solid black;
    border-radius: ${({ $borderRadius = '0' }) => $borderRadius};
`;

Input.propTypes = {
  width: PropTypes.string,
  $borderRadius: PropTypes.string
}