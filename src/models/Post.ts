import uniqid from "uniqid";
import { IPost } from "../interfaces/IPost";
import { makeQuery } from "../config/database";
import { createValidDate } from "../helpers/createValidDate";

export class Post implements IPost {
  public _id: string;
  public title?: string;
  public text?: string;
  public author_id?: string;
  public createdAt?: string;
  public updatedAt?: string;

  constructor(postData: IPost) {
    const { _id, title, text, author_id, createdAt, updatedAt } = postData;

    this._id = _id;
    this.title = title;
    this.text = text;
    this.author_id = author_id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async findAll() {
    const query = `
      SELECT posts._id, posts.title, posts.text,
      users._id, users.fullname,
      posts.createdAt, posts.updatedAt
      FROM posts inner JOIN users
      ON posts.author_id = users._id
      ORDER BY posts.updatedAt DESC;
    `;

    const posts = await makeQuery(query, []);

    if (!posts) {
      throw new Error("No posts have been found");
    }
    return posts;
  }

  static async findById(id: string) {
    const query = `
      SELECT posts._id, posts.title, posts.text,
      users._id, users.fullname, posts.createdAt,
      posts.updatedAt
      FROM posts INNER JOIN users
      ON posts._id = ?;
    `;

    const post = await makeQuery(query, [id]);
    if (Array.isArray(post) && post[0]) {
      return post[0];
    }
    return null;
  }

  async create() {
    const postData: IPost = {
      _id: uniqid(),
      title: this.title,
      text: this.text,
      author_id: "johnsmith01",
      createdAt: createValidDate(new Date()),
      updatedAt: createValidDate(new Date()),
    };

    const query = `
      INSERT INTO posts
      (_id, title, text,
      author_id, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    await makeQuery(query, Object.values(postData));
    return postData;
  }

  async updateById() {
    const query = `
      UPDATE posts
      SET title = ?, text = ?, updatedAt = ?
      WHERE _id = ?;
    `;

    const postData: IPost = {
      title: this.title,
      text: this.text,
      updatedAt: (this.updatedAt = createValidDate(new Date())),
      _id: this._id,
    };

    const result = await makeQuery(query, Object.values(postData));
    return result;
  }

  async deleteById() {
    const query = `
      DELETE FROM posts
      WHERE _id = ?;
    `;

    return makeQuery(query, [this._id]);
  }
}
