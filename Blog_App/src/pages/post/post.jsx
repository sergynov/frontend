import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useMatch, useParams} from "react-router";
import { Error } from "../../components";
import { PostContent, Comments , PostForm   } from "./components";
import { useServerRequest } from "../../hooks";
import { loadPostAsync, RESET_POST_DATA } from "../../actions";
import { PrivateContent } from "../../components";
import { selectPost } from "../../selectors";
import styled from "styled-components"
import { ROLE } from "../../../constants";



const PostContainer = ({className}) => {

  const [error,setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const params = useParams()
  const isCreating = useMatch('/post')
  const isEditing = useMatch('/post/:id/edit')
  const requestServer = useServerRequest()
  const post = useSelector(selectPost)


  useLayoutEffect(()=> {
    dispatch(RESET_POST_DATA)
  },[dispatch])

  useEffect(()=>{

    if(isCreating) {
      setIsLoading(false)
      return
    }

    dispatch(loadPostAsync(params.id, requestServer))
      .then((postData)=>{
          setError(postData.error)
          setIsLoading(false)
      })
  },[requestServer,dispatch,params.id ,isCreating])

  if(isLoading) {
    return null;
  }


  const SpecificPostPage = isCreating || isEditing ? (
        <PrivateContent access={[ROLE.ADMIN]} serverError={error}>
          <div className={className}>
            <PostForm post={post}  />
          </div>
        </PrivateContent>
      ) : (
        <div className={className}>
          <PostContent post={ post} />
          <Comments comments={post.comments} postId={post.id} />
        </div>
      ) 

  return(
    
    error ? (<Error error={error} />) :
      SpecificPostPage 

  )
}

export const Post = styled(PostContainer)`
  margin: 40px 0;
  padding: 0 80px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
`;