import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';

import { ResetPassword } from '../../Component/AuthComponent/ResetPassword.jsx';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    resetPassword: jest.fn()

  };
  const enzymeWrapper = mount(<ResetPassword {...props} />);
  return {
    props,
    enzymeWrapper
  };
};
describe('components', () => {
  describe('Given ResetPassword component is mounted', () => {
    const { enzymeWrapper, props } = setup();
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('.auth-container-board')
        .exists()).toBe(true);
      expect(enzymeWrapper.find('.header-home').exists()).toBe(true);
      expect(enzymeWrapper.find('.auth-form').exists()).toBe(true);
      expect(enzymeWrapper.find('.input-field').exists()).toBe(true);
      expect(enzymeWrapper.find('#password').exists()).toBe(true);
      expect(enzymeWrapper.find('#verifyPassword').exists()).toBe(true);
    });

    it('should set state when password input changes', () => {
      enzymeWrapper.find('#password').simulate('change', {
        target: {
          name: 'password',
          value: '123456'
        }
      });
      enzymeWrapper.find('#verifyPassword').simulate('change', {
        target: {
          name: 'verifyPassword',
          value: '123456'
        }
      });
      expect(enzymeWrapper.state('password')).toEqual('123456');
      expect(enzymeWrapper.state('verifyPassword')).toEqual('123456');
    });

    it('should call resetPassword on submit',
      () => {
        const SubmitButton = enzymeWrapper.find('#reset-pass');
        SubmitButton.simulate('submit', {});
        expect(props.resetPassword.mock.calls.length).toBe(0);
      });
  });
});

