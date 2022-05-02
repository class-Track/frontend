import React from "react";
import "@testing-library/jest-dom";
import SignUp from "../components/UserAuth/SignUp";
import { waitFor} from '@testing-library/react'
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jsdom-global/register";
import { Button, Box, Select, TextField } from "@mui/material";
import { rest } from "msw";
import { setupServer } from "msw/node";

const baseUrl = "http://127.0.0.1:5000/classTrack";
configure({ adapter: new Adapter() });

const loginResponse = rest.post(baseUrl + "/user", (req, res, ctx) => {
	return res(ctx.json(127));
});

const degreesResponse = rest.get(baseUrl + "/degrees_dept", (req, res, ctx) => {
	return res(
		ctx.json([
			{
				degree_id: 4,
				department_id: 2,
                name: "Computer Science and Engineering"
			},
            {
				degree_id: 46,
				department_id: 2,
                name: "Software Engineering"
			}
		])
	);
});

const handlers = [loginResponse, degreesResponse];

const server = new setupServer(...handlers);

let wrapper;

beforeAll(() => {
	server.listen();
});

beforeEach( async() => {
    const props = {
		saveSession: "",
		API: "https://classtrack-backend.herokuapp.com/classTrack/",
	};
	wrapper = (mount(<SignUp API={props.API} saveSession={props.saveSession} />));
});

afterAll(() => {
	server.close();
});

afterEach(() => {
	server.resetHandlers();
});

describe("Wrapper testing...", () => {
    test("Props...", () => {
        expect(wrapper.props().API).toBe('https://classtrack-backend.herokuapp.com/classTrack/')
    })
})

describe("Signing up...", () => {
	const credentials = { username: "test@testjulian.com", password: "test" };
	
	test("Render form box", async () => {
		const box =  await waitFor(() => wrapper.find(Box).at(0));
		expect(box.length).toBe(1);
	});

	test("Rendering Sign up textfields", async () => {
		// First Name
		const firstName = (wrapper.find(TextField).find("input").at(0));
		firstName.simulate("change", { target: { value: "test" } });
		expect(firstName.length).toBe(1);
		// Last Name
		const lastName = (wrapper.find(TextField).find("input").at(1));
		lastName.simulate("change", { target: { value: "user" } });
		expect(lastName.length).toBe(1);
		// Email
		const email = (wrapper.find(TextField).find("input").at(2));
		email.simulate("change", { target: { value: "user@test.com" } });
		expect(email.length).toBe(1);
		//Password
		const password = (wrapper.find(TextField).find("input").at(3));
		password.simulate("change", { target: { value: "test" } });
		expect(password.length).toBe(1);
	});

	test("Render degrees Select", () => {
		const select = wrapper.find(Select).find("input").at(0);
		select.simulate("change", { target: { value: "Software Engineering" } });
		expect(select.length).toBe(1);
	});

	test("Render button textfield", () => {
		const button = wrapper.find(Button).find("button").at(0);
		button.simulate("submit");
		expect(button.length).toBe(1);
	});
});
