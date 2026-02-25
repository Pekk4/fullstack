const router = require('express').Router();

const { Blog } = require('../models');
const { blogFinder } = require('../utils/middleware');

router.get('/', async (_, res) => {
  const blogs = await Blog.findAll();

  res.json(blogs);
});

router.post('/', async (req, res, next) => {
  try {
    const newBlog = await Blog.create(req.body);

    res.json(newBlog);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
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
