import { transformComment } from "../transformer"

const ALL_COMMENTS_URL = 'http://localhost:3000/comments'
const POST_COMMENTS_URL = 'http://localhost:3000/comments?post_id='

export const getComments = (postId)=> {

    const url = postId === undefined ? ALL_COMMENTS_URL : POST_COMMENTS_URL + postId;
    return  fetch(url)
        .then((loadedComments) => loadedComments.json())
        .then ((loadedComments)=> loadedComments.map(transformComment))
}