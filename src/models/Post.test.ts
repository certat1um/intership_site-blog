import { makeQuery } from "../config/database";
import { Post } from "./Post";
import { mocked } from "jest-mock";
import { IPost } from "../interfaces/IPost";
import { RowDataPacket } from "mysql2";

const mockedFn = mocked(makeQuery);
jest.mock("../config/database");

describe("Testing Post class methods", () => {
  const id = "ex25e8ecld1kd6ht";
  const title = "title";
  const text = "text";

  it("findAll(): returns an array of posts", async () => {
    const expectedData = [
      {
        _id: id,
        title: title,
        text: text,
        author_id: "ex25ebt8lcnkpgre",
        createdAt: "2023-01-07T22:00:00.000Z",
        updatedAt: "2023-01-15T22:00:00.000Z",
      },
    ];
    mockedFn.mockImplementation(async () => {
      return expectedData as RowDataPacket[];
    });

    const post = await Post.findAll();

    expect(post).toEqual(expectedData);
  });

  it("findById(): returns a post object", async () => {
    const expectedData = {
      _id: id,
      title: title,
      text: text,
      author_id: "ex25ebt8lcnkpgre",
      createdAt: "2023-01-07T22:00:00.000Z",
      updatedAt: "2023-01-15T22:00:00.000Z",
    };
    mockedFn.mockImplementation(async () => {
      return [expectedData] as RowDataPacket[];
    });

    const post = await Post.findById(id);

    expect(post).toEqual(expectedData);
  });

  it("create(): returns correct response object", async () => {
    const expectedData = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: "",
      serverStatus: 2,
      warningStatus: 0,
    };
    mockedFn.mockImplementation(async () => {
      return [expectedData] as RowDataPacket[];
    });

    const post = (await new Post().create(title, text)) as IPost[];

    expect(post[0]).toEqual(expectedData);
  });

  it("updateById(): returns correct response object", async () => {
    const expectedData = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: "Rows matched: 1  Changed: 1  Warnings: 0",
      serverStatus: 2,
      warningStatus: 0,
      changedRows: 1,
    };
    mockedFn.mockImplementation(async () => {
      return [expectedData] as RowDataPacket[];
    });

    const response = (await new Post().updateById(
      id,
      title,
      text
    )) as RowDataPacket[];

    expect(response[0]).toEqual(expectedData);
  });

  it("deleteById(): returns correct response object", async () => {
    const expectedData = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: "",
      serverStatus: 2,
      warningStatus: 0,
    };
    mockedFn.mockImplementation(async () => {
      return [expectedData] as RowDataPacket[];
    });

    const post = (await new Post().deleteById(id)) as RowDataPacket[];

    expect(post[0]).toEqual(expectedData);
  });
});
