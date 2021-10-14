import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

// Initialize Apollo Client
export const client = new ApolloClient({
  uri: 'https://gitlab.com/api/graphql',
  cache: new InMemoryCache(),
});

export const PROJECTS_QUERY = gql`
  query GetProjects($search: String, $first: Int = 10) {
    projects(search: $search, first: $first) {
      nodes {
        name
        id
        description
        webUrl
        fullPath
        createdAt
        archived
      }
    }
  }
`;
