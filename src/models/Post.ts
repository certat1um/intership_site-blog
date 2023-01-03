import { Request, Response } from 'express';
const { makeQuery } = require('../database');

class Post {
  static async findAll() {
    const query = `
      SELECT post_ID, post_title, post_text,
      authors.author_login, author_fullname,
      post_createdAt, post_updatedAt
      FROM posts inner JOIN authors
      ON posts.author_login = authors.author_login
      ORDER BY post_updatedAt DESC;
    `;

    return await makeQuery(query);
  }

  static async findById(id: string) {
    const query = `
      SELECT post_ID, post_title, post_text, authors.author_login, author_fullname, post_createdAt, post_updatedAt
      FROM posts INNER JOIN authors
      ON posts.post_ID = '${id}';
    `;

    return await makeQuery(query).then((res: any) => res[0]);
  }

  static async create(post_ID: string, post_title: string, post_text: string, author_login: string, post_createdAt: Date, post_updatedAt: Date) {
    
    const query = `
      INSERT INTO posts
      (post_ID, post_title, post_text,
      author_login, post_createdAt, post_updatedAt)
      VALUES
      ('${post_ID}', '${post_title}', '${post_text}', '${author_login}', '${post_createdAt}', '${post_updatedAt}');
    `;

    makeQuery(query);
  }

  static async updateById({ post_ID, post_title, post_text, post_updatedAt }: any) {
    const query = `
      UPDATE posts
      SET post_title = '${post_title}', post_text = '${post_text}', post_updatedAt = '${post_updatedAt}'
      WHERE post_ID = '${post_ID}';
    `;

    makeQuery(query);
  }

  static async deleteById(id: string) {
    const query = `
      DELETE FROM posts
      WHERE post_ID = '${id}';
    `;

    makeQuery(query);
  }
}

module.exports = Post;
