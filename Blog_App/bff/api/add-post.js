
import { generateDate } from "../utils/generateDate"

export const addPost = ({imageUrl, title, content}) => 
    fetch("http://localhost:3000/posts", {
        method: 'POST',
        headers: {'Content-type': 'application/json; charset=utf-8'},
        body: JSON.stringify({
          image_url: imageUrl,
          title,
          published_at: generateDate(),
          content
        })
      }).then((createdPost)=> createdPost.json() )
