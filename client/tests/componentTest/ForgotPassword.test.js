import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';

import { ForgetPassword } from '../../Component/AuthComponent/ForgotPassword.jsx';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    forgotPassword: jest.fn()

  };
  const enzymeWrapper = mount(<ForgetPassword {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('Given ForgotPassword component is mounted', () => {
    const { enzymeWrapper, props } = setup();
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('.auth-container-board')
        .exists()).toBe(true);
      expect(enzymeWrapper.find('.header-home').exists()).toBe(true);
      expect(enzymeWrapper.find('.auth-form').exists()).toBe(true);
      expect(enzymeWrapper.find('.input-field').exists()).toBe(true);
    });

    it('should have state with key email', () => {
      expect(enzymeWrapper.state('email')).toBe('');
    });


    it('should set state when email input changes', () => {
      enzymeWrapper.find('#email').simulate('change', {
        target: {
          name: 'email',
          value: 'new@email.com'
        }
      });
      expect(enzymeWrapper.state('email')).toEqual('new@email.com');
    });

    it('should call forgotpassword on submit',
      () => {
        const SubmitButton = enzymeWrapper.find('#forgot-btn');
        SubmitButton.simulate('submit');
        expect(props.forgotPassword.mock.calls.length).toBe(1);
      });
  });
});

