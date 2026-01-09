import styled from "styled-components";
import { forwardRef } from "react";

const AuthInput = styled.input`
    height: 50px;
    margin-bottom: 10px;
    margin: 0 0 10px ;
    border: 1px solid black;
    font-size: 17px;
    border-radius: 5px;
  `;

const InputContainer = forwardRef(({className, ...props},ref) => {

  return(
    <AuthInput className={className} type="text" ref={ref} {...props}  />
  )
})

export const Input = styled(InputContainer)`
margin: ${({ $margin }) => $margin || 0};
`;
