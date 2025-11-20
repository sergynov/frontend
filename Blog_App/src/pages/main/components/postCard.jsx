import { Link } from "react-router";
import { Icon } from "../../../components";
import PropTypes from 'prop-types'
import styled from "styled-components"

const PostCardContainer = ({className, id, title, imageUrl, publishedAt,  commentsCount}) => {

  return(
    <>
    <div className={className}>
      <Link to={`/post/${id}`}>
      <div>
        <img src={imageUrl} alt={title} />
        <div className="post-card-footer">
          <h4>{title} <Icon inactive={true} id="fa fa-external-link" margin="0 0 -9px 0" size="18px" /></h4>
          <div className="post-card-info">
            <div className="published-at">
              <Icon inactive={true} id="fa fa-calendar-o" margin="0 10px" size="19px" />
              {publishedAt}
            </div>
            <div className="comments-count">
              <Icon inactive={true} id="fa fa-comment-o" margin="0 10px" size="19px" />
              {commentsCount}
              
            </div>
          </div>
        </div>
      </div>
      </Link>
    </div>
    </>
  )
}

export const PostCard = styled(PostCardContainer)`
  display: flex;
  flex-direction: column;
  width: 360px;
  margin: 20px ;

  & h4{
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin:0 0;
    padding: 5px;
  }


  & img {
    display: block;
    width: 100%;
  }

  & .post-card-footer{
    padding: 5px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  & .post-card-info {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
  }
  & .published-at{
    display: flex;
  }
  & .comments-count{
    display: flex;
  }
`;

PostCard.propTypes = {
  id: PropTypes.string.isRequired, 
  title:  PropTypes.string.isRequired, 
  imageUrl:  PropTypes.string.isRequired, 
  publishedAt: PropTypes.string.isRequired,  
  commentsCount:  PropTypes.number.isRequired
}