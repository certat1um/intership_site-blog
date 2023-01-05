import { Router } from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/api-post-controller';

export const router = Router();

router.get('/api/posts', getPosts);
router.get('/api/post/:id', getPost);
router.post('/api/new-post', createPost);
router.delete('/api/delete-post/:id', deletePost);
router.put('/api/edit-post/:id', updatePost);
