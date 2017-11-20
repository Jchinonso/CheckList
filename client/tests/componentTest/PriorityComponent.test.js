import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-15';

import { PriorityComponent }
  from
  '../../../../../MainComponent/CreateTaskComponent/PriorityComponent.jsx';

const setup = () => {
  const props = {
    defaultPriority: jest.fn(),
    setPriority: jest.fn(),
  }
  const enzmeWrapper = shallow(<PriorityComponent {...props} />);
  return {
    enzmeWrapper,
    props
  };
};
configure({ adapter: new Adapter() });

describe('PriorityComponent Component', () => {
  it('should render neccessary elements', () => {
    const { enzmeWrapper } = setup();
    expect(enzmeWrapper.find('input').length).toBe(3);
    expect(enzmeWrapper.find('div').length).toBe(1);
  });
});
