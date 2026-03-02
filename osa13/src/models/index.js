const Blog = require('./blog');
const User = require('./user');
const List = require('./list');

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.belongsToMany(User, { through: 'lists' });
User.belongsToMany(Blog, { through: 'lists' });

module.exports = {
  Blog,
  User,
  List,
};
