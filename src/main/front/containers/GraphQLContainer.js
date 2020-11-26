import React, { Component } from 'react';
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import Select from 'react-select'
import Table from '../components/Table';
import LoadingSpinner from '../components/LoadingSpinner';
import { columnDefinitions } from '../utils/constants';

import '../styles/GraphQL.less';

export default class GraphQLContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: `{
        players {
          id,name,
        }
      }`,
      colDefs: columnDefinitions
    }
  }

  onFilterUpdate = (selectedOptions) => {
    let queryParams = 'id,name,';
    const newColumnsToRender = columnDefinitions.map((c) => {
      const doesSelectedOptionsContainColAccessor = selectedOptions.filter(sel => sel.value === c.accessor).length > 0;
      if (doesSelectedOptionsContainColAccessor) {
        queryParams = queryParams + c.accessor + ',';
      }
      return {
        ...c,
        show: c.accessor === 'id' || c.accessor === 'name' ? true : doesSelectedOptionsContainColAccessor
      }
    });

    const updatedQuery = `{
        players {
          ${queryParams}
        }
      }`;
    console.log(`UPDATED QUERY`, updatedQuery);

    this.setState({ colDefs: newColumnsToRender, query: updatedQuery });
  };

  renderTableContent = (props) => {
    const { data, loading } = props;
    if (loading) {
      return <LoadingSpinner />;
    }
    if (data && data.players) {
      const { players } = data;
      return <Table columns={this.state.colDefs} data={players} />
    }
    return <div className="empty-content"/>;
  };

  render() {
    const testQuery = gql`${this.state.query}`;

    const filterOptions = [
      { value: 'birth_date', label: 'Birth Date' },
      { value: 'age', label: 'Age' },
      { value: 'positions', label: 'Positions' },
      { value: 'nationality', label: 'Nationality' },
      { value: 'club_team', label: 'Club' },
      { value: 'contract_end_year', label: 'Contract Until' },
      { value: 'wage_euro', label: 'Wage' },
      { value: 'value_euro', label: 'Value' },
      { value: 'preferred_foot', label: 'Preferred Foot' },
    ];

    const isProjectDoneYet = false; // still messing around with resolvers and new data sets so until I figure out how to tie this to the UI, I'll just not show the Select and Table
    return isProjectDoneYet ? (
      <div className="main-container">
        <Select
          isMulti
          options={filterOptions}
          name="players"
          onChange={this.onFilterUpdate}
        />
        <div className="table-container">
          <Query query={testQuery}>
            { props => this.renderTableContent(props) }
          </Query>
        </div>
      </div>
    ) : <div>Project not finished yet, try again later.</div>;
  }
}
