import { deleteComment,  getPost } from "../api"
import { ROLE } from "../constants"
import { sessions } from "../sessions"
import { getPostCommentsWithAuthor } from "../utils"

export const removePostComment = async (hash, postId,id) => {
  const accessRoles = [ROLE.ADMIN,ROLE.MODERATOR]
    
  const access = await sessions.access(hash, accessRoles)

        if(!access) {
          return {
            error: 'Access denied',
            res: null
          }
        }

        await deleteComment(id)

    const post = await getPost(postId)
    const commentsWithAuthor = await getPostCommentsWithAuthor(postId)
  
  
      return {
        error: null,
        res: {
          ...post,
          comments: commentsWithAuthor
        }
      }
}