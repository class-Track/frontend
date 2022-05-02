import React from "react";
import { waitFor} from '@testing-library/react'
import SignIn from "../components/UserAuth/Login";
import { mount, configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "jsdom-global/register";
import { Button, TextField } from "@mui/material";
import { rest } from "msw";
import { setupServer } from "msw/node";

const baseUrl = "https://classtrack-backend.herokuapp.com/classTrack/"
configure({ adapter: new Adapter()})

const loginResponse = rest.post(baseUrl + "login", (req, res, ctx) => {
    return res(ctx.json("436ba57b-4022-4afa-bd93-32190f79ff1b"))
})

const handlers = [loginResponse];

const server = new setupServer(...handlers);

let wrapper;

beforeAll(() => {
    server.listen({ onUnhandledRequest: "bypass" });
})

beforeEach(() => {
    const props = { saveSession: "", API: "https://classtrack-backend.herokuapp.com/classTrack/"}
    wrapper = mount(<SignIn /> );
})

afterAll(() => {
    server.close();
})

afterEach(() => {
    server.resetHandlers();
})

describe("Logging in...", () => {
    const credentials = { username: 'test@testjulian.com', password: "test"};
    test("Render email textfield", () => {
        const email = wrapper.find(TextField).find('input').at(0);
        email.simulate("change", { target: { value: credentials.username }} )
        expect(email.length).toBe(1)
    })

    test("Render password textfield", () => {
        const password = wrapper.find(TextField).find('input').at(1);
        password.simulate("change", { target: { value: credentials.password }} )
        expect(password.length).toBe(1)
    })

    // test("Render button textfield", () => {
    //     const button = wrapper.find(Button).find('button').at(0);
    //     button.simulate("submit")
    //     expect(button.length).toBe(1)
    // })

})
