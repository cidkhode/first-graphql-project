const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const csvToJson = require('convert-csv-to-json');

const matches = csvToJson.fieldDelimiter('~').getJsonFromCsv('src/main/back/csv/world-cup-matches.csv');
const players = csvToJson.fieldDelimiter(',').getJsonFromCsv('src/main/back/csv/world-cup-players.csv');
const cups = csvToJson.fieldDelimiter(',').getJsonFromCsv('src/main/back/csv/world-cups.csv');

/*
  sample query 1 - finds out all match details for each player
  {
    players {
      PlayerName,
      Event,
      Match {
        MatchID,
        Attendance,
        Year,
        GameResultForPlayer
      }
    }
  }

  sample query 2 - finds out attendances of each match in a world cup for a given year
  {
    cup(Year: "2014"){
      Matches {
        Attendance,
        Referee,
        Stadium
      }
    }
  }

  sample query 3 - finds out specific details of a match in a given world cup
  {
    cup(Year: "2014"){
      Match(MatchID: "300186469") {
        Attendance,
        Referee,
        Stadium
      }
    }
  }

  sample query 4 - finds out who won the cup whenever a certain player was playing
  {
    worldCupsPlayedByPlayer(name:"messi") {
      Country,
      Year,
      Winner
    }
  }
*/

const resolvers = {
  Query: {
    players: () => players,
    player: (parent, args) => players.find(p => p.PlayerName.toLowerCase() === args.name.toLowerCase()),
    worldCupsPlayedByPlayer: (parent, args) => {
      const playersList = players.filter(p => p.PlayerName.toLowerCase() === args.name.toLowerCase());
      const matchDetails = [];
      playersList.forEach(p => {
        matchDetails.push(matches.find(m => m.MatchID === p.Match))
      });
      const matchYears = [...new Set(matchDetails.map(item => item.Year))];
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
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
