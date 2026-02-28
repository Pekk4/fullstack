const router = require('express').Router();

const { Blog, User } = require('../models');

router.post('/', async (_, res) => {
  await Blog.destroy({ where: {} });
  await User.destroy({ where: {} });

  res.status(200).end();
});

module.exports = router;
