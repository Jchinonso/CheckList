import React from 'react';
import { mount, shalow, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-15';

import { NavComponent }
  from '../../../Component/DashBoard/EditProfileComonent/EditUserInfo';

const setup = () => {
  const props = {
    signOut: jest.fn()
  };
  const enzmeWrapper = mount(<NavComponent {...props} />);
  return {
    enzmeWrapper,
    props
  };
};
configure({ adapter: new Adapter() });
describe('NavComponent Component', () => {
  it('should render neccessary elements', () => {
    const { enzmeWrapper, props } = setup();
    expect(enzmeWrapper.find('div').length).toBe(3);
    expect(enzmeWrapper.find('nav').length).toBe(1);
    expect(enzmeWrapper.find('a').length).toBe(5);
  });
  it('should sign out a user when button click', () => {
    const { enzmeWrapper, props } = setup();
    enzmeWrapper.find('.sign-out').simulate('click');
    expect(props.signOut.mock.calls.length).toBe(1);
  });
});
