import React from "react";
import {
  GetUser,
  LogIn,
  logout,
  SignUpAPI,
  getDegrees,
  createHistory,
  getCurriculum,
  getGraph,
  saveGraph,
} from "../API";
import "regenerator-runtime";
import mockAxios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = new setupServer(...handlers);

const getUserResponse = rest.get(baseUrl + "/me", (req, res, ctx) => {
  return res(ctx.json(127));
});

const handlers = [degreesResponse];

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});

// jest.mock("axios")
// mockAxios.post.mockImplementation(() => {
// 	Promise.resolve({ data: "60fb910b-8002-42ff-87bf-bd89dc57e493"})
// })
const baseUrl = "http://127.0.0.1:5000/classTrack";

describe("Testing axios calls...", () => {
  test("GetUser function test", async () => {
    const result = await GetUser("sdfsdf", jest.fn(), jest.fn(), jest.fn());
    console.log(result);
    expect(mockAxios.get).toHaveBeenCalled(1);
  });
});
