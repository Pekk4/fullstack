const router = require('express').Router();

const List = require('../models/list');

router.get('/', async (_, res) => {
  const lists = await List.findAll({});

  res.json(lists);
});

router.post('/', async (req, res) => {
  if (typeof req.body.userId !== 'number' || typeof req.body.blogId !== 'number') {
    return res.status(400).json({ error: 'userId and blogId must be numbers' });
  } else {
    try {
      const list = await List.create(req.body);

      res.json(list);
    } catch (error) {
      next(error);
    }
  }
});

module.exports = router;
