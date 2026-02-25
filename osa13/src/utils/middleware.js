const { Blog } = require('../models');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);

  if (!req.blog) {
    return res.status(404).end();
  }

  next();
};

const errorHandler = (error, _, res, next) => {
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  blogFinder,
  errorHandler,
};
