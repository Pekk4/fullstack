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
    const emailError = error.errors.find((e) => e.path === 'username');

    if (emailError?.validatorKey === 'isEmail') {
      //console.log(emailError.message);
      return res.status(400).json({ error: "username must be a valid email address" });
    } else {
      return res.status(400).json({ error: error.message });
    }
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    const emailError = error.errors.find((e) => e.path === 'username');

    if (emailError) {
      return res.status(400).json({ error: "username must be a valid email address" });
    } else {
      return res.status(400).json({ error: error.message });
    }
  } else if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  blogFinder,
  errorHandler,
};
