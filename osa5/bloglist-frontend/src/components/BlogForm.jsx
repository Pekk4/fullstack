import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: blogUrl
    })

    setTitle('')
    setAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <h2>Create a new blog entry</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type='text'
            value={blogUrl}
            name='Url'
            onChange={event => setBlogUrl(event.target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm
