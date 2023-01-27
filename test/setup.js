
// setup file
import { configure, EnzymeAdapter } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

EnzymeAdapter.configure({ adapter: new Adapter() })



require.extensions['.css'] = function () {
    return null;
    };
