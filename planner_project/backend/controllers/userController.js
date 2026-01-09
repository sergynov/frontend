const bcrypt = require('bcrypt')
const User = require('../models/User')
const {generate} = require('../helpers/token')


const  register = async (login,password) => {
  if(!password) {
    throw new Error('Password is empty')
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({login, password: passwordHash})

  const token = generate({id:user.id})

  return {user,token}
}


const login = async (login,password) => {
  const user = await User.findOne({login})

  if(!user) {
    throw new Error('User not found')
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if(!isPasswordMatch) {
    throw new Error('Wrong passwrod')
  }

  const token = generate({id:user.id})

  return {token, user}
}

const getUsers = () => {
  return User.find()
}


// delete user

const deleteUser = (id) => {
  return User.deleteOne({_id: id})
}

// edit roles

const updateUser = (id, userData) => {
  return User.findByIdAndUpdate(id,userData, {returnDocument: 'after'})
}

module.exports = {
  register, login, getUsers,  deleteUser, updateUser
}