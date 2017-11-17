import expect from 'expect';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { SignUp } from
  '../../Component/AuthComponent/SignUp.jsx'

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    handleOnSubmit: jest.fn(),
    showSignin: jest.fn(),
    signUp: jest.fn()
  };
  const enzymeWrapper = mount(<SignUp {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('SignUp component', () => {
    const { enzymeWrapper, props } = setup();
    it('should render a form with four input fields', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('form').exists()).toBe(true);
      expect(enzymeWrapper.find('input')).toHaveLength(4);
      expect(enzymeWrapper.find('#username').exists()).toBe(true);
      expect(enzymeWrapper.find('#email').exists()).toBe(true);
      expect(enzymeWrapper.find('#name').exists()).toBe(true);
      expect(enzymeWrapper.find('#password').exists()).toBe(true);
    });

    it('should set state when input value is changed ', () => {
      enzymeWrapper.find('#email').simulate('change', {
        target: { name: 'email', value: 'tomi@gmail.com' }
      });
      expect(enzymeWrapper.state('email')).toBe('tomi@gmail.com');
      enzymeWrapper.find('#password').simulate('change', {
        target: { name: 'password', value: '123456' }
      });
      expect(enzymeWrapper.state('password')).toBe('123456');
      enzymeWrapper.find('#username').simulate('change', {
        target: { name: 'username', value: 'jchinonso' }
      });
      expect(enzymeWrapper.state('username')).toBe('jchinonso');
    });

    it('should have fifteen divs', () => {
      expect(enzymeWrapper.find('div').length).toBe(16);
    });
    it('should call showLogin when the login link is clicked',
      () => {
        enzymeWrapper.find('#go-to-login').simulate('click');
        expect(props.showSignin.mock.calls.length).toBe(1);
      });
  });
});
