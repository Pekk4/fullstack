import { useState } from "react"

const Blog = ({ blog }) => {
  const [detailedView, setDetailedView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleView = () => {
    setDetailedView(!detailedView)
  }

  if (!detailedView) {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title}{' '}
          {blog.author}{' '}
          <button onClick={toggleView}>View</button>
        </p>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title}{' '}
          {blog.author}{' '}
          <button onClick={toggleView}>Cancel</button>
          <br />
          {blog.url}
          <br />
          Likes {blog.likes} <button>Like</button>
          <br />
          {blog.user.name}
        </p>
      </div>
    )
  }
}

export default Blog
