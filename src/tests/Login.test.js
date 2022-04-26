import React from "react";
import "@testing-library/jest-dom"
import SignIn from "../components/UserAuth/Login";
import { mount, configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "jsdom-global/register";

configure({ adapter: new Adapter()})

let wrapper;
beforeEach(() => {
    const props = { saveSession: "", API: "https://classtrack-backend.herokuapp.com/classTrack/"}
    wrapper = mount(<SignIn props={props}/> )
})

test("Logging in...", () => {
    const credentials = { username: 'test@testjulian.com', password: "test"};
    const text = wrapper.find({ id: "email", label: "Email Address"})
    text.simulate("change", { target: { value: credentials.username }} )
    wrapper.update();
    console.log(wrapper.debug());

})

// Enzyme.configure({ adapter: new Adapter() });1



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


