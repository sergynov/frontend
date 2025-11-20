import { Icon } from "../../../../components";
import { Input } from "../../../../components";
import { SpecialPanel } from "../specialPanel";
import { useLayoutEffect, useRef, useState } from "react";
import { sanitizeContent } from "./utils";
import { useDispatch } from "react-redux";
import { savePostAsync } from "../../../../actions";
import { useNavigate } from "react-router";
import { useServerRequest } from "../../../../hooks";
import { PROP_TYPE } from '../../../../../constants';
import styled from "styled-components"

const PostImg = styled.img`
  float: left;
  margin: 0 20px 10px 0;

`;

const PostFormContainer  = ({className, post:{id,title,imageUrl,publishedAt,content}}) => {

  const [imageUrlValue, setImageUrlValue] = useState(imageUrl)
  const [titleValue, setTitleValue] = useState(title)

  useLayoutEffect(()=>{
    setImageUrlValue(imageUrl)
    setTitleValue(title)
  },[imageUrl,title])

  const dispatch = useDispatch()
  const contentRef = useRef(null)
  const navigate = useNavigate()
  const requestServer = useServerRequest()


  const onSave = () =>{

    const newContent = sanitizeContent(contentRef.current.innerHTML);

    dispatch(savePostAsync(requestServer, {id,imageUrl:imageUrlValue, title:titleValue, content:newContent}))
      .then(({id})=> navigate(`/post/${id}`))
  }
  const onImageChange = ({target}) => setImageUrlValue(target.value)
  const onTitleChange = ({target}) => setTitleValue(target.value)
  return(
    <>
    <div className={className}>
      <Input value={imageUrlValue} placeholder="Image..." onChange={onImageChange} />
      <Input value={titleValue} placeholder="Title..."  onChange={onTitleChange} />
      <SpecialPanel id={id} publishedAt={publishedAt}  margin="20px 0 20px" 
      editButton={
        <Icon id="fa fa-floppy-o" margin="0 10px 0 0" size="19px"  onClick={onSave} />
      } />
      <div ref={contentRef} contentEditable={true} suppressContentEditableWarning={true} className="post-text">{content}</div>
    </div>
    </>
  )
}

export const PostForm = styled(PostFormContainer)`
  & .control-panel {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 20px;
    font-size: 18px;
  }
  & .published-at {
    display: flex;
  }
  & i {
    position: relative;
    top: -1px;
  }
  & .buttons {
    display: flex;
    align-items: center;
  }
  & .post-text {
    white-space: pre-line;
    border: 1px solid black;
  }

`;
PostForm.propTypes = {
  post: PROP_TYPE.POST.isRequired
}