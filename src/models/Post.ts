import uniqid from "uniqid";
import { IPost } from "../interfaces/IPost";
import { makeQuery } from "../database";
import { createValidDate } from "../helpers/createValidDate";

export class Post implements IPost {
  public post_ID: string;
  public post_title?: string;
  public post_text?: string;
  public author_login?: string;
  public post_createdAt?: string;
  public post_updatedAt?: string;

  constructor(postData: IPost) {
    const {
      post_ID,
      post_title,
      post_text,
      author_login,
      post_createdAt,
      post_updatedAt,
    } = postData;

    this.post_ID = post_ID;
    this.post_title = post_title;
    this.post_text = post_text;
    this.author_login = author_login;
    this.post_createdAt = post_createdAt;
    this.post_updatedAt = post_updatedAt;
  }

  static async findAll() {
    const query = `
      SELECT post_ID, post_title, post_text,
      authors.author_login, author_fullname,
      post_createdAt, post_updatedAt
      FROM posts inner JOIN authors
      ON posts.author_login = authors.author_login
      ORDER BY post_updatedAt DESC;
    `;

    const posts = await makeQuery(query, []);

    if (!posts) {
      throw new Error("No posts have been found");
    }
    return posts;
  }

  static async findById(id: string) {
    const query = `
      SELECT post_ID, post_title, post_text, authors.author_login, author_fullname, post_createdAt, post_updatedAt
      FROM posts INNER JOIN authors
      ON posts.post_ID = ?;
    `;

    const post = await makeQuery(query, [id]);

    // @ts-ignore
    return post ? post[0] : null;
  }

  async create() {
    const postData: IPost = {
      post_ID: uniqid(),
      post_title: this.post_title,
      post_text: this.post_text,
      author_login: "johnsmith01",
      post_createdAt: createValidDate(new Date()),
      post_updatedAt: createValidDate(new Date()),
    };

    const query = `
      INSERT INTO posts
      (post_ID, post_title, post_text,
      author_login, post_createdAt, post_updatedAt)
      VALUES
      (?, ?, ?, ?, ?, ?);
    `;

    await makeQuery(query, Object.values(postData));
    return postData;
  }

  async updateById() {
    const query = `
      UPDATE posts
      SET post_title = ?, post_text = ?, post_updatedAt = ?
      WHERE post_ID = ?;
    `;

    const postData = [
      this.post_title,
      this.post_text,
      (this.post_updatedAt = createValidDate(new Date())),
      this.post_ID,
    ];

    const result = await makeQuery(query, postData);
    return result;
  }

  async deleteById() {
    const query = `
      DELETE FROM posts
      WHERE post_ID = ?;
    `;

    return makeQuery(query, [this.post_ID]);
  }
}
