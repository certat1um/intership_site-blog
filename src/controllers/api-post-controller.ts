import { Request, Response } from "express";
import { handleAPIError } from "../helpers/handleAPIError";
import { Post } from "../models/Post";

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();

    if (posts === null) {
      return res.status(204).json("No posts found");
    }
    res.status(200).json(posts);
  } catch (err) {
    handleAPIError(res, err);
  }
};

const getPost = async (req: Request, res: Response) => {
  const postID = req.params.id;

  try {
    const post = await Post.findById(postID);

    if (post === null) {
      res.status(200).send("Post has not been found");
      return;
    }
    res.status(200).json(post);
  } catch (err) {
    handleAPIError(res, err);
  }
};

const createPost = async (req: Request, res: Response) => {
  const { title, text } = req.body;

  if (title === "" || text === "") {
    res.status(400).send("Title and text inputs shouldn't be empty!");
  }

  try {
    const result = await new Post().create(title, text);

    if (result === null) {
      res.status(400).send("Got an error while creating the post");
    }
    res.status(201).json(result);
  } catch (err) {
    handleAPIError(res, err);
  }
};

const updatePost = async (req: Request, res: Response) => {
  const { title, text } = req.body;
  const _id = req.params.id;

  if (title === "" || text === "") {
    res.status(400).send("Title and text inputs shouldn't be empty!");
  }

  try {
    const result = await new Post().updateById(_id, title, text);

    if (result === null) {
      res.status(400).send("Got an error while updating the post");
    }
    res.status(200).json(result);
  } catch (err) {
    handleAPIError(res, err);
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const result = await new Post().deleteById(req.params.id);

    if (result === null) {
      res.status(400).send("Got an error while deleting the post");
    }
    res.status(200).json(result);
  } catch (err) {
    handleAPIError(res, err);
  }
};

export { getPosts, getPost, createPost, updatePost, deletePost };
