import { Request, Response } from "express";
import uniqid from 'uniqid';
import { Post } from '../models/Post';
import { createValidDate } from '../helpers/createValidDate';
import { handleAPIError } from '../helpers/handleAPIError';

const getPosts = (req: Request, res: Response) => {
  Post
    .findAll()
    .then((posts: any) => res.status(200).json(posts))
    .catch((err: Error) => handleAPIError(res, err));
};

const getPost = (req: Request, res: Response) => {
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
    .then((post: any) => res.status(200).json(post))
    .catch((err: Error) => handleAPIError(res, err));
};

const deletePost = (req: Request, res: Response) => {
  Post
    .deleteById(req.params.id)
    .then((post: any) => res.status(200).json(post))
    .catch((err: Error) => handleAPIError(res, err));
};

const updatePost = (req: Request, res: Response) => {
  req.body.post_ID = req.params.id;
  req.body.post_updatedAt = createValidDate(new Date());
  
  Post
    .updateById(req.body)
    .then((post: any) => res.status(200).json(post))
    .catch((err: Error) => handleAPIError(res, err));
};

export {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
