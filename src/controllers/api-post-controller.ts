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
    const postID: string = req.params.id;
    const post = await Post.findById(postID);

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
    const postID = { _id: req.params.id };
    const result = await new Post(postID).deleteById();

    res.status(200).json(result);
  } catch (err) {
    handleAPIError(res, err);
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const postID = { _id: req.params.id };
    const postData: IPost = {
      _id: postID,
      ...req.body,
    };
    const result = await new Post(postData).updateById();

    res.status(200).json(result);
  } catch (err) {
    handleAPIError(res, err);
  }
};

export { getPosts, getPost, createPost, updatePost, deletePost };
