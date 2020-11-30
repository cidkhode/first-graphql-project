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

    const firstTableContent1 = shallow(wrapper.instance().renderFirstTableContent({ data: {}, loading: true }));
    const firstTableContent2 = shallow(wrapper.instance().renderFirstTableContent({ data: { worldCupsPlayedByPlayer: [1, 2, 3] }, loading: false }));
    const firstTableContent3 = shallow(wrapper.instance().renderFirstTableContent({ data: {}, loading: false }));
    expect(firstTableContent1.find('.loading-spinner-component-container').exists()).toBe(true);
    expect(firstTableContent2.find('.table-component-container').exists()).toBe(true);
    expect(firstTableContent3.find('.empty-content').exists()).toBe(true);
  });
});