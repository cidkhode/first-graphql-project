import React from 'react';
import { shallow } from 'enzyme';
import GraphQLContainer from '../../../../src/main/front/containers/GraphQLContainer';
import { columnDefinitions } from '../../../../src/main/front/utils/constants';

describe('<GraphQLContainer /> tests', () => {
  it('should render the LoadingSpinner properly', () => {
    const wrapper = shallow(<GraphQLContainer />);
    expect(wrapper.state().colDefs).toEqual(columnDefinitions);
    expect(wrapper.find('.main-container').children().length).toBe(1);
    expect(wrapper.find('.main-container Query').length).toBe(1);
  });

  it('should make sure class functions work as expected', () => {
    const wrapper = shallow(<GraphQLContainer />);
    const renderTableContent1 = shallow(wrapper.instance().renderTableContent({ data: { worldCupsPlayedByPlayer: [1,2,3] }, loading: false }));
    expect(renderTableContent1.find('.table-component-container').exists()).toBe(true);

    const renderTableContent2 = shallow(wrapper.instance().renderTableContent({ data: {}, loading: true }));
    expect(renderTableContent2.find('.loading-spinner-component-container').exists()).toBe(true);

    const renderTableContent3 = shallow(wrapper.instance().renderTableContent({}));
    expect(renderTableContent3.find('.empty-content').exists()).toBe(true);

    const renderSelectOptions1 = shallow(wrapper.instance().renderSelectOptions({ data: { uniquePlayers: [1,2,3] }, loading: false }));
    expect(renderSelectOptions1.find('.select-container').exists()).toBe(true);

    const renderSelectOptions2 = shallow(wrapper.instance().renderSelectOptions({ data: { }, loading: true }));
    expect(renderSelectOptions2.find('.loading-spinner-component-container').exists()).toBe(true);

    const renderSelectOptions3 = shallow(wrapper.instance().renderSelectOptions({}));
    expect(renderSelectOptions3.find('.empty-content').exists()).toBe(true);

  });
});