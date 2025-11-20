
export const getRoles = ()=> (
    fetch("http://localhost:3000/roles")
    .then((loadedRoles) => loadedRoles.json())
)