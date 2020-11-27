const csvToJson = require('convert-csv-to-json');

const matches = csvToJson.fieldDelimiter('~').getJsonFromCsv('src/main/back/csv/world-cup-matches.csv');
const players = csvToJson.fieldDelimiter(',').getJsonFromCsv('src/main/back/csv/world-cup-players.csv');
const cups = csvToJson.fieldDelimiter(',').getJsonFromCsv('src/main/back/csv/world-cups.csv');

const resolvers = {
  Query: {
    players: () => players,
    uniquePlayers: () => [...new Set(players.map(p => p.PlayerName))],
    player: (parent, args) => players.find(p => p.PlayerName.toLowerCase() === args.name.toLowerCase()),
    worldCupsPlayedByPlayer: (parent, args) => {
      const playersList = players.filter(p => p.PlayerName.toLowerCase() === args.name.toLowerCase());
      const matchDetails = [];
      playersList.forEach(p => {
        matchDetails.push(matches.find(m => m.MatchID === p.MatchID))
      });
      const matchYears = [...new Set(matchDetails.map(m => m.Year))];
      return cups.filter(c => matchYears.includes(c.Year));
    },
    matches: () => matches,
    match: (parent, args) => matches.find(w => w.MatchID === args.MatchID),
    cups: () => cups,
    cup: (parent, args) => cups.find(c => c.Year === args.Year)
  },
  Player: {
    Match: (parent) => {
      const parentTeam = parent.TeamInitials;
      const match = matches.find(m => m.MatchID === parent.MatchID);
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
      const WorldCupWinnerInThatYear = cups.find(c => c.Year === match.Year).Winner;
      return {
        ...match,
        GameResultForPlayer,
        WorldCupWinnerInThatYear
      }
    }
  },
  Cup: {
    Matches: (parent) => matches.filter(m => m.Year === parent.Year),
    Match: (_, args) => matches.find(m => m.MatchID === args.MatchID)
  }
};

module.exports = resolvers;