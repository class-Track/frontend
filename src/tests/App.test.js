// import React from 'react'
// import App from '../App';
// import mockCookies from "universal-cookie/es6";
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
// import Enzyme, { mount } from 'enzyme'
// import 'jsdom-global/register';

// Enzyme.configure({ adapter: new Adapter()})

// jest.mock("universal-cookie/es6", () => {
//     const mCookie = {
//         get: jest.fn()
//     };
//     return jest.fn(() => mCookie)
// })

// mockCookies.get = jest.fn().mockImplementation(() => '436ba57b-4022-4afa-bd93-32190f79ff1b')

// describe('App rendering', () => {
//     let wrapper;
//     beforeEach(() => {
//         wrapper = mount(<App/>);
//     })

//     test('renders', () => {
//         console.log(wrapper.debug());
//         expect(wrapper).not.toBeNull();
//     })
// })

// // test("should take a snapshot", () => {
// //     const { asFragment } = render(<App />)
    
// //     expect(asFragment(<App />)).toMatchSnapshot()
// //   });

// // test('renders without crashing', () => {
// //     const div = document.createElement('div');
// //     ReactDOM.render(<App/>, div)
// //     ReactDOM.unmountComponentAtNode(div)
// // })