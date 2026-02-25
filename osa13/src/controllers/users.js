const router = require('express').Router();

const { User } = require('../models');

router.get('/', async (_, res) => {
  const users = await User.findAll();

  res.json(users);
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user) {
    user.set(req.body);
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });

    if (user) {
      user.set(req.body);

      await user.save();

      res.json(user);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
