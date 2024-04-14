const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (_, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.post('/create', async (_, response) => {
  const testUser = new User({
    username: 'testuser',
    name: 'T. Esti',
    password: '666'
  })
  const savedUser = await testUser.save()
  const testBlog = new Blog({
    title: 'How to deal with bad luck',
    author: 'D. Duck',
    url: 'https://akuankka.fi',
    user: savedUser._id
  })

  await testBlog.save()

  response.status(201).end()
})

module.exports = router
