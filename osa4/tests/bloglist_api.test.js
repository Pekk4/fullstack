const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async() => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe.only('Bloglist API', () => {
  test('returns bloglist as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns correct number of blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test.only('returns objects with "id" property', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]

    assert(Object.hasOwn(blog, 'id'))
    assert(!Object.hasOwn(blog, '_id'))
  })
})

after(async () => {
  await mongoose.connection.close()
})