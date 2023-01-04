import { Request, Response } from "express";
const uniqid = require('uniqid');
const Post = require('../models/Post');
const createValidDate = require('../helpers/createValidDate');
const handleAPIError = require('../helpers/handleAPIError');

const getPosts = (req: Request, res: Response) => {
  const title = 'Posts';

  Post.findAll()
    .then((posts: JSON) => res.status(200).json(posts))
    .catch((err: Error) => handleAPIError(res, err));
};

const getPost = (req: Request, res: Response) => {
  const title = 'Post';

  Post
    .findById(req.params.id)
    .then((post: JSON) => res.status(200).json(post))
    .catch((err: Error) => handleAPIError(res, err));
};

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
    .then((post: JSON) => res.status(200).json(post))
    .catch((err: Error) => handleAPIError(res, err));
};

const deletePost = (req: Request, res: Response) => {
  Post
    .deleteById(req.params.id)
    .then((post: JSON) => res.status(200).json(post))
    .catch((err: Error) => handleAPIError(res, err));
};

const updatePost = (req: Request, res: Response) => {
  req.body.post_ID = req.params.id;
  req.body.post_updatedAt = createValidDate(new Date());
  
  Post
    .updateById(req.body)
    .then((post: JSON) => res.status(200).json(post))
    .catch((err: Error) => handleAPIError(res, err));
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
