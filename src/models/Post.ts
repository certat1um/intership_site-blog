import uniqid from "uniqid";
import { IPost } from "../interfaces/IPost";
import { makeQuery } from "../config/database";
import { createValidDate } from "../helpers/createValidDate";
import { RowDataPacket } from "mysql2";

export class Post {
  static async findAll(): Promise<IPost[] | null> {
    const query = `
      SELECT * FROM posts
      ORDER BY posts.updatedAt DESC;
    `;

    const result = await makeQuery(query);

    if (result === null) {
      return null;
    }
    const posts = [...result] as IPost[];
    return posts;
  }

  static async findById(id: string): Promise<IPost | null> {
    const query = `
      SELECT * from posts
      WHERE _id = ?;
    `;

    const result = await makeQuery(query, [id]);

    if (result === null || !result.length) {
      return null;
    }
    const post = [...result] as IPost[];
    return post[0];
  }

  async create(title: string, text: string): Promise<RowDataPacket[] | null> {
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

    return makeQuery(query, postData);
  }

  async updateById(
    id: string,
    title: string,
    text: string
  ): Promise<RowDataPacket[] | null> {
    const query = `
      UPDATE posts
      SET title = ?, text = ?, updatedAt = ?
      WHERE _id = ?;
    `;

    const postData = [title, text, createValidDate(new Date()), id];

    return makeQuery(query, postData);
  }

  async deleteById(id: string): Promise<RowDataPacket[] | null> {
    const query = `
      DELETE FROM posts
      WHERE _id = ?;
    `;

    return makeQuery(query, [id]);
  }
}
