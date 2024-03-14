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

  test('returns objects with "id" property', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]

    assert(Object.hasOwn(blog, 'id'))
    assert(!Object.hasOwn(blog, '_id'))
  })

  test('saves added blog into bloglist', async () => {
    await Blog.deleteMany({})

    const newBlog = helper.singleBlog()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()

    assert.strictEqual(blogs.length, 1)
    assert.strictEqual(blogs[0].title, newBlog.title)
  })

  test.only('saves blog with 0 likes if property is not given', async () => {
    await Blog.deleteMany({})

    const newBlog = helper.singleBlog()
    delete newBlog.likes

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()

    assert.strictEqual(blogs[0].likes, 0)
    assert.strictEqual(blogs[0].title, newBlog.title)
  })

  test.only('returns 400 if blog title is not given', async () => {
    await Blog.deleteMany({})

    const newBlogNoTitle = {
      author: "Paavo Pesusieni",
      url: "http://example.com"
    }

    await api
      .post('/api/blogs')
      .send(newBlogNoTitle)
      .expect(400)
  })

  test.only('returns 400 if blog URL is not given', async () => {
    await Blog.deleteMany({})

    const newBlogNoUrl = {
      title: "Return of Paavo Pesusieni",
      author: "Paavo Himself",
    }

    await api
      .post('/api/blogs')
      .send(newBlogNoUrl)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})
