const router = require('express').Router();

const { Blog } = require('../models');

const blogFinder = async (req, _, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (_, res) => {
  const blogs = await Blog.findAll();

  res.json(blogs);
});

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);

    res.json(newBlog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
  }

  res.status(204).json({ message: 'Blog deleted' });
});

module.exports = router;
