import uniqid from 'uniqid';
import { IPost } from '../interfaces/IPost';
import { makeQuery } from '../database';
import { createValidDate } from '../helpers/createValidDate';

export class Post implements IPost {
  public post_ID: string;
  public post_title: string | undefined;
  public post_text: string | undefined;
  public author_login: string | undefined;
  public post_createdAt: string | undefined;
  public post_updatedAt: string | undefined;

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

    // @ts-ignore
    return await posts[0];
  }

  async findById() {
    const query = `
      SELECT post_ID, post_title, post_text, authors.author_login, author_fullname, post_createdAt, post_updatedAt
      FROM posts INNER JOIN authors
      ON posts.post_ID = ?;
    `;

    const post = await makeQuery(query, [this.post_ID]);

    // @ts-ignore
    return (post) ? post[0][0] : post;
  }

  async create() {
    this.post_ID = uniqid();
    this.post_title = this.post_title;
    this.post_text = this.post_text;
    this.author_login = 'johnsmith01';
    this.post_createdAt = createValidDate(new Date());
    this.post_updatedAt = createValidDate(new Date());

    const query = `
      INSERT INTO posts
      (post_ID, post_title, post_text,
      author_login, post_createdAt, post_updatedAt)
      VALUES
      (?, ?, ?, ?, ?, ?);
    `;

    await makeQuery(query, Object.values(this));
    return await this;
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
      this.post_updatedAt = createValidDate(new Date()),
      this.post_ID,
    ];

    const result = await makeQuery(query, postData);

    return await result;
  }

  async deleteById() {
    const query = `
      DELETE FROM posts
      WHERE post_ID = ?;
    `;

    return await makeQuery(query, [this.post_ID]);
  }
}
