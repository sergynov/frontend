module.exports = function (user) {
  return {
    id: user._id.toString(),
    login: user.login,
  }
}