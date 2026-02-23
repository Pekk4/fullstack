const router = require('express').Router();

const { Blog } = require('../models');

const blogFinder = async (req, _, next) => {
  req.blog = await Blog.findByPk(req.params.id);

  if (!req.blog) {
    return res.status(404).end();
  }

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

router.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blogToDelete = await Blog.findByPk(req.params.id);

    if (blogToDelete) {
      await blogToDelete.destroy();

      res.json({ message: 'Blog deleted' });
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
