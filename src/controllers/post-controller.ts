import { Request, Response } from "express";
const uniqid = require('uniqid');
const Post = require('../models/Post');
const createPath = require('../helpers/createPath');
const createValidDate = require('../helpers/createValidDate');
const handleError = require('../helpers/handleError');

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
      console.log(post);
      
      res
        .status(200)
        .render(createPath('post'), { title, post });
    })
    .catch((err: Error) => handleError(res, err));
};

// Other Post Actions
const createPost = (req: Request, res: Response) => {
  const post: any = {
    post_ID: uniqid(),
    author_login: 'johnsmith01',
    post_createdAt: createValidDate(new Date()),
    post_updatedAt: createValidDate(new Date()),
  };

  post.post_title = req.body.post_title;
  post.post_text = req.body.post_text;
  
  Post
    .create(post)
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

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getAddPost,
  getEditPost,
};
