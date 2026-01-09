const User = require('../models/User')
const { verify } = require("../helpers/token")

module.exports = async function (req,res,next) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).send({ error: 'JWT must be provided' })
  }

  try {
    const tokenData = verify(token)
    const user = await User.findById(tokenData.id)

    if (!user) {
      return res.status(401).send({ error: 'Authenticated user not found' })
    }

    req.user = user
    next()
  } catch (err) {
    return res.status(401).send({ error: 'Invalid token' })
  }

}

/*const tokenData = verify(req.cookies.token)

  const user = await User.findOne({_id: tokenData.id})

  if(!user) {
    res.send({error:'Authenticated User not found'})
    return;
  } 
    
  req.user = user;
  next()*/