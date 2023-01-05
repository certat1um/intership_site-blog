import { Request, Response } from "express";
import { createValidDate } from '../helpers/createValidDate';
import { handleError } from '../helpers/handleError';
import { createPath } from '../helpers/createPath';
import { IPost } from '../interfaces/IPost';
import { Post } from '../models/Post';

// Get Pages
const getAddPost = (req: Request, res: Response) => {
  const title = 'Add Post';

  res.render(createPath('new-post'), { title })
};
const getEditPost = async (req: Request, res: Response) => {
  try {
    const title = 'Edit Post';
    const postToFind = await new Post({ post_ID: req.params.id });
    const post = await new Post(postToFind).findById();
    
    if(post) {
      await res.status(200).render(createPath('edit-post'), { title, post });
    }
    else throw new Error('No post has been found');
  } catch(err) {
    handleError(res, err);
  }
};

// Get Post Actions
const getPosts = async (req: Request, res: Response) => {
  try {
    const title = 'Posts';

    const posts = await Post.findAll();

    if(posts) {
      await res.status(200).render(createPath('posts'), { title, posts });
    }
    else throw new Error('No posts have been found');
  } catch(err) {
    handleError(res, err);
  }
};
const getPost = async(req: Request, res: Response) => {
  try {
    const title = 'Post';

    const post_ID = { post_ID: req.params.id };
    const post = await new Post(post_ID).findById();
    
    if(!post) {
      throw new Error('Post has not been found');
    }
    await res.status(200).render(createPath('post'), { title, post });
  } catch(err) {
    handleError(res, err);
  }
};

// Other Post Actions
const createPost = async (req: Request, res: Response) => {
  try {
    await new Post(req.body).create();

    await res.redirect('/posts');
  } catch(err) {
    handleError(res, err);
  }
};
const deletePost = async (req: Request, res: Response) => {
  try {
    const post_ID = { post_ID: req.params.id };
    const result = await new Post(post_ID).deleteById();

    await res.redirect('/posts');
  } catch (err) {
    handleError(res, err);
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

    await res.redirect('/posts');
  } catch (err) {
    handleError(res, err);
  }
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
