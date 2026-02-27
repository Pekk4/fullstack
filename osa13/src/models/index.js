const Blog = require('./blog');
const User = require('./user');

User.hasMany(Blog);
Blog.belongsTo(User);

// Moved to utils/db.js
//User.sync({ alter: true });
//Blog.sync({ alter: true });

module.exports = {
  Blog,
  User,
};
