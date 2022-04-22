import React from "react";
import { screen, render, cleanup, waitForElement } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import SignIn from "../components/UserAuth/Login";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme, { mount } from "enzyme";
import "jsdom-global/register";
import mockAxios from "axios";

const mockSignInComponent = jest.fn()

jest.mock("../components/UserAuth/Login", () => (props) => {
    mockSignInComponent(props);

    return <mock-signIn />;
})

let wrapper;
beforeEach(() => {
    const api = "https://classtrack-backend.herokuapp.com/classTrack/"
    const saveSession = ""
    wrapper = mount(<SignIn saveSession={saveSession} API={api}/> )
})

test("testing", () => {
    console.log(wrapper.find("TextField"))

})

// Enzyme.configure({ adapter: new Adapter() });



// describe("App rendering", () => {
//     const data = new FormData()
//     data.append("email", "test@testjulian.com")
//     data.append("password", "test")
    
//     const prop = jest.fn()
// 	let wrapper;
// 	beforeEach(() => {
// 		wrapper = mount(<SignIn prop={prop} />);
// 	});

//     afterEach(cleanup);

//     it("login", async () => {
//         mockAxios.post.mockResolvedValueOnce( { data: {sessionID: '436ba57b-4022-4afa-bd93-32190f79ff1b'}})
//         const { getByTestId } = render(<SignIn prop={prop} />)
//         expect(prop).not.toBeNull()
        
//     })

//     it("renders", () => {
//         console.log(wrapper.debug())
//         expect(wrapper).not.toBeNull();
//     });

//     it("should run?", async () => {
//         const result = await SignIn.handleSubmit(data)
//         console.log(result)
//         expect(type(result)).toBe(String)
//     })
	
// });


