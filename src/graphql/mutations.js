/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChannel = /* GraphQL */ `
  mutation CreateChannel(
    $input: CreateChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    createChannel(input: $input, condition: $condition) {
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
export const updateChannel = /* GraphQL */ `
  mutation UpdateChannel(
    $input: UpdateChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    updateChannel(input: $input, condition: $condition) {
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
export const deleteChannel = /* GraphQL */ `
  mutation DeleteChannel(
    $input: DeleteChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    deleteChannel(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
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
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
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
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
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
export const createShowcase = /* GraphQL */ `
  mutation CreateShowcase(
    $input: CreateShowcaseInput!
    $condition: ModelShowcaseConditionInput
  ) {
    createShowcase(input: $input, condition: $condition) {
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
export const updateShowcase = /* GraphQL */ `
  mutation UpdateShowcase(
    $input: UpdateShowcaseInput!
    $condition: ModelShowcaseConditionInput
  ) {
    updateShowcase(input: $input, condition: $condition) {
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
export const deleteShowcase = /* GraphQL */ `
  mutation DeleteShowcase(
    $input: DeleteShowcaseInput!
    $condition: ModelShowcaseConditionInput
  ) {
    deleteShowcase(input: $input, condition: $condition) {
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
export const createSubscriptions = /* GraphQL */ `
  mutation CreateSubscriptions(
    $input: CreateSubscriptionsInput!
    $condition: ModelSubscriptionsConditionInput
  ) {
    createSubscriptions(input: $input, condition: $condition) {
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
export const updateSubscriptions = /* GraphQL */ `
  mutation UpdateSubscriptions(
    $input: UpdateSubscriptionsInput!
    $condition: ModelSubscriptionsConditionInput
  ) {
    updateSubscriptions(input: $input, condition: $condition) {
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
export const deleteSubscriptions = /* GraphQL */ `
  mutation DeleteSubscriptions(
    $input: DeleteSubscriptionsInput!
    $condition: ModelSubscriptionsConditionInput
  ) {
    deleteSubscriptions(input: $input, condition: $condition) {
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
export const createUserProjects = /* GraphQL */ `
  mutation CreateUserProjects(
    $input: CreateUserProjectsInput!
    $condition: ModelUserProjectsConditionInput
  ) {
    createUserProjects(input: $input, condition: $condition) {
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
export const updateUserProjects = /* GraphQL */ `
  mutation UpdateUserProjects(
    $input: UpdateUserProjectsInput!
    $condition: ModelUserProjectsConditionInput
  ) {
    updateUserProjects(input: $input, condition: $condition) {
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
export const deleteUserProjects = /* GraphQL */ `
  mutation DeleteUserProjects(
    $input: DeleteUserProjectsInput!
    $condition: ModelUserProjectsConditionInput
  ) {
    deleteUserProjects(input: $input, condition: $condition) {
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
