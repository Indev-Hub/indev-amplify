/* eslint-disable */

export const getChannelByManager = /* GraphQL */ `
  query GetChannelByManager($id: ID!) {
    getChannelByManager(id: $id) {
      id
      name
      manager {
        id
        firstName
        lastName
        username
        displayName
        email
        supporting {
          nextToken
        }
        developing {
          nextToken
        }
        channel {
          id
          name
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
        role
        canHire
        createdAt
        updatedAt
      }
      supporters {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      description
      category
      operator
      target
      projects {
        id
        name
        manager {
          id
          firstName
          lastName
          username
          displayName
          email
          role
          canHire
          createdAt
          updatedAt
        }
        developers {
          nextToken
        }
        description
        category
        devs
        target
        featuredImg
        createdAt
        updatedAt
      }
      featuredImg {
        bucket
        key
        region
      }
      createdAt
      updatedAt
    }
  }
`;