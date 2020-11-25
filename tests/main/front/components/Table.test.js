import React from 'react';
import { shallow } from 'enzyme';
import Table from '../../../../src/main/front/components/Table';

const setup = (baseProps = {}) => {
  const props = {
    extraClass: '',
    columns: [],
    data: [],
    ...baseProps
  };
  const wrapper = shallow(<Table {...props} />);
  return { wrapper, props };
};

describe('<Table /> tests', () => {
  it('should render the LoadingSpinner properly', () => {
    const { wrapper, props } = setup({ extraClass: 'mancity-is-the-best-team-ever' });
    expect(wrapper.find(`.table-component-container.${props.extraClass}`).exists()).toBe(true);
    expect(wrapper.find('ReactTable').props().data).toBe(props.data);
    expect(wrapper.find('ReactTable').props().columns).toBe(props.columns);
  });
});