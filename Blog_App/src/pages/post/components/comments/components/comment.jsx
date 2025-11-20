import styled from "styled-components"
import PropTypes from 'prop-types'
import { Icon } from "../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { removeCommentAsync, openModal, CLOSE_MODAL } from "../../../../../actions";
import { useServerRequest } from "../../../../../hooks";
import { ROLE } from "../../../../../../constants";
import { selectUserRole } from "../../../../../selectors";
import { checkAccess } from "../../../../../utils";


const CommentContainer = ({className, id, postId, author, publishedAt, content}) => {
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const roleId = useSelector(selectUserRole)
  
  const onCommentRemove = (id) => {
    dispatch(openModal({
      text: 'Remove comment?',
      onConfirm: () => dispatch(removeCommentAsync(requestServer,postId,id),dispatch(CLOSE_MODAL)),
      onCancel: ()=> dispatch(CLOSE_MODAL)
    }))
      }

      const isAdminorModerator = checkAccess([ROLE.ADMIN,ROLE.MODERATOR], roleId)

  return(
    <>
    <div className={className}>
      <div className="comment-1">
      <div className="info-panel">
        <div className="author">
          <Icon id="fa fa-user-circle-o" margin="0 10px"size="17px" inactive={true}/>
          {author}
        </div>
        <div className="published-at">
          <Icon id="fa fa-calendar-o" margin="0 10px"size="17px" inactive={true} />
          {publishedAt}
        </div>
      </div>
      <div className="comment-text">
        {content}
      </div>
      </div>
      {isAdminorModerator &&  ( <Icon id="fa fa-trash-o" margin="0 0 0 11px"size="17px" onClick={()=>onCommentRemove(id)} /> )}
    </div>
    </>
  )
}

export const Comment = styled(CommentContainer)`
  width: 650px;
  display: flex;
  align-items: center;
  margin-top: 10px;

  & .comment-1 {
    width: 613px;
    border: 1px solid black;
    padding: 5px 10px;
  }
  & .info-panel {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    font-size: 16px;
  }
  & .author {
    display: flex;
  }
  & .published-at {
    display: flex;
  }
  & .comment-text{
    padding: 5px;
  }
`;

Comment.propTypes = {
  id: PropTypes.number.isRequired, 
  author: PropTypes.string.isRequired, 
  publishedAt: PropTypes.string.isRequired, 
  content: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired
}