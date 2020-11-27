import React, { Component } from 'react';
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import Select from 'react-select'
import Table from '../components/Table';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  tableOptions,
  cupsPlayedByPlayerColDefs,
  playersMatchDetailsColDefs,
  playersMatchDetailsFilterOptions
} from '../utils/constants';

import '../styles/GraphQL.less';

export default class GraphQLContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colDefsForQuery1: cupsPlayedByPlayerColDefs,
      colDefsForQuery2: playersMatchDetailsColDefs,
      dataKey: ''
    }
  }

  onFilterUpdate = (selectedOptions, queryNumber) => {
    const { colDefsForQuery2 } = this.state;
    switch(queryNumber) {
      case 1: {
        this.setState({ dataKey: selectedOptions.value });
        break;
      }
      case 2: {
        let name = selectedOptions.label;
        const mainQuery = `{
          worldCupsPlayedByPlayer(name:"${name}") {
            Country,
            Year,
            Winner
          }
        }`;

        this.setState({ mainQuery });
        break;
      }
      case 3: {
        const defaultCols = ['MatchID', 'PlayerName', 'TeamInitials'];
        let queryParams = defaultCols.join(',') + ',';
        const newColumnsToRender = colDefsForQuery2.map((c) => {
          const doesSelectedOptionsContainColAccessor = selectedOptions.filter(sel => sel.value === c.accessor).length > 0;
          if (doesSelectedOptionsContainColAccessor) {
            queryParams = queryParams + c.accessor + ',';
          }
          return {
            ...c,
            show: defaultCols.indexOf(c.accessor) >= 0 ? true : doesSelectedOptionsContainColAccessor
          }
        });

        const mainQuery = `{
          players {
            ${queryParams}
          }
        }`;

        this.setState({ colDefsForQuery2: newColumnsToRender, mainQuery });
        break;
      }
    }
  };

  renderTableContent = (props, dataKey = '') => {
    let colDefs = [];
    if (dataKey === 'matchesPlayedByPlayer') {
      dataKey = 'players';
      colDefs = playersMatchDetailsColDefs
    } else if (dataKey === 'worldCupsPlayedByPlayers') {
      colDefs = cupsPlayedByPlayerColDefs;
    }
    const { data, loading } = props;
    if (loading) {
      return <LoadingSpinner />;
    }
    if (data && data[dataKey]) {
      return <Table columns={colDefs} data={data[dataKey]} />;
    }
    return <div className="empty-content" />;
  };

  renderFirstTableContent = (props) => {
    const { data, loading } = props;
    if (loading) {
      return <LoadingSpinner />;
    }
    if (data && data.worldCupsPlayedByPlayer) {
      const { worldCupsPlayedByPlayer } = data;
      return <Table columns={this.state.colDefsForQuery1} data={worldCupsPlayedByPlayer} />
    }
    return <div className="empty-content"/>;
  };

  renderSecondTableContent = (props) => {
    const { data, loading } = props;
    if (loading) {
      return <LoadingSpinner />;
    }
    if (data && data.players) {
      const players = data.players.map(p => ({
        ...p,
        LineUp: p.LineUp === 'S' ? 'Started' : 'Substituted In'
      }));
      return <Table columns={this.state.colDefsForQuery2} data={players} />
    }
    return <div className="empty-content"/>;
  };

  renderMainContent = () => {
    if (this.state.dataKey === 'worldCupsPlayedByPlayer') {
      const query = gql`
        {
          uniquePlayers
        }
      `;
      return (
        <Query query={query}>
          {
            (props) => {
              const { data, loading } = props;
              if (loading) {
                return <LoadingSpinner/>;
              }
              if (data && data.uniquePlayers) {
                const { uniquePlayers } = data;
                const options = uniquePlayers.map((p, k) => ({
                  value: k,
                  label: p
                }));

                return (
                  <div className="select-container second-select">
                    <span className="select-hint">Select a player to see what world cups they played in</span>
                    <Select
                      options={options}
                      name="players"
                      onChange={(selOption) => this.onFilterUpdate(selOption, 2)}
                    />
                    {
                      this.state.mainQuery && (
                        <Query query={gql`${this.state.mainQuery}`}>
                          {
                            mainQueryProps => this.renderMainTableContent(mainQueryProps)
                          }
                        </Query>
                      )
                    }
                  </div>
                );
              }
              return <div className="empty-content" />;
            }
          }
        </Query>
      )
    } else if (this.state.dataKey === 'matchesPlayedByPlayer') {
      return (
        <div>
          <div className="select-container second-select">
            <span className="select-hint">Choose fields you want to see players' match details</span>
            <Select
              options={playersMatchDetailsFilterOptions}
              name="players"
              isMulti
              onChange={(selOptions) => this.onFilterUpdate(selOptions, 3)}
            />
          </div>
          {
            this.state.mainQuery && (
              <Query query={gql`${this.state.mainQuery}`}>
                {
                  props => this.renderMainTableContent(props)
                }
              </Query>
            )
          }
        </div>
      )
    }
  };

  renderMainTableContent = (props) => {
    if (this.state.dataKey === 'worldCupsPlayedByPlayer') {
      return this.renderFirstTableContent(props);
    } else if (this.state.dataKey === 'matchesPlayedByPlayer') {
      return this.renderSecondTableContent(props);
    }
  };

  render() {
    const { dataKey } = this.state;
    const isProjectDoneYet = true; // still messing around with resolvers and new data sets so until I figure out how to tie this to the UI, I'll just not show the Select and Table
    return isProjectDoneYet ? (
      <div className="main-container">
        <div className="select-container first-select">
          <span className="select-hint">Select type of table you want to see:</span>
          <Select
            options={tableOptions}
            onChange={(selOption) => this.onFilterUpdate(selOption,1)}
            name="table-options"
          />
        </div>
        {
          dataKey && (
            <div className="data-container">
              {
                this.renderMainContent()
              }
            </div>
          )
        }
      </div>
    ) : <div>Project not finished yet, try again later.</div>;
  }
}
