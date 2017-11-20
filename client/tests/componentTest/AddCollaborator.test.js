import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-15';

import { AddCollaborator }
  from '../../../Component/DashBoard/MainComponent/AddCollaborator/Index.jsx';

const enzmeWrapper = shallow(<EditUserInfo />);
configure({ adapter: new Adapter() });
describe('UpdateUserProfile Component', () => {
  it('should render neccessary elements', () => {
    expect(enzmeWrapper.find('div').length).toBe(2);
    expect(enzmeWrapper.find('a').length).toBe(1);
  });
});
