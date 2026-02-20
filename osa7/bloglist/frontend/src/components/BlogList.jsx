import PropTypes from 'prop-types';

import Blog from './Blog';

const BlogsList = ({ user, logoutHandler, blogs }) => (
  <div>
    <h2>Blogs</h2>
    <p>
      {user.username} logged in <button onClick={logoutHandler}>logout</button>
    </p>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} user={user} />
    ))}
  </div>
);

BlogsList.propTypes = {
  user: PropTypes.object.isRequired,
  logoutHandler: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
};

export default BlogsList;
