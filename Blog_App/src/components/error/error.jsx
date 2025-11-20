import PropTypes from 'prop-types'
import { PROP_TYPE } from '../../../constants';
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 18px;
`;

export const Error = ({ error}) => {

  return(
    error && (<>
    <Div>
      <h2>Error</h2>
      <div>{error}</div>
      </Div>
    </>)
  )
}

Error.propTypes = {
  error: PROP_TYPE.ERROR
}