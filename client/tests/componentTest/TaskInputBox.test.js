import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-15';

import { TaskInputBox }
  from
  '../../../../../../CreateTaskComponent/TaskInputBox.jsx';

const setup = () => {
  const props = {
    handleDateChange: jest.fn(),
    handleOnChange: jest.fn(),
    text: jest.fn(),
  }
  const enzmeWrapper = shallow(<TaskInputBox {...props} />);
  return {
    enzmeWrapper,
    props
  };
};
configure({ adapter: new Adapter() });

describe('TaskInputBox Component', () => {
  it('should render neccessary elements', () => {
    const { enzmeWrapper } = setup();
    expect(enzmeWrapper.find('input').length).toBe(1);
    expect(enzmeWrapper.find('div').length).toBe(2);
  });
});
