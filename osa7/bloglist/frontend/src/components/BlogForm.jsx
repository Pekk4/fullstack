import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: title,
      author: author,
      url: blogUrl,
    });

    setTitle('');
    setAuthor('');
    setBlogUrl('');
  };

  return (
    <div>
      <h2>Create a new blog entry</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            data-testid="blog-title"
            type="text"
            value={title}
            name="Title"
            placeholder="Input title here"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            data-testid="blog-author"
            type="text"
            value={author}
            name="Author"
            placeholder="Input author here"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          URL:
          <input
            data-testid="blog-url"
            type="text"
            value={blogUrl}
            name="Url"
            placeholder="Input URL here"
            onChange={(event) => setBlogUrl(event.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
