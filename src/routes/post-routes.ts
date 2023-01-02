import { Router } from 'express';

const router = Router();
const {
  getPosts,
  getPost,
  getAddPost,
  getEditPost,
} = require('../controllers/post-controller');

router.get('/posts', getPosts);
router.get('/post/:id', getPost);
router.get('/new-post', getAddPost);
router.get('/edit-post', getEditPost);

module.exports = router;
