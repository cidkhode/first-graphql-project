import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from '../../../../src/main/front/components/LoadingSpinner';


describe('<LoadingSpinner /> tests', () => {
  it('should render the LoadingSpinner properly', () => {
    const wrapper = shallow(<LoadingSpinner />);
    expect(wrapper.find('.loading-spinner-component-container .spinner').exists()).toBe(true);
    expect(wrapper.find('.loading-spinner-component-container span').text()).toBe('Loading...');
  });
});