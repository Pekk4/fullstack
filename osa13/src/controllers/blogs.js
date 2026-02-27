const router = require('express').Router();
const { Op } = require('sequelize');

const { Blog, User } = require('../models');
const { blogFinder, userExtractor } = require('../utils/middleware');

router.get('/', async (req, res) => {
  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
      ],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
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
