const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length !== 0
    ? blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
    : null
}

const mostBlogs = (blogs) => {
  const authorsBlogs = lodash.countBy(blogs, 'author')
  const authorWithMostBlogs = lodash.maxBy(
    Object.keys(authorsBlogs),
    author => authorsBlogs[author]
  )

  return {
    author: authorWithMostBlogs,
    blogs: authorsBlogs[authorWithMostBlogs]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}