import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogsList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Modal from './components/Modal'
import './index.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const modalRef = useRef()

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
      notifyOnChange(`Logged in as '${user.username}'`)
    } catch (error) {
      notifyOnChange('Wrong username or password!', true)
    }
  }

  const handleLogout = () => {
    const username = user.username

    window.localStorage.removeItem('loggedUser')
    setUser(null)
    notifyOnChange(`Logged out '${username}'! Goodbye!`)
  }

  const submitBlog = async (newBlog) => {
    const response = await blogService.create(newBlog)

    setBlogs(blogs.concat(response))
    notifyOnChange(
      `A new blog '${response.title}' by '${response.author}' added!`
    )
  }

  const updateBlog = async (blogBody) => {
    const response = await blogService.update(blogBody)

    setBlogs(blogs.map(blog => blog.id !== response.id ? blog : response))
  }

  const deleteBlog = async blog => {
    const confirm = `Remove blog '${blog.title}' by '${blog.author}'?`

    if (window.confirm(confirm)) {
      const response = await blogService.deleteBlog(blog.id)

      if (response.status === 204) {
        setBlogs(blogs.filter(b => b.id !== blog.id))
        notifyOnChange(`'${blog.title}' removed succesfully!`)
      }
    }
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
      likeHandler={updateBlog}
      deleteHandler={deleteBlog}
    />
  )

  const getBlogForm = () => (
    <Togglable buttonLabel='New blog'>
      <BlogForm
        createBlog={submitBlog}
      />
    </Togglable>
  )

  const notifyOnChange = (message, isError = false) => {
    if (isError) {
      modalRef.current.setStyle(true)
    }

    modalRef.current.setMessage(message)
    setTimeout(
      () => {
        modalRef.current.setMessage(null)
        modalRef.current.setStyle(null)
      },
      3000
    )
  }

  return (
    <div>
      <Modal ref={modalRef} />
      {!user && getLoginForm()}
      {user && getBlogList()}
      <br />
      {user && getBlogForm()}
    </div>
  )
}

export default App
