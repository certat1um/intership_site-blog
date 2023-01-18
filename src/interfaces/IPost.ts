export interface IPost {
  readonly _id?: string;
  title?: string;
  text?: string;
  readonly author_id?: string;
  readonly createdAt?: string;
  updatedAt?: string;
}
