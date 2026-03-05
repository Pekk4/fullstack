const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('lists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
      },
    });
    await queryInterface.addConstraint('lists', {
      fields: ['user_id', 'blog_id'],
      type: 'unique',
      name: 'unique_user_blog_constraint',
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint('lists', 'unique_user_blog_constraint');
    await queryInterface.dropTable('lists');
  },
};
