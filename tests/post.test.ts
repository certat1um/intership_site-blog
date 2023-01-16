import { Post } from "../src/models/Post";
import { makeQuery } from "../src/config/database";

describe("Find All", () => {
  it("Find All", async () => {
    const expectedData = [
      {
        _id: "ex25ebt8lcnkpvma",
        title: "t",
        text: "text",
        author_id: "ex25ebt8lcnkpgre",
        createdAt: "2023-01-07T22:00:00.000Z",
        updatedAt: "2023-01-15T22:00:00.000Z",
      },
    ];
    jest.mock("../src/config/database", () => ({
      makeQuery: jest.fn().mockReturnValue(expectedData),
    }));

    const post = await Post.findAll();

    expect(post).toEqual(expectedData);
    expect(post).not.toEqual({});
  });
});

describe("Find by ID", () => {
  it("Find by ID", async () => {
    const id = "ex25ebt8lcnkpvma";
    const expectedData = [
      {
        _id: `${id}`,
        title: "t",
        text: "text",
        author_id: "ex25ebt8lcnkpgre",
        createdAt: "2023-01-07T22:00:00.000Z",
        updatedAt: "2023-01-15T22:00:00.000Z",
      },
    ];

    // @ts-ignore
    makeQuery.mockReturnValue(expectedData);
    const spy = jest.spyOn(Post, "findById");
    const post = await Post.findById(id);

    expect(spy).toBeCalledWith(id);
    expect(post).toEqual(expectedData[0]);
    expect(post).not.toEqual({});
  });
});

describe("Create a new post", () => {
  it("Create a new post", async () => {
    const title = "title";
    const text = "text";
    const expectedData = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: "",
      serverStatus: 2,
      warningStatus: 0,
    };

    // @ts-ignore
    makeQuery.mockReturnValue(expectedData);
    const spy = jest.spyOn(new Post(), "create");
    const post = await new Post().create(title, text);

    expect(spy).toBeCalledWith(title, text);
    expect(post).toEqual(expectedData);
    expect(post).not.toEqual({});
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
