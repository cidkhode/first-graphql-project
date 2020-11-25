import axios from 'axios';

describe('resolver tests', () => {
  test('player with id', async () => { // as the data is very large, I proceeded to write a test for a resolver that resolved the player query by supplying it with an argument "id"
    const resp = await axios.post('http://localhost:4000/graphql', {
      query: `
        query {
          player(id:"41") {
            name,
            age,
            positions
          }
        }
      `,
    });

    const { data } = resp;
    expect(data).toMatchObject({
      data: {
        player: {
          name: 'Iniesta',
          age: 34,
          positions: 'CM,LM'
        }
      }
    });
  });
});
