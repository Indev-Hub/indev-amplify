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
        username
        displayName
        canHire
        email
        supporting {
          id
          name
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
        developing {
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
        id
        firstName
        lastName
        username
        displayName
        canHire
        email
        supporting {
          id
          name
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
        developing {
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
          canHire
          email
          role
          createdAt
          updatedAt
        }
        developers {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
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
        username
        displayName
        canHire
        email
        supporting {
          id
          name
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
        developing {
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
        id
        firstName
        lastName
        username
        displayName
        canHire
        email
        supporting {
          id
          name
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
        developing {
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
          canHire
          email
          role
          createdAt
          updatedAt
        }
        developers {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
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
        username
        displayName
        canHire
        email
        supporting {
          id
          name
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
        developing {
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
        id
        firstName
        lastName
        username
        displayName
        canHire
        email
        supporting {
          id
          name
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
        developing {
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
          canHire
          email
          role
          createdAt
          updatedAt
        }
        developers {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
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
      username
      displayName
      canHire
      email
      supporting {
        id
        name
        manager {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
        }
        supporters {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
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
      developing {
        id
        name
        manager {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
        }
        developers {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
        }
        description
        category
        devs
        target
        featuredImg
        createdAt
        updatedAt
      }
      channel {
        id
        name
        manager {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
        }
        supporters {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
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
      username
      displayName
      canHire
      email
      supporting {
        id
        name
        manager {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
        }
        supporters {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
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
      developing {
        id
        name
        manager {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
        }
        developers {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
        }
        description
        category
        devs
        target
        featuredImg
        createdAt
        updatedAt
      }
      channel {
        id
        name
        manager {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
        }
        supporters {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
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
      username
      displayName
      canHire
      email
      supporting {
        id
        name
        manager {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
        }
        supporters {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
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
      developing {
        id
        name
        manager {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
        }
        developers {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
        }
        description
        category
        devs
        target
        featuredImg
        createdAt
        updatedAt
      }
      channel {
        id
        name
        manager {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
        }
        supporters {
          id
          firstName
          lastName
          username
          displayName
          canHire
          email
          role
          createdAt
          updatedAt
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
        username
        displayName
        canHire
        email
        supporting {
          id
          name
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
        developing {
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
        id
        firstName
        lastName
        username
        displayName
        canHire
        email
        supporting {
          id
          name
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
        developing {
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
        username
        displayName
        canHire
        email
        supporting {
          id
          name
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
        developing {
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
        id
        firstName
        lastName
        username
        displayName
        canHire
        email
        supporting {
          id
          name
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
        developing {
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
        username
        displayName
        canHire
        email
        supporting {
          id
          name
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
        developing {
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
        id
        firstName
        lastName
        username
        displayName
        canHire
        email
        supporting {
          id
          name
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
        developing {
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
      manager
      managerID
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
      manager
      managerID
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
      manager
      managerID
      videos
      createdAt
      updatedAt
    }
  }
`;
