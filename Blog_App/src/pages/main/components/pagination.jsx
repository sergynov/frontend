import PropTypes from 'prop-types'
import { Button } from "../../../components";
import styled from "styled-components"

const PaginationContainer = ({className,page, lastPage, setPage }) => {

  return(
    <>
    <div className={className}>
      <div className="btn-box">
        <Button disabled={page===1} onClick={()=>setPage(1)} >{"<<"}</Button>
        <Button disabled={page===1} onClick={()=>setPage(page - 1)} >Previous</Button>
        <div className='current-page' >Page: {page}</div>
        <Button disabled={page===lastPage} onClick={()=>setPage(page + 1)} >Next</Button>
        <Button disabled={page===lastPage} onClick={()=>setPage(lastPage)} >{">>"}</Button>

      </div>
    </div>
    </>
  )
}

export const Pagination = styled(PaginationContainer)`

  & .current-page {
    border: 1px solid black;
    width: 100%;
    font-weight: 500;
    line-height: 41px;
    margin: 0 10px;
    
  }
  & .btn-box {
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 15px 0;
    padding: 0 20px;
    position: absolute;
    width: 100%;
    bottom: 100px;
  }
  & Button {
    width: 100%;
    margin: 0 20px;
  }
`;

Pagination.propTypes = {
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired
}