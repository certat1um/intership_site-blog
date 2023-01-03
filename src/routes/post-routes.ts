import { Router } from 'express';

const router = Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getAddPost,
  getEditPost,
} = require('../controllers/post-controller');

router.get('/posts', getPosts);
router.get('/post/:id', getPost);
router.get('/new-post', getAddPost);
router.get('/edit-post/:id', getEditPost);
router.post('/new-post', createPost);
router.delete('/delete-post/:id', deletePost);
router.put('/edit-post/:id', updatePost);

module.exports = router;
