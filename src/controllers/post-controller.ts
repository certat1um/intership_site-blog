import { Request, Response } from "express";
const uniqid = require('uniqid');
const Post = require('../models/Post');

const createPath = require('../helpers/createPath');
const createValidDate = require('../helpers/createValidDate');

// Get Pages
const getAddPost = (req: Request, res: Response) => {
  const title = 'Add Post';

  res
    .render(createPath('new-post'), { title });
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
    .catch((err: string) => console.log(err));
};

// Get Post Actions
const getPosts = (req: Request, res: Response) => {
  const title = 'Posts';

  Post
    .findAll()
    .then((data: any) => {
      res
        .status(200)
        .render(createPath('posts'), { title, data });
    })
    .catch((err: string) => console.log(err));
};
const getPost = (req: Request, res: Response) => {
  const title = 'Post';

  Post
    .findById(req.params.id)
    .then((data: any) => {
      res
        .status(200)
        .render(createPath('post'), { title, data });
    })
    .catch((err: string) => console.log(err));
};

// Other Post Actions
const createPost = (req: Request, res: Response) => {
  const {
    post_ID = uniqid(),
    post_title,
    post_text,
    author_login = 'johnsmith01',
    post_createdAt = createValidDate(new Date()),
    post_updatedAt = createValidDate(new Date()),
  } = req.body;

  Post
    .create(post_ID, post_title, post_text, author_login, post_createdAt, post_updatedAt)
    .then(() => res.redirect('/posts'))
    .catch((err: string) => console.log(err));
};
const deletePost = (req: Request, res: Response) => {
  Post
    .deleteById(req.params.id)
    .then(() => res.redirect('/posts'))
    .catch((err: string) => console.log(err));
};
const updatePost = (req: Request, res: Response) => {
  req.body.post_ID = req.params.id;
  req.body.post_updatedAt = createValidDate(new Date());
  
  const {
    post_title,
    post_text,
  } = req.body;
  
  Post
    .updateById(req.body)
    .then(() => res.redirect('/posts'))
    .catch((err: string) => console.log(err));
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
