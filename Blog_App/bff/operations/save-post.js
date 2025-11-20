import { updatePost , addPost} from "../api"
import { ROLE } from "../constants"
import { sessions } from "../sessions"


export  const savePost = async (hash, newPostData) => {

  const accessRoles = [ROLE.ADMIN]
  
  const access = await sessions.access(hash, accessRoles)

        if(!access) {
          return {
            error: 'Access denied',
            res: null
          }
        }

  const savedPost = newPostData.id === '' ? await addPost(newPostData) : await  updatePost(newPostData)

  return {
    error: null,
    res: savedPost
  }
}