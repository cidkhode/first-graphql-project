import React from 'react';
import { shallow } from 'enzyme';
import GraphQLContainer from '../../../../src/main/front/containers/GraphQLContainer';
import { columnDefinitions } from '../../../../src/main/front/utils/constants';

describe('<GraphQLContainer /> tests', () => {
  it('should render the LoadingSpinner properly', () => {
    const wrapper = shallow(<GraphQLContainer />);
    expect(wrapper.state().query).toBe(`{
        players {
          id,name,
        }
      }`); // initial query should just be giving back id and name of players, nothing more
    expect(wrapper.state().colDefs).toEqual(columnDefinitions);
    expect(wrapper.find('.main-container').children().length).toBe(2);
    expect(wrapper.find('.main-container .table-container Query').exists()).toBe(true);
  });

  it('should make sure class functions work as expected', () => {
    const wrapper = shallow(<GraphQLContainer />);
    const renderTableContent1 = shallow(wrapper.instance().renderTableContent({ data: { players: [1,2,3] }, loading: false }));
    expect(renderTableContent1.find('.table-component-container').exists()).toBe(true);

    const renderTableContent2 = shallow(wrapper.instance().renderTableContent({ data: {}, loading: true }));
    expect(renderTableContent2.find('.loading-spinner-component-container').exists()).toBe(true);

    const renderTableContent3 = shallow(wrapper.instance().renderTableContent({}));
    expect(renderTableContent3.find('.empty-content').exists()).toBe(true);
  });
});