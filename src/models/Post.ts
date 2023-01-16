import uniqid from "uniqid";
import { IPost } from "../interfaces/IPost";
import { makeQuery } from "../config/database";
import { createValidDate } from "../helpers/createValidDate";

export class Post {
  static async findAll(): Promise<IPost[] | null> {
    const query = `
      SELECT * FROM posts
      ORDER BY posts.updatedAt DESC;
    `;

    const posts = await makeQuery<IPost>(query);
    if (posts === null || !posts.length) {
      return null;
    }
    return posts;
  }

  static async findById(id: string): Promise<IPost | null> {
    const query = `
      SELECT * from posts
      WHERE _id = ?;
    `;

    const post = await makeQuery<IPost>(query, [id]);

    if (post === null || !post.length) {
      return null;
    }
    return post[0];
  }

  async create(title: string, text: string): Promise<IPost[] | null> {
    const postData = [
      uniqid(),
      title,
      text,
      "ex25ebt8lcnkpgre",
      createValidDate(new Date()),
      createValidDate(new Date()),
    ];

    const query = `
      INSERT INTO posts
      (_id, title, text,
      author_id, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    return makeQuery<IPost>(query, postData);
  }

  async updateById(
    id: string,
    title: string,
    text: string
  ): Promise<IPost[] | null> {
    const query = `
      UPDATE posts
      SET title = ?, text = ?, updatedAt = ?
      WHERE _id = ?;
    `;

    const postData = [title, text, createValidDate(new Date()), id];

    return makeQuery<IPost>(query, postData);
  }

  async deleteById(id: string): Promise<IPost[] | null> {
    const query = `
      DELETE FROM posts
      WHERE _id = ?;
    `;

    return makeQuery(query, [id]);
  }
}
