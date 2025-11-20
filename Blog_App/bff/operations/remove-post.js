import {deletePost, deleteComment, getComments} from "../api"
import { ROLE } from "../constants"
import { sessions } from "../sessions"

export const removePost = async (hash, id) => {
  const accessRoles = [ROLE.ADMIN]
    
  const access = await sessions.access(hash, accessRoles)

        if(!access) {
          return {
            error: 'Access denied',
            res: null
          }
        }

    await deletePost(id)
    const comments = await getComments(id)
    await Promise.all(comments.map(({id:commentId})=> deleteComment(commentId)))
      return {
        error: null,
        res: true
      }
}