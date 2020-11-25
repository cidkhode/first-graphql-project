const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const csvToJson = require('convert-csv-to-json');

const footballPlayers = csvToJson.fieldDelimiter('~').getJsonFromCsv('src/main/back/csv/football-data-new.csv');

console.log(footballPlayers);

const resolvers = {
  Query: {
    players: () => footballPlayers,
    player: (parent, args) => footballPlayers.find(f => f.id === args.id)
  }
};
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


