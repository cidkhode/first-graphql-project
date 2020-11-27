import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import GraphQLContainer from './containers/GraphQLContainer';
import './index.css';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <GraphQLContainer />
  </ApolloProvider>,
  document.getElementById('app')
);
