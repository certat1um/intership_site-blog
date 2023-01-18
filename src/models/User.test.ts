import { makeQuery } from "../config/database";
import { User } from "./User";
import { mocked } from "jest-mock";
import { RowDataPacket } from "mysql2";

const mockedMakeQuery = mocked(makeQuery);
jest.mock("../config/database");
jest.mock("jsonwebtoken");
jest.mock("uniqid");

describe("Testing User class methods", () => {
  it("findByEmail(): returns user object", async () => {
    const expectedResponse = {
      _id: "testId",
      fullname: "Full Name",
      email: "example@example.com",
      password: "encrypted.password",
      token: "test.access.token",
    };
    mockedMakeQuery.mockImplementation(async () => {
      return [expectedResponse] as RowDataPacket[];
    });

    const post = await User.findByEmail(expectedResponse.email);

    expect(post).toEqual(expectedResponse);
  });

  it("create(): creates new user and return a response", async () => {
    const fullname = "Full Name";
    const email = "example@example.com";
    const password = "encrypted.password";
    const expectedResponse = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: "",
      serverStatus: 2,
      warningStatus: 0,
    };
    mockedMakeQuery.mockImplementation(async () => {
      return [expectedResponse] as RowDataPacket[];
    });

    const userData = {
      fullname,
      email,
      password,
    };

    const response = (await new User().create(userData)) as RowDataPacket[];

    expect(response[0]).toEqual(expectedResponse);
  });
});
