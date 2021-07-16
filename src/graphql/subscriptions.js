/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChannel = /* GraphQL */ `
  subscription OnCreateChannel {
    onCreateChannel {
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
export const onUpdateChannel = /* GraphQL */ `
  subscription OnUpdateChannel {
    onUpdateChannel {
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
export const onDeleteChannel = /* GraphQL */ `
  subscription OnDeleteChannel {
    onDeleteChannel {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      firstName
      lastName
      username
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
          username
          displayName
          email
          role
          canHire
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
      canHire
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      firstName
      lastName
      username
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
          username
          displayName
          email
          role
          canHire
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
      canHire
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      firstName
      lastName
      username
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
          username
          displayName
          email
          role
          canHire
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
      canHire
      createdAt
      updatedAt
    }
  }
`;
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject {
    onUpdateProject {
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject {
    onDeleteProject {
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
export const onCreateShowcase = /* GraphQL */ `
  subscription OnCreateShowcase {
    onCreateShowcase {
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
export const onUpdateShowcase = /* GraphQL */ `
  subscription OnUpdateShowcase {
    onUpdateShowcase {
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
export const onDeleteShowcase = /* GraphQL */ `
  subscription OnDeleteShowcase {
    onDeleteShowcase {
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
export const onCreateSubscriptions = /* GraphQL */ `
  subscription OnCreateSubscriptions {
    onCreateSubscriptions {
      id
      channel {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSubscriptions = /* GraphQL */ `
  subscription OnUpdateSubscriptions {
    onUpdateSubscriptions {
      id
      channel {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSubscriptions = /* GraphQL */ `
  subscription OnDeleteSubscriptions {
    onDeleteSubscriptions {
      id
      channel {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserProjects = /* GraphQL */ `
  subscription OnCreateUserProjects {
    onCreateUserProjects {
      id
      project {
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
      user {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserProjects = /* GraphQL */ `
  subscription OnUpdateUserProjects {
    onUpdateUserProjects {
      id
      project {
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
      user {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserProjects = /* GraphQL */ `
  subscription OnDeleteUserProjects {
    onDeleteUserProjects {
      id
      project {
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
      user {
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
      createdAt
      updatedAt
    }
  }
`;
