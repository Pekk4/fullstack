import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import blogService from './services/blogs';
import loginService from './services/login';
import BlogsList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Modal from './components/Modal';
import './index.css';
import { showModal } from './reducers/modalReducer';
import { fetchBlogs } from './reducers/blogReducer';

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      if (user) {
        window.localStorage.setItem('loggedUser', JSON.stringify(user));
      }

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      dispatch(showModal(`Logged in as '${user.username}'`));
    } catch (error) {
      dispatch(showModal('Wrong username or password!', true));
    }
  };

  const handleLogout = () => {
    const username = user.username;

    window.localStorage.removeItem('loggedUser');
    setUser(null);
    dispatch(showModal(`Logged out '${username}'! Goodbye!`));
  };

  const updateBlog = async (blogBody) => {
    await blogService.update(blogBody);

    dispatch(fetchBlogs());
  };

  const deleteBlog = async (blog) => {
    const confirm = `Remove blog '${blog.title}' by '${blog.author}'?`;

    if (window.confirm(confirm)) {
      const response = await blogService.deleteBlog(blog.id);

      if (response.status === 204) {
        dispatch(fetchBlogs());
        dispatch(showModal(`'${blog.title}' removed succesfully!`));
      }
    }
  };

  const getLoginForm = () => (
    <LoginForm
      username={username}
      usernameHandler={setUsername}
      password={password}
      passwordHandler={setPassword}
      loginHandler={handleLogin}
    />
  );

  const getBlogList = () => (
    <BlogsList
      user={user}
      logoutHandler={handleLogout}
      blogs={blogs}
      likeHandler={updateBlog}
      deleteHandler={deleteBlog}
    />
  );

  return (
    <div>
      <Modal />
      {!user && getLoginForm()}
      {user && getBlogList()}
      <br />
      {user && <BlogForm />}
    </div>
  );
};

export default App;
