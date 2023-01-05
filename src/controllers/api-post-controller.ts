import { Request, Response } from "express";
import { handleAPIError } from '../helpers/handleAPIError';
import { IPost } from '../interfaces/IPost';
import { Post } from '../models/Post';

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();

    if(posts) {
      await res.status(200).json(posts);
    }
    else throw new Error('No posts have been found');
  } catch(err) {
    handleAPIError(res, err);
  }
};

const getPost = async (req: Request, res: Response) => {
  try {
    const post_ID = { post_ID: req.params.id };
    const post = await new Post(post_ID).findById();
    
    if(!post) {
      throw new Error('Post has not been found');
    }
    await res.status(200).json(post);
  } catch(err) {
    handleAPIError(res, err);
  }
};

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await new Post(req.body).create();

    await res.status(200).json(result);
  } catch(err) {
    handleAPIError(res, err);
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const post_ID = { post_ID: req.params.id };
    const result = await new Post(post_ID).deleteById();

    await res.status(200).json(result);
  } catch (err) {
    handleAPIError(res, err);
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const post_ID = { post_ID: req.params.id };
    const postData: IPost = {
      ...post_ID,
      ...req.body,
    };
    const result = await new Post(postData).updateById();

    await res.status(200).json(result);
  } catch (err) {
    handleAPIError(res, err);
  }
};

export {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
