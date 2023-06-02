export const USER_REPOSITORIES_QUERY = `query { 
  viewer { 
    repositories(first: 100 orderBy: {field: UPDATED_AT, direction: DESC} ) {
      edges {
        node {
          id
          name
          shortDescriptionHTML
          stargazerCount
          url
          updatedAt
          languages(first: 100) {
            edges {
              node {
                name
              }
            }
          }
          owner {
            login
            avatarUrl
          }
          
        }
      }
    }
  }
}`;

export const SEARCHED_REPOSITORIES_QUERY = `query($queryString: String!) { 
  search(first: 100 query: $queryString type: REPOSITORY) {
    edges {
      node {
        ... on Repository {
          id
          name
          shortDescriptionHTML
          stargazerCount
          url
          updatedAt
          languages(first: 100) {
            edges {
              node {
                name
              }
            }
          }
          owner {
            login
            avatarUrl
          }
        }
      }
    }
  }
}`