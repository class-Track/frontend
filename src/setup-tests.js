import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "regenerator-runtime"

configure({ adpater: new Adapter() })