const BlogForm = ( props ) => (
  <div>
    <h2>Create a new blog entry</h2>
    <form onSubmit={props.blogSubmitHandler}>
      <div>
        Title:
        <input
          type='text'
          value={props.title}
          name='Title'
          onChange={({ target }) => props.titleHandler(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type='text'
          value={props.author}
          name='Author'
          onChange={({ target}) => props.authorHandler(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          type='text'
          value={props.blogUrl}
          name='Url'
          onChange={({ target }) => props.blogUrlHandler(target.value)}
        />
      </div>
      <button type='submit'>Create</button>
    </form>
  </div>
)

export default BlogForm
