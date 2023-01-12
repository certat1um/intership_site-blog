import { Request, Response } from "express";
import { handleAPIError } from "../helpers/handleAPIError";
import { IPost } from "../interfaces/IPost";
import { Post } from "../models/Post";

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();

    if (!posts) {
      return res.status(204).json("No posts found");
    }
    res.status(200).json(posts);
  } catch (err) {
    handleAPIError(res, err);
  }
};

const getPost = async (req: Request, res: Response) => {
  const postID: string = req.params.id;

  try {
    const post = await Post.findById(postID);

    if (!post) {
      res.status(404).send("No post found");
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
  const postID = { _id: req.params.id };

  try {
    const result = await new Post(postID).deleteById();

    res.status(200).json(result);
  } catch (err) {
    handleAPIError(res, err);
  }
};

const updatePost = async (req: Request, res: Response) => {
  const { title, text } = req.body;
  const postData: IPost = {
    _id: req.params.id,
    title,
    text,
  };

  try {
    const result = await new Post(postData).updateById();

    res.status(200).json(result);
  } catch (err) {
    handleAPIError(res, err);
  }
};

export { getPosts, getPost, createPost, updatePost, deletePost };
