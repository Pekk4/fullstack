const router = require('express').Router();

const { Session } = require('../models');
const { userExtractor } = require('../utils/middleware');

router.delete('/', userExtractor, async (req, res) => {
  await Session.destroy({
    where: { userId: req.user.id },
  });

  return res.status(204).end();
});

module.exports = router;
