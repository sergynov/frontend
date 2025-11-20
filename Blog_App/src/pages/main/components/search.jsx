import styled from "styled-components"
import { Icon } from "../../../components";
import { Input } from "../../../components";
import PropTypes from 'prop-types'

const SearchContainer = ({className, searchPhrase, onChange}) => {

  return(
    <>
    <div className={className}>
      <Input $borderRadius="15px" value={searchPhrase} placeholder="Search..." onChange={onChange} />
      <Icon id="fa fa-search" margin="0 0"size="21px" inactive={true} />
    </div>
    </>
  )
}

export const Search = styled(SearchContainer)`
  display: flex;
  position: relative;
  margin: 40px auto 0;
  width: 340px;
  height: 40px;
  border-radius: 15px;

  & > input{
    padding: 10px 32px 10px 10px;
  }

  & > div {
    position: absolute;
    right: 9px;
    top:14px

  }
`;

Search.propTypes = {
  searchPhrase:  PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}