const Blog = require('./blog');
const User = require('./user');
const List = require('./list');
const Session = require('./session');

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.belongsToMany(User, { through: List, as: 'readers' });
User.belongsToMany(Blog, { through: List, as: 'readings' });

Session.belongsTo(User);
User.hasOne(Session);

module.exports = {
  Blog,
  User,
  List,
  Session,
};
