const { gql } = require('apollo-server');

const typeDefs = gql`
  type Player {
    RoundID: Int!,
    Match: Match!,
    TeamInitials: String!,
    CoachName: String!,
    LineUp: String!,
    ShirtNumber: Int!,
    PlayerName: String!,
    Position: String,
    Event: String
  }

  type Match {
    Year: Int!,
    Datetime: String!,
    Stage: String!,
    Stadium: String!,
    City: String!,
    HomeTeamName: String!,
    HomeTeamGoals: Int!,
    AwayTeamGoals: Int!,
    AwayTeamName: String!,
    WinConditions: String!,
    Attendance: String!,
    HalfTimeHomeGoals: Int!,
    HalfTimeAwayGoals: Int!,
    Referee: String!,
    Assistant1: String!,
    Assistant2: String!,
    RoundID: String!,
    MatchID: String!,
    HomeTeamInitials: String!,
    AwayTeamInitials: String!,
    GameResultForPlayer: String!,
    WorldCupWinnerInThatYear: String!
  }

  type Cup {
    Year: String!,
    Country: String!,
    Winner: String!,
    RunnersUp: String!,
    Third: String!,
    Fourth: String!,
    GoalsScored: Int!,
    QualifiedTeams: Int!,
    MatchesPlayed: Int!,
    Attendance: String!,
    Matches: [Match]!,
    Match(MatchID: String!): Match,
  }

  type Query {
    players: [Player]
    player(name: String!): Player
    matches: [Match]
    match(MatchID: String!): Match,
    cups: [Cup],
    cup(Year: String!): Cup,
    worldCupsPlayedByPlayer(name: String!): [Cup]
  }
`;

module.exports = typeDefs;
