export const transformUser = (dbUser) => ({
        id: dbUser.id,
        login: dbUser.login,
        registered_at: dbUser.registered_at,
        roleId: dbUser.role_id,
        password: dbUser.password
})