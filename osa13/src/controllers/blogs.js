const router = require('express').Router();

const { Blog, User } = require('../models');
const { blogFinder, userExtractor } = require('../utils/middleware');

// 13.12 was accidentally done already in 13.10
router.get('/', async (_, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
  });

  res.json(blogs);
});

router.post('/', userExtractor, async (req, res, next) => {
  try {
    const newBlog = await Blog.create({ ...req.body, userId: req.user.id });

    res.json(newBlog);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', blogFinder, userExtractor, async (req, res) => {
  if (req.blog && req.blog.userId === req.user.id) {
    await req.blog.destroy();
  } else {
    return res.status(401).end();
  }

  res.status(204).end();
});

router.put('/:id', blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes;

    await req.blog.save();

    res.json(req.blog);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
