import express from 'express';

const router = express.Router();
const { getErrorPage } = require('../controllers/error-controller');

router.use(getErrorPage);

module.exports = router;
