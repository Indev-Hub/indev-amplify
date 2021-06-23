/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChannel = /* GraphQL */ `
  query GetChannel($id: ID!) {
    getChannel(id: $id) {
      id
      name
      manager {
        id
        firstName
        lastName
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
          displayName
          email
          role
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
export const listChannels = /* GraphQL */ `
  query ListChannels(
    $filter: ModelChannelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChannels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        manager {
          id
          firstName
          lastName
          displayName
          email
          role
          createdAt
          updatedAt
        }
        supporters {
          nextToken
        }
        description
        category
        operator
        target
        projects {
          id
          name
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
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      displayName
      email
      supporting {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      developing {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      channel {
        id
        name
        manager {
          id
          firstName
          lastName
          displayName
          email
          role
          createdAt
          updatedAt
        }
        supporters {
          nextToken
        }
        description
        category
        operator
        target
        projects {
          id
          name
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
      role
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      manager {
        id
        firstName
        lastName
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
        createdAt
        updatedAt
      }
      developers {
        items {
          id
          createdAt
          updatedAt
        }
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
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        manager {
          id
          firstName
          lastName
          displayName
          email
          role
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
      nextToken
    }
  }
`;
export const getShowcase = /* GraphQL */ `
  query GetShowcase($id: ID!) {
    getShowcase(id: $id) {
      id
      title
      orig_title
      orig_videoUrl
      videos
      createdAt
      updatedAt
    }
  }
`;
export const listShowcases = /* GraphQL */ `
  query ListShowcases(
    $filter: ModelShowcaseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShowcases(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        orig_title
        orig_videoUrl
        videos
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSubscriptions = /* GraphQL */ `
  query GetSubscriptions($id: ID!) {
    getSubscriptions(id: $id) {
      id
      channel {
        id
        name
        manager {
          id
          firstName
          lastName
          displayName
          email
          role
          createdAt
          updatedAt
        }
        supporters {
          nextToken
        }
        description
        category
        operator
        target
        projects {
          id
          name
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
      user {
        id
        firstName
        lastName
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSubscriptionss = /* GraphQL */ `
  query ListSubscriptionss(
    $filter: ModelSubscriptionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscriptionss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
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
        user {
          id
          firstName
          lastName
          displayName
          email
          role
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserProjects = /* GraphQL */ `
  query GetUserProjects($id: ID!) {
    getUserProjects(id: $id) {
      id
      project {
        id
        name
        manager {
          id
          firstName
          lastName
          displayName
          email
          role
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
      user {
        id
        firstName
        lastName
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserProjectss = /* GraphQL */ `
  query ListUserProjectss(
    $filter: ModelUserProjectsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProjectss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        project {
          id
          name
          description
          category
          devs
          target
          featuredImg
          createdAt
          updatedAt
        }
        user {
          id
          firstName
          lastName
          displayName
          email
          role
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
