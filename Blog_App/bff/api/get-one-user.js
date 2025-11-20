import { transformUser } from "../transformer"

export const getOneUser = async (loginToFind) => (
    fetch(`http://localhost:3000/users?login=${loginToFind}`)
    .then((loadedUser) => loadedUser.json())
    .then(([loadedUser]) => loadedUser && transformUser(loadedUser))
)