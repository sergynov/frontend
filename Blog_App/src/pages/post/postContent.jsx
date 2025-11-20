import { Icon } from "../../../components/header/components/icon";
import { SpecialPanel } from "./specialPanel";
import { useNavigate } from "react-router";
import { PROP_TYPE } from '../../../../constants';
import styled from "styled-components"

const PostImg = styled.img`
  float: left;
  margin: 0 20px 10px 0;

`;

const PostContentContainer  = ({className,post:{id,title,imageUrl,publishedAt,content}}) => {

  const navigate = useNavigate()


  return(
    <>
    <div className={className}>
      {imageUrl && <PostImg src={imageUrl} alt={title} />} 
      <h2>{title}</h2>
      <SpecialPanel id={id} publishedAt={publishedAt}  margin="20px 0 20px" 
        editButton={<Icon id="fa fa-pencil-square-o" margin="0 10px" size="19px" onClick={()=>navigate(`/post/${id}/edit`)} />}/>
      <div className="post-text">{content}</div>
    </div>
    </>
  )
}

export const PostContent = styled(PostContentContainer)`
  & .post-text {
    white-space: pre-line;
  }
`;

PostContent.propTypes = {
  post: PROP_TYPE.POST.isRequired
}