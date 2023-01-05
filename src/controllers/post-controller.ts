import { Request, Response } from "express";
import { createPath } from '../helpers/createPath';
import { createValidDate } from '../helpers/createValidDate';
import { handleError } from '../helpers/handleError';
import { IPost } from '../interfaces/IPost';
import { Post } from '../models/Post';

// Get Pages
const getAddPost = (req: Request, res: Response) => {
  const title = 'Add Post';

  res.render(createPath('new-post'), { title })
};
const getEditPost = (req: Request, res: Response) => {
  const title = 'Edit Post';
  
  Post
    .findById(req.params.id)
    .then((post: any) => {
      res
        .status(200)
        .render(createPath('edit-post'), { title, post });
    })
    .catch((err: Error) => handleError(res, err));
};

// Get Post Actions
const getPosts = (req: Request, res: Response) => {
  const title = 'Posts';

  Post
    .findAll()
    .then((posts: any) => {
      res
        .status(200)
        .render(createPath('posts'), { title, posts });
    })
    .catch((err: Error) => handleError(res, err));
};
const getPost = (req: Request, res: Response) => {
  const title = 'Post';

  Post
    .findById(req.params.id)
    .then((post: any) => {
      res
        .status(200)
        .render(createPath('post'), { title, post });
    })
    .catch((err: Error) => handleError(res, err));
};

// Other Post Actions
const createPost = (req: Request, res: Response) => {
  const {
    post_title,
    post_text,
  }: IPost = req.body;

  Post
    .create(new Post({ post_title, post_text }))
    .then(() => res.redirect('/posts'))
    .catch((err: Error) => handleError(res, err));
};
const deletePost = (req: Request, res: Response) => {
  Post
    .deleteById(req.params.id)
    .then(() => res.redirect('/posts'))
    .catch((err: Error) => handleError(res, err));
};
const updatePost = (req: Request, res: Response) => {
  req.body.post_ID = req.params.id;
  req.body.post_updatedAt = createValidDate(new Date());
  
  Post
    .updateById(req.body)
    .then(() => res.redirect('/posts'))
    .catch((err: Error) => handleError(res, err));
};

export {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getAddPost,
  getEditPost,
};
