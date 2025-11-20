import { authorize, fetchUsers, fetchRoles, register,logout, updateUserRole, removeUser } from "./operations"

const server =  {

  authorize,
  register,
  logout, 
  fetchUsers,
  fetchRoles,
  updateUserRole,
  removeUser
}