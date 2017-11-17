import React from 'react';
import { mount, shalow, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-15';

import { EditProfilePics }
  from '../../../Component/DashBoard/EditProfileComonent/EditProfilePics.jsx';

jest.mock('cloudinary-react');

const setup = () => {
  const props = {
    uploadWidget: jest.fn(),
  };
  const enzmeWrapper = mount(<EditProfilePics {...props} />);
  return {
    enzmeWrapper,
    props
  };
};
configure({ adapter: new Adapter() });
describe('UpdateUserProfilePicture Component', () => {
  it('should call uploadwidget onclick of the upload button', () => {
    global.cloudinary = {
      openUploadWidget: (params, cb) => {
        cb(null);
      },
    };
    const { enzmeWrapper, props } = setup();
    enzmeWrapper.find('.btn-floating').simulate('click');
    expect(props.uploadWidget.mock.calls.length).toBe(1);
  });
});
