import { Request, Response } from "express";
import { handleAPIError } from "../helpers/handleAPIError";
import { IPost } from "../interfaces/IPost";
import { Post } from "../models/Post";

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();

    if (!posts) {
      throw new Error("No posts have been found");
    }
    res.status(200).json(posts);
  } catch (err) {
    handleAPIError(res, err);
  }
};

const getPost = async (req: Request, res: Response) => {
  try {
    const post_ID: string = req.params.id;
    const post = await Post.findById(post_ID);

    if (!post) {
      throw new Error("Post has not been found");
    }
    res.status(200).json(post);
  } catch (err) {
    handleAPIError(res, err);
  }
};

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await new Post(req.body).create();

    res.status(201).json(result);
  } catch (err) {
    handleAPIError(res, err);
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const post_ID = { post_ID: req.params.id };
    const result = await new Post(post_ID).deleteById();

    res.status(200).json(result);
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

    res.status(200).json(result);
  } catch (err) {
    handleAPIError(res, err);
  }
};

export { getPosts, getPost, createPost, updatePost, deletePost };
