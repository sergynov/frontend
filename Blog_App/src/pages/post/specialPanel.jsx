import PropTypes from 'prop-types'
import { Icon } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useServerRequest } from "../../../hooks";
import { CLOSE_MODAL, openModal, removePostAsync } from "../../../actions";
import { useNavigate } from "react-router";
import { checkAccess } from "../../../utils";
import { ROLE } from "../../../../constants";
import { selectUserRole } from "../../../selectors";
import styled from "styled-components"


const SpecialPanelContainer = ({className, id, publishedAt, editButton}) => {

  const dispatch = useDispatch()
  const requestServer = useServerRequest()
  const navigate = useNavigate()
  const roleId = useSelector(selectUserRole)

  const onPostRemove = (id) => {
      dispatch(openModal({
        text: 'Remove post?',
        onConfirm: () => { dispatch(removePostAsync(requestServer,id))
          .then(()=> {navigate('/')}),
        dispatch(CLOSE_MODAL)
      },
        onCancel: ()=> dispatch(CLOSE_MODAL)
      }))
  }
  const isAdmin = checkAccess([ROLE.ADMIN], roleId)

  return(
    <>
    <div className={className}>
      <div className="control-panel"> 
        <div className="published-at"> 
            {publishedAt && (<Icon id="fa fa-calendar-o" margin="0 10px"size="17px" inactive={true} />)} {publishedAt} </div>
        {isAdmin && (
        <div className="buttons">
            {editButton}
            {publishedAt && (<Icon id="fa fa-trash-o" margin="0 10px"size="19px" onClick={()=>onPostRemove(id)} />)}
        </div>
  )}
      </div>
    </div>
    </>
  )
}

export const SpecialPanel = styled(SpecialPanelContainer)`

  margin: ${({margin})=> margin };
  font-size: 18px;
  & .buttons {
    display: flex;
    align-items: center;
  }
  & .control-panel {
    display: flex;
    justify-content: space-between;
  }
  & .published-at {
    display: flex;
  }
  & i {
    position: relative;
    top: -1px;
  }
`;
SpecialPanel.propTypes = {
  id: PropTypes.string.isRequired,
  publishedAt:PropTypes.string.isRequired,
  editButton: PropTypes.node.isRequired
}