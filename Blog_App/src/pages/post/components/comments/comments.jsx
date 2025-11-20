import { useState } from "react";
import { Icon } from "../../../../components/header/components";
import { Comment } from './components'
import { useDispatch, useSelector } from "react-redux";
import { selectUserId, selectUserRole } from "../../../../selectors";
import { useServerRequest } from "../../../../hooks";
import { addCommentAsync } from "../../../../actions";
import { PROP_TYPE, ROLE } from "../../../../../constants";
import PropTypes from 'prop-types'
import styled from "styled-components"


const CommentField = styled.textarea`
  width: 700px;
  height: 90px;
  resize: none;
  font-size: 18px;

`;


const CommentsContainer = ({className, comments,postId}) =>{
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId)
  const requestServer = useServerRequest()
  const userRole = useSelector(selectUserRole)

  const onNewCommentAdd = (userId,postId,content) => {
      dispatch(addCommentAsync(requestServer,userId,postId,content))
      setNewComment('')
    }
      const isGuest = userRole === ROLE.GUEST

  return(
    <>
    <div className={className}>
      {!isGuest && (
      <div className="new-comment">
        <CommentField name="comment" placeholder="Comment..." value={newComment} onChange={({target})=>setNewComment(target.value)} /> 
        <Icon id="fa fa-paper-plane-o" margin="0 10px"size="17px" onClick={()=>onNewCommentAdd(userId,postId,newComment)} />
      </div>
      )}
      <div className="comments">
        {comments.map(({id,author,content,publishedAt})=>(
          <Comment key={id} postId={postId} id={id} author={author} content={content} publishedAt={publishedAt} />
        ))}
      </div>
    </div>
    </>
  )
}


export const Comments = styled(CommentsContainer)`
  width: 650px;
  margin: 0 auto;

  & .comments {

    display: flex;
    align-items: center;
    flex-direction: column;
  }

  & .new-comment{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 30px auto;
  }
`;
Comments.propTypes = {
  comments: PropTypes.arrayOf(PROP_TYPE.COMMENT),
  postId: PropTypes.string.isRequired
}