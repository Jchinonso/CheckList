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
  // it('should expect component to have a imageUrl props', () => {
  //   const { wrapper } = setup();
  //   expect(wrapper.props().imageUrl).toBeTruthy();
  // });
  // it('should expect component to have updateUserProfile props', () => {
  //   const { wrapper } = setup();
  //   expect(wrapper.props().updateUserProfile).toBeTruthy();
  // });
  // it('should update the state when onChange is called', () => {
  //   const { wrapper } = setup();
  //   const input = wrapper.find('#email');
  //   input.simulate(
  //     'change',
  //     {
  //       target: {
  //         name: 'email',
  //         value: 'newEmail@me.com'
  //       }
  //     }
  //   );
  //   expect(wrapper.state().email).toEqual('newEmail@me.com');
  // });
  // it('should update the state when onSubmit is called', () => {
  //   const { wrapper } = setup();
  //   const form = wrapper.find('form');
  //   form.simulate('submit');
  //   expect(wrapper.state().error).toEqual('');
  // });
});
