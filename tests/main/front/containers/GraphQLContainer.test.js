import React from 'react';
import { shallow } from 'enzyme';
import GraphQLContainer from '../../../../src/main/front/containers/GraphQLContainer';

describe('<GraphQLContainer /> tests', () => {
  it('should render the GraphQLContainer properly', () => {
    const wrapper = shallow(<GraphQLContainer />);
    expect(wrapper.find('.main-container .select-container').exists()).toBe(true);
    expect(wrapper.find('.main-container .select-container').children().length).toBe(2);
    wrapper.setState({ dataKey: 'something' });
    expect(wrapper.find('.main-container .data-container').exists()).toBe(true);
  });

  it('should make sure class functions work as expected', () => {
    const wrapper = shallow(<GraphQLContainer />);
    // add in proper tests
  });
});