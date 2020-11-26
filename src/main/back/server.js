const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const csvToJson = require('convert-csv-to-json');

const matches = csvToJson.fieldDelimiter('~').getJsonFromCsv('src/main/back/csv/world-cup-matches.csv');
const players = csvToJson.fieldDelimiter(',').getJsonFromCsv('src/main/back/csv/world-cup-players.csv');
const cups = csvToJson.fieldDelimiter(',').getJsonFromCsv('src/main/back/csv/world-cups.csv');

const resolvers = {
  Query: {
    players: () => players,
    player: (parent, args) => players.find(p => p.PlayerName === args.name),
    matches: () => matches,
    match: (parent, args) => matches.find(w => w.MatchID === args.id),
    cups: () => cups,
    cup: (parent, args) => cups.find(c => c.Year === args.year)
  },
  Player: {
    Match: (parent) => {
      const parentTeam = parent.TeamInitials;
      const match = matches.find(m => m.MatchID === parent.Match);
      const homeTeam = match.HomeTeamInitials;

      const homeTeamScore = match.HomeTeamGoals;
      const awayTeamScore = match.AwayTeamGoals;

      let GameResultForPlayer = '';
      if (parentTeam === homeTeam) {
        if (homeTeamScore > awayTeamScore) {
          GameResultForPlayer = 'W'
        } else {
          GameResultForPlayer = homeTeamScore < awayTeamScore ? 'L' : 'D' ;
        }
      } else {
        if (awayTeamScore > homeTeamScore) {
          GameResultForPlayer = 'W'
        } else {
          GameResultForPlayer = awayTeamScore < homeTeamScore ? 'L' : 'D' ;
        }
      }
      return {
        ...match,
        GameResultForPlayer
      }
    }
  },

};
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
