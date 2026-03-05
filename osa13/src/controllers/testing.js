const router = require('express').Router();

const { Blog, User, List, Session } = require('../models');

router.post('/', async (_, res) => {
  await List.destroy({ where: {} });
  await Blog.destroy({ where: {} });
  await Session.destroy({ where: {} });
  await User.destroy({ where: {} });

  res.status(200).end();
});

module.exports = router;
