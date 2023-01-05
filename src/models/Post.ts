import { IPost } from '../interfaces/IPost';
import { createValidDate } from '../helpers/createValidDate';
import uniqid from 'uniqid';
import { makeQuery } from '../database';

export class Post implements IPost {
  public post_title: string;
  public post_text: string;
  public post_ID: string;
  public author_login: string;
  public post_createdAt: string;
  public post_updatedAt: string;

  constructor(postData: any) {
    const {
        post_title,
        post_text,
    }: any = postData;

    this.post_ID = uniqid();
    this.post_title = post_title;
    this.post_text = post_text;
    this.author_login = 'johnsmith01';
    this.post_createdAt = createValidDate(new Date());
    this.post_updatedAt = createValidDate(new Date());
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

  static async create(post: IPost) {
    const {
      post_ID,
      post_title,
      post_text,
      author_login,
      post_createdAt,
      post_updatedAt,
    }: IPost = post;

    const query = `
      INSERT INTO posts
      (post_ID, post_title, post_text,
      author_login, post_createdAt, post_updatedAt)
      VALUES
      ('${post_ID}', '${post_title}', '${post_text}', '${author_login}', '${post_createdAt}', '${post_updatedAt}');
    `;
    
    makeQuery(query);
  }

  static async updateById({ post_ID, post_title, post_text, post_updatedAt }: IPost) {
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
