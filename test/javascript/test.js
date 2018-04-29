import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "isomorphic-fetch"

configure({ adapter: new Adapter() });
import {Dashboard} from 'components/dashboard';
test('rendered component', () => {
  const wrapper = shallow(<Dashboard user={{username: 'Test User'}} />);
  expect(wrapper.find('div.container')).toHaveLength(1);
});