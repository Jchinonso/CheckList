import React from 'react';
import { mount, shalow, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-15';

import { EditUserInfo }
  from '../../../Component/DashBoard/EditProfileComonent/EditUserInfo';

const setup = () => {
  const props = {
    handleOnClick: jest.fn(),
    toggleDisabled: jest.fn(),
    disabled: false,
    handleOnChange: jest.fn(),
    user: jest.fn(),
  }
  const enzmeWrapper = mount(<EditUserInfo {...props} />);
  return {
    enzmeWrapper,
    props
  };
};
configure({ adapter: new Adapter() });
describe('UpdateUserProfile Component', () => {
  it('should render neccessary elements', () => {
    const { enzmeWrapper } = setup();
    expect(enzmeWrapper.find('div').length).toBe(7);
    expect(enzmeWrapper.find('form').length).toBe(1);
    expect(enzmeWrapper.find('input').length).toBe(3);
  });
  it('should submit form if button is clicked', () => {
    const { enzmeWrapper } = setup();
    expect(enzmeWrapper.find('button').length).toBe(2);
  });
});
