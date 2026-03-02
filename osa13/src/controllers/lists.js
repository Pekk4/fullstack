const router = require('express').Router();

const List = require('../models/list');
const { userExtractor } = require('../utils/middleware');

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

router.put('/:id', userExtractor, async (req, res, next) => {
  try {
    const list = await List.findByPk(req.params.id);

    if (!list) {
      return res.status(404).end();
    }

    if (list.userId !== req.user.id) {
      return res.status(401).end();
    }

    list.read = req.body.read;

    await list.save();

    res.json(list);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
