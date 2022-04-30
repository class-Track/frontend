import React from "react";
import "@testing-library/jest-dom";
import SignUp from "../components/UserAuth/SignUp";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jsdom-global/register";
import { Button, Select, TextField } from "@mui/material";
import { rest } from "msw";
import { setupServer } from "msw/node";
import sinon from "sinon"

const baseUrl = "http://127.0.0.1/classTrack";
configure({ adapter: new Adapter() });

const loginResponse = rest.post(baseUrl + "/user", (req, res, ctx) => {
	return res(ctx.json(127));
});

const degreesResponse = rest.get(baseUrl + "/degrees_dept", (req, res, ctx) => {
    console.log("hello")
	return res(
		ctx.json([
			{
				credits: 132,
				curriculum_sequence: "CIIC_user2_V1",
				degree_id: 4,
				department_id: 2,
                length: 6,
                name: "Computer Science and Engineering"
			},
            {
				credits: 132,
				curriculum_sequence: "2_46_admin",
				degree_id: 46,
				department_id: 2,
                length: 6,
                name: "Software Engineering"
			}
		])
	);
});

const handlers = [loginResponse, degreesResponse];

const server = new setupServer(...handlers);

let wrapper;

beforeAll(() => {
	server.listen({ onUnhandledRequest: "bypass" });
});

beforeEach(() => {
    const props = {
		saveSession: "",
		API: "https://classtrack-backend.herokuapp.com/classTrack/",
	};
	wrapper = mount(<SignUp props={props} />);
});

afterAll(() => {
	server.close();
});

afterEach(() => {
	wrapper.update();
	server.resetHandlers();
});

describe("Wrapper testing...", () => {
    test("Props...", () => {
        expect(wrapper.props().props.API).toBe('https://classtrack-backend.herokuapp.com/classTrack/')
    })
})

describe("Signing up...", () => {
	const credentials = { username: "test@testjulian.com", password: "test" };

	test("Render first name textfield", () => {
		const firstName = wrapper.find(TextField).find("input").at(0);
		firstName.simulate("change", { target: { value: "test" } });
		expect(firstName.length).toBe(1);
	});

	test("Render last name textfield", () => {
		const lastName = wrapper.find(TextField).find("input").at(1);
		lastName.simulate("change", { target: { value: "user" } });
		expect(lastName.length).toBe(1);
	});

	test("Render email textfield", () => {
		const email = wrapper.find(TextField).find("input").at(2);
		email.simulate("change", { target: { value: "user@test.com" } });
		expect(email.length).toBe(1);
	});

	test("Render password textfield", () => {
		const password = wrapper.find(TextField).find("input").at(3);
		password.simulate("change", { target: { value: "test" } });
		expect(password.length).toBe(1);
	});

	test("Render degrees Select", () => {
		const select = wrapper.find(Select).find("input").at(0);
		select.simulate("change", { target: { value: "Software Engineering" } });
		expect(select.length).toBe(1);
	});

	test("Render button textfield", async () => {
        const buttonClick = sinon.spy()
		const button = wrapper.find(Button).find("button").at(0);
		await button.simulate("submit");
		expect(button.length).toBe(1);
	});
});
