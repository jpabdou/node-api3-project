const express = require('express');
const Posts = require("../posts/posts-model")
const Users = require("./users-model")
const {logger, validateUserId, validatePost, validateUser} = require("../middleware/middleware")


// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', logger, async (req, res,next) => {
  const data = await Users.get()
  try {
    res.status(200).json(data)
  }
  catch {
    next
    }
});

router.get('/:id', validateUserId, async (req, res, next) => {
  const {id} = req.params
  const user = await Users.getById(id)
  try {
    res.status(200).json(req.user)
  }
  catch {
    next
  }
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', validateUser, async (req, res, next) => {
  const {name} = req.body;
  const user = await Users.insert({name})
  try {
    res.status(201).json(user)
  }
  catch {
    next
  }
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  const {id} = req.params
  const {name} = req.body;
  const user = await Users.update(id, {name})
    try {
      res.status(200).json(user)
    }
    catch {
      next
    }
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId,async (req, res, next) => {
  const {id} = req.params
  await Users.remove(id)
  try {
    res.status(200).json(req.user)
  }
  catch {
    next
  }
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  const {id} = req.params
  const posts = await Users.getUserPosts(id)
  try {
    res.status(200).json(posts)
  }
  catch {
    next
  }
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId,validatePost, async (req, res, next) => {
  const {id} = req.params
  const {text} = req.body
  const post = await Posts.insert({user_id: id, text: text})
  try {
    res.status(200).json(post)
  }
  catch {
    next
  }
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((error, req, res, next)=>{
  res.status(error.status || 500).json({message: error.message || "the request failed"})
})

// do not forget to export the router
module.exports = router
