const express = require('express');
const { healthHandler } = require('../handlers/health.handler');

const router = express.Router();
router.get('/', healthHandler);

module.exports = {
  healthRouter: router,
};
