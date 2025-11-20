import {  useEffect, useMemo, useState } from "react";
import { useServerRequest } from "../../hooks";
import { PostCard, Pagination, Search } from "./components";
import { PAGINATION_LIMIT } from "../../../constants";
import { getLastPageFromLinks, debounce } from "./utils";
import styled from "styled-components"

const MainPageContainer = ({className}) => {

  const requestServer = useServerRequest()
  const [page,setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [posts,setPosts] = useState([])
  const [searchPhrase, setSearchPhrase] = useState('')
  const [shouldSearch, setShouldSearch] = useState(false)

  useEffect (()=>{
      requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT)
        .then(( {res:{posts,links} })=> {
          setPosts(posts)
          setLastPage(getLastPageFromLinks(links))
        })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[requestServer, page,shouldSearch])

  const startDelayedSearch = useMemo(()=> debounce(setShouldSearch,2000),[])

  const onSearch = ({target}) => {
    setSearchPhrase(target.value)
    startDelayedSearch(!shouldSearch)
  }

  return(
    <>
    <div className={className}>
      <div className="search-bar">
        <Search searchPhrase={searchPhrase} onChange={onSearch} />
      </div>

      { posts.length ?
      <div className="post-list">
        {posts.map(({id, title, publishedAt, imageUrl, commentsCount}) => 
          <PostCard key={id} id={id} title={title} publishedAt={publishedAt} commentsCount={commentsCount} imageUrl={imageUrl} />)}
      </div>
      : <div className="posts-error">No posts found</div> }

      <div className="pagination">
        {lastPage > 1 && (
          <Pagination lastPage={lastPage} setPage={setPage} page={page}  /> )}
      </div>
      
    </div>
    </>
  )
}

export const MainPage = styled(MainPageContainer)`
  & .post-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px 20px 80px;
  }
  & .posts-error{
    font-size: 20px;
    margin-top: 40px;
    text-align: center;
  }
`;