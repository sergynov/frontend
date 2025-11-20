import PropTypes from 'prop-types'
import styled from "styled-components";


const TableRowContainer = ({children, className}) => {

  return(
    <div className={className} >{children}</div>
  )
}

export const TableRow = styled(TableRowContainer)`
  display: flex;
  align-items: center;

  padding: 10px;

  & > div {
    display: flex;
  }

  & .login-column {
    width: 250px;
  }
  & .date-column {
    width: 170px;
  }
  & .role-column{
    width: auto;
  }
`;
TableRow.propTypes = {
  children: PropTypes.node.isRequired
}