export const cupsPlayedByPlayerColDefs = [
  {
    Header: 'Year',
    accessor: 'Year'
  },
  {
    Header: 'Country',
    accessor: 'Country'
  },
  {
    Header: 'Winner',
    accessor: 'Winner'
  }
];

export const playersMatchDetailsColDefs = [
  {
    Header: 'Round ID',
    accessor: 'RoundID',
    show: false
  },
  {
    Header: 'Match ID',
    accessor: 'MatchID',
    show: true
  },
  {
    Header: 'Team Initials',
    accessor: 'TeamInitials'
  },
  {
    Header: 'Coach Name',
    accessor: 'CoachName',
    show: false
  },
  {
    Header: 'Started or Substituted',
    accessor: 'LineUp',
    show: false
  },
  {
    Header: 'Shirt Number',
    accessor: 'ShirtNumber',
    show: false
  },
  {
    Header: 'Player Name',
    accessor: 'PlayerName',
  },
  {
    Header: 'Position',
    accessor: 'Position',
    show: false
  },
  {
    Header: 'Event',
    accessor: 'Event',
    show: false
  }
];

export const playersMatchDetailsFilterOptions = [
  { value: 'RoundID', label: 'Round ID' },
  { value: 'CoachName', label: 'Coach Name' },
  { value: 'LineUp', label: 'Started or Substituted' },
  { value: 'ShirtNumber', label: 'Shirt Number' },
  { value: 'Position', label: 'Position' },
  { value: 'Event', label: 'Event' }
];

export const tableOptions = [
  { value: 'worldCupsPlayedByPlayer', label: 'World Cups Played By Player' },
  { value: 'matchesPlayedByPlayer', label: 'Matches Played By Player' }
]