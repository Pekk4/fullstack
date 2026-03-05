const Blog = require('./blog');
const User = require('./user');
const List = require('./list');
const Session = require('./session');

User.hasMany(Blog, { onDelete: 'CASCADE' });
Blog.belongsTo(User, { onDelete: 'CASCADE' });

Blog.belongsToMany(User, { through: List, as: 'readers', onDelete: 'CASCADE' });
User.belongsToMany(Blog, { through: List, as: 'readings', onDelete: 'CASCADE' });

Session.belongsTo(User, { onDelete: 'CASCADE' });
User.hasOne(Session);

module.exports = {
  Blog,
  User,
  List,
  Session,
};
