const chalk = require('chalk')
const Requests = require('../models/Requests')

async function addRequest (name, phone, description) {

  try{
    await Requests.create({name, phone, description})
    console.log(chalk.green('Request was added'))
  } catch (e) {
    console.log('add error',e)
    throw e
  }
}

async function getRequests () {
  const requests = await Requests.find().sort({ createdAt: -1 })
  return requests
}


module.exports = {
  addRequest, getRequests
}