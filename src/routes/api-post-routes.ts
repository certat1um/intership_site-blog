import { Router } from 'express';

const router = Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/api-post-controller');

router.get('/api/posts', getPosts);
router.get('/api/post/:id', getPost);
router.post('/api/new-post', createPost);
router.delete('/api/delete-post/:id', deletePost);
router.put('/api/edit-post/:id', updatePost);

module.exports = router;
