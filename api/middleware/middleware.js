const Posts = require("../posts/posts-model")
const Users = require("../users/users-model") 

function logger(req, res, next) {
  console.log(`you made a ${req.method} request to ${req.url} on ${new Date()}`)
  next()
}

async function validateUserId(req, res, next) {
  const user = await Users.getById(req.params.id)
  if (user) {
    req.user= user
    next()
  } else {
    next({status: 404, message: `User ${req.params.id} not found`})

  }

  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  const {name} = req.body;
  if (name && typeof name === "string" && name.trim().length ) {
    next()
  } else {
    next({status: 400, message: `User entry missing required name`})

  }
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  const {text} = req.body
  if (text && typeof text === "string" && text.trim().length ) {
    next()
  } else {
    next({status: 400, message: `Post entry missing required text`})

  }
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {logger, validatePost, validateUser, validateUserId}
