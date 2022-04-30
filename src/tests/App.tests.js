import React from "react";
import "@testing-library/jest-dom"
import App from "../App";
import { mount, configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "jsdom-global/register";
import { rest } from "msw";
import { setupServer } from "msw/node";
import mockCookies from "universal-cookie/es6";

jest.mock("universal-cookie/es6", () => {
    const mCookie = {
        get: jest.fn()
    };
    return jest.fn(() => mCookie)
})

mockCookies.get = jest.fn().mockImplementation(() => '436ba57b-4022-4afa-bd93-32190f79ff1b')


const baseUrl = "https://classtrack-backend.herokuapp.com/classTrack/"
configure({ adapter: new Adapter()})

const loginResponse = rest.post(baseUrl + "login", (req, res, ctx) => {
    return res(ctx.json("436ba57b-4022-4afa-bd93-32190f79ff1b"))
})

const handlers = [loginResponse];

const server = new setupServer(...handlers);

let wrapper;

beforeAll(() => {
    server.listen();
})

beforeEach(() => {
    const props = { saveSession: "", API: "https://classtrack-backend.herokuapp.com/classTrack/"}
    wrapper = mount(<App /> );
})

afterAll(() => {
    server.close();
})

afterEach(() => {
    server.resetHandlers();
})

describe("App rendering", () => {

    test("Renders?", () => {
        console.log(wrapper.debug())
    })

})
