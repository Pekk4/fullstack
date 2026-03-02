const Blog = require('./blog');
const User = require('./user');
const List = require('./list');

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.belongsToMany(User, { through: List, as: 'readers' });
User.belongsToMany(Blog, { through: List, as: 'readings' });

module.exports = {
  Blog,
  User,
  List,
};
