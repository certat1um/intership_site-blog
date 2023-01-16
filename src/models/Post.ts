import uniqid from "uniqid";
import { IPost } from "../interfaces/IPost";
import { makeQuery } from "../config/database";
import { createValidDate } from "../helpers/createValidDate";

export class Post {
  static async findAll() {
    const query = `
      SELECT * FROM posts
      ORDER BY posts.updatedAt DESC;
    `;

    const posts = await makeQuery<IPost>(query);
    return posts === null ? null : posts;
  }

  static async findById(id: string) {
    const query = `
      SELECT * from posts
      WHERE _id = ?;
    `;

    const post = await makeQuery<IPost>(query, [id]);
    return post === null || !post.length ? null : post[0];
  }

  async create(title: string, text: string) {
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

    const result = await makeQuery<IPost>(query, postData);
    return result;
  }

  async updateById(id: string, title: string, text: string) {
    const query = `
      UPDATE posts
      SET title = ?, text = ?, updatedAt = ?
      WHERE _id = ?;
    `;

    const postData = [title, text, createValidDate(new Date()), id];

    const result = await makeQuery<IPost>(query, postData);
    return result;
  }

  async deleteById(id: string) {
    const query = `
      DELETE FROM posts
      WHERE _id = ?;
    `;

    return makeQuery(query, [id]);
  }
}
