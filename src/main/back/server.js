const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

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


const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
