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
      colDefs: columnDefinitions
    }
  }

  onFilterUpdate = (selectedOptions) => {
    let name = selectedOptions.label;
    const updatedQuery = `{
      worldCupsPlayedByPlayer(name:"${name}") {
        Country,
        Year,
        Winner
      }
    }`;

    this.setState({ query: updatedQuery });
  };

  renderTableContent = (props) => {
    const { data, loading } = props;
    if (loading) {
      return <LoadingSpinner />;
    }
    if (data && data.worldCupsPlayedByPlayer) {
      const { worldCupsPlayedByPlayer } = data;
      return <Table columns={this.state.colDefs} data={worldCupsPlayedByPlayer} />
    }
    return <div className="empty-content"/>;
  };

  renderSelectOptions = (props) => {
    const { data, loading } = props;
    if (loading) {
      return <LoadingSpinner />
    }
    if (data && data.uniquePlayers) {
      const { uniquePlayers } = data;
      const options = uniquePlayers.map((p, k) => ({
        value: k,
        label: p
      }));

      return (
        <div className="select-container">
          <span>Select a player to see what world cups they played in</span>
          <Select
            options={options}
            name="players"
            onChange={this.onFilterUpdate}
          />
        </div>
      )
    }
    return <div className="empty-content"/>;
  };

  render() {
    const testQuery = this.state.query ? gql`${this.state.query}` : null;
    const selectQuery = gql`
      {
        uniquePlayers
      }
    `;

    const isProjectDoneYet = true; // still messing around with resolvers and new data sets so until I figure out how to tie this to the UI, I'll just not show the Select and Table
    return isProjectDoneYet ? (
      <div className="main-container">
        <Query query={selectQuery}>
          {
            props => this.renderSelectOptions(props)
          }
        </Query>
        {
          this.state.query &&
          <Query query={testQuery}>
            {
              props => this.renderTableContent(props)
            }
          </Query>
        }
      </div>
    ) : <div>Project not finished yet, try again later.</div>;
  }
}
