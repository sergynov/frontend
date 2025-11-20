import styled from "styled-components";
import PropTypes from 'prop-types'

const IconContainer = ({className, id, inactive, ...props}) => (
  <div className={className} {...props}>
    <i className={`fa ${id}`} aria-hidden="true" ></i>
  </div>
)
export const Icon = styled(IconContainer) `
    font-size: ${(props) => props.size};
    margin: ${(props)=> props.margin};
    display: flex;
    align-items: center;
    color: ${({disabled})=> disabled ? ' #ccc' : '#000'};
    cursor: ${({inactive})=>(inactive ? 'default' : 'pointer' )};
`;

Icon.propTypes = {
  id: PropTypes.string,
  inactive: PropTypes.bool
}