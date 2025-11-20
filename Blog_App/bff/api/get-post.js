import { transformPost } from "../transformer"

export const getPost = async (postId) => (
    fetch(`http://localhost:3000/posts/${postId}`)
    .then((res)=>{
        if(res.ok) {
            return res;
        }
        
        const error = res.status === 404 
        ? 'Page doesn`t exist'
        : 'Something went wrong. Try again later'

        return Promise.reject(error)
    })
    .then((loadedPost) => loadedPost.json())
    .then((loadedPost) => loadedPost && transformPost(loadedPost))
)