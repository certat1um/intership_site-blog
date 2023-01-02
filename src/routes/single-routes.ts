import express from 'express';

const router = express.Router();
const {
  getHomepage,
  getContactsPage,
} = require('../controllers/single-controller');

router.get('/', getHomepage);

router.get('/contacts', getContactsPage);

module.exports = router;
