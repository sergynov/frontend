export const addSession = (hash,user) => {
  fetch("http://localhost:3000/sessions", {
          method: 'POST',
          headers: {'Content-type': 'application/json; charset=utf-8'},
          body: JSON.stringify({
            hash,
            user
          })
        })
}