import { transformPost } from "../transformer";

export const getPosts = (searchPhrase,page,limit)=> (
  fetch(`http://localhost:3000/posts?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`)
    .then((loadedPosts) => 
        Promise.all([loadedPosts.json(), loadedPosts.headers.get('Link')]))

    .then(([loadedPosts,links])=> ({
      posts: loadedPosts && loadedPosts.map(transformPost),
      links,
  }))
)