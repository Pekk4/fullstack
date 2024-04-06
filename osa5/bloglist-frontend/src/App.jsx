import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogsList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      if (user) {
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
        )
      }

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: blogUrl
    }

    const response = await blogService.create(newBlog)

    setBlogs(blogs.concat(response))
    setTitle('')
    setAuthor('')
    setBlogUrl('')
  }

  const getLoginForm = () => (
    <LoginForm
      username={username}
      usernameHandler={setUsername}
      password={password}
      passwordHandler={setPassword}
      loginHandler={handleLogin}
    />
  )

  const getBlogList = () => (
    <BlogsList
      user={user}
      logoutHandler={handleLogout}
      blogs={blogs}
    />
  )

  const getBlogForm = () => (
    <BlogForm
      title={title}
      titleHandler={setTitle}
      author={author}
      authorHandler={setAuthor}
      blogUrl={blogUrl}
      blogUrlHandler={setBlogUrl}
      blogSubmitHandler={handleBlogSubmit}
    />
  )

  return (
    <div>
      {!user && getLoginForm()}
      {user && getBlogList()}
      <br />
      {user && getBlogForm()}
    </div>
  )
}

export default App