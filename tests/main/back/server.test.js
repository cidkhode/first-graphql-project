const { ApolloServer, gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const typeDefs = require('../../../src/main/back/schema');
const resolvers = require('../../../src/main/back/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { query } = createTestClient(server);

describe('resolver tests', () => {
  it('should return back the details of a specific match in a specific world cup', async () => {
    const FIND_MATCH_DETAILS = gql`
    {
      cup(Year: "2014"){
        Match(MatchID: "300186469") {
          Attendance,
          Referee,
          Stadium
        }
      }
    }
  `;

    const {
      data: {
        cup: {
          Match
        }
      }
    } = await query({ query: FIND_MATCH_DETAILS });

    expect(Match).toEqual({
      Attendance: '41876',
      Referee: 'Ravshan IRMATOV (UZB)',
      Stadium: 'Arena Pernambuco'
    });
  });

  it('should return back the list of world cups played by a player', async () => {
    const FIND_WORLD_CUPS_PLAYED_BY_PLAYER = gql`
    {
      worldCupsPlayedByPlayer(name:"messi") {
        Country,
        Year,
        Winner
      }
    }
  `;

    const {
      data: {
        worldCupsPlayedByPlayer
      }
    } = await query({ query: FIND_WORLD_CUPS_PLAYED_BY_PLAYER });

    expect(worldCupsPlayedByPlayer).toEqual([
      {
        Country: 'Germany',
        Year: '2006',
        Winner: 'Italy'
      },
      {
        Country: 'South Africa',
        Year: '2010',
        Winner: 'Spain'
      },
      {
        Country: 'Brazil',
        Year: '2014',
        Winner: 'Germany'
      }
    ]);
  });
});