import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';

import { SignIn } from '../../Component/AuthComponent/SignIn.jsx';

jest.mock('react-google-login')
Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    handleOnSubmit: sinon.stub(SignIn.prototype, 'handleOnSubmit').returns(true),
    showSignup: jest.fn(),
    googleSignIn: jest.fn(),
    signIn: jest.fn(),
    handleInputChange: jest.fn()
  };
  const enzymeWrapper = mount(<SignIn {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('SignIn component', () => {
    const { enzymeWrapper, props } = setup();
    it('should render a form with two input fields', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('form').exists()).toBe(true);
      expect(enzymeWrapper.find('input')).toHaveLength(2);
      expect(enzymeWrapper.find('#email').exists()).toBe(true);
      expect(enzymeWrapper.find('#password').exists()).toBe(true);
    });
    it('should set state when input value is changed ', () => {
      enzymeWrapper.find('#email').simulate('change', {
        target: { name: 'email', value: 'jdoe@gmail.com' }
      });
      expect(enzymeWrapper.state('email')).toBe('jdoe@gmail.com');
      enzymeWrapper.find('#password').simulate('change', {
        target: { name: 'password', value: '123456' }
      });
      expect(enzymeWrapper.state('password')).toBe('123456');
    });
    it('should call onSubmit when submit button is clicked', () => {
      enzymeWrapper.find('#my-form').simulate('submit', {});
      expect(props.handleOnSubmit.callCount).toBe(1);
    });
    it('should call showSignup when the signup link is clicked',
      () => {
        enzymeWrapper.find('#toggle-signup').simulate('click');
        expect(props.showSignup.mock.calls.length).toBe(1);
      });
    it('should have seventeen div elements', () => {
      expect(enzymeWrapper.find('div')).toHaveLength(17);
    });
  });
});
