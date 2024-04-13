import { useState } from 'react'

const Blog = ({ blog, likeHandler, deleteHandler, user }) => {
  const [detailedView, setDetailedView] = useState(false)
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    margin: 5
  }

  const toggleView = () => {
    setDetailedView(!detailedView)
  }

  const addLike = () => {
    const blogBody = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1
    }

    likeHandler(blogBody)
  }

  const deleteBlog = blog => {
    deleteHandler(blog)
  }

  if (!detailedView) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={toggleView}>View</button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}{' '}
          <button onClick={toggleView}>Hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          Likes {blog.likes}{' '}
          <button onClick={addLike}>Like</button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.username === user.username &&
          <button onClick={() => {deleteBlog(blog)}}>Remove</button>
        }
      </div>
    )
  }
}

export default Blog
