import { Request, Response } from "express";
const conn = require('../database');

const createPath = require('../helpers/createPath');

const getDataPosts = (query: string) => {
  return new Promise((resolve, reject) => {
    conn.query(query, (err: any, data: any) => {
      if(err) reject(err);
      else resolve(data);
    });
  }); 
}

const getPosts = async (req: Request, res: Response) => {
  const title = 'Posts';

  const query = `
    SELECT post_ID, post_title, post_text,
    authors.author_ID, author_login, author_fullname,
    post_createdAt, post_updatedAt
    FROM posts inner JOIN authors
    ON posts.author_ID = authors.author_ID;
  `;

  const data = await getDataPosts(query);

  //console.log(posts_and_author);
  

  res.status(200)
    .render(createPath('posts'), { title, data });
};

const getPost = (req: Request, res: Response) => {
  const title = 'Post';

  res
    //.render(createPath('posts'), { title });
};

const getAddPost = (req: Request, res: Response) => {
  const title = 'Add Post';

  res
    //.render(createPath('new-post'), { title });
};

const getEditPost = (req: Request, res: Response) => {
  const title = 'Edit Post';

  res
    //.render(createPath('edit-post'), { title });
};

module.exports = {
  getPosts,
  getPost,
  getAddPost,
  getEditPost,
};
