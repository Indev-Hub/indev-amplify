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
        canHire
        email
        supporting {
          id
          name
          supporters
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
          featuredImg
          startDate
          endDate
          devStage
          createdAt
          updatedAt
        }
        channel {
          id
          name
          supporters
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
      supporters
      description
      category
      operator
      target
      projects {
        items {
          id
          name
          description
          category
          featuredImg
          startDate
          endDate
          devStage
          createdAt
          updatedAt
        }
        nextToken
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
        canHire
        email
        supporting {
          id
          name
          supporters
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
          featuredImg
          startDate
          endDate
          devStage
          createdAt
          updatedAt
        }
        channel {
          id
          name
          supporters
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
      supporters
      description
      category
      operator
      target
      projects {
        items {
          id
          name
          description
          category
          featuredImg
          startDate
          endDate
          devStage
          createdAt
          updatedAt
        }
        nextToken
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
        canHire
        email
        supporting {
          id
          name
          supporters
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
          featuredImg
          startDate
          endDate
          devStage
          createdAt
          updatedAt
        }
        channel {
          id
          name
          supporters
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
      supporters
      description
      category
      operator
      target
      projects {
        items {
          id
          name
          description
          category
          featuredImg
          startDate
          endDate
          devStage
          createdAt
          updatedAt
        }
        nextToken
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
        supporters
        description
        category
        operator
        target
        projects {
          nextToken
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
        channel {
          id
          name
          supporters
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
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
        featuredImg
        startDate
        endDate
        devStage
        showcase {
          id
          title
          manager
          managerID
          videos
          createdAt
          updatedAt
        }
        updates {
          nextToken
        }
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
        supporters
        description
        category
        operator
        target
        projects {
          nextToken
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
        supporters
        description
        category
        operator
        target
        projects {
          nextToken
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
        channel {
          id
          name
          supporters
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
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
        featuredImg
        startDate
        endDate
        devStage
        showcase {
          id
          title
          manager
          managerID
          videos
          createdAt
          updatedAt
        }
        updates {
          nextToken
        }
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
        supporters
        description
        category
        operator
        target
        projects {
          nextToken
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
        supporters
        description
        category
        operator
        target
        projects {
          nextToken
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
        channel {
          id
          name
          supporters
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
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
        featuredImg
        startDate
        endDate
        devStage
        showcase {
          id
          title
          manager
          managerID
          videos
          createdAt
          updatedAt
        }
        updates {
          nextToken
        }
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
        supporters
        description
        category
        operator
        target
        projects {
          nextToken
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
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
      id
      name
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
        supporters
        description
        category
        operator
        target
        projects {
          nextToken
        }
        featuredImg {
          bucket
          key
          region
        }
        createdAt
        updatedAt
      }
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
          supporters
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
          featuredImg
          startDate
          endDate
          devStage
          createdAt
          updatedAt
        }
        channel {
          id
          name
          supporters
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
          supporters
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
          featuredImg
          startDate
          endDate
          devStage
          createdAt
          updatedAt
        }
        channel {
          id
          name
          supporters
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
      featuredImg
      startDate
      endDate
      devStage
      showcase {
        id
        title
        manager
        managerID
        videos
        createdAt
        updatedAt
      }
      updates {
        items {
          id
          name
          short
          content
          type
          createdAt
          updatedAt
        }
        nextToken
      }
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
        supporters
        description
        category
        operator
        target
        projects {
          nextToken
        }
        featuredImg {
          bucket
          key
          region
        }
        createdAt
        updatedAt
      }
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
          supporters
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
          featuredImg
          startDate
          endDate
          devStage
          createdAt
          updatedAt
        }
        channel {
          id
          name
          supporters
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
          supporters
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
          featuredImg
          startDate
          endDate
          devStage
          createdAt
          updatedAt
        }
        channel {
          id
          name
          supporters
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
      featuredImg
      startDate
      endDate
      devStage
      showcase {
        id
        title
        manager
        managerID
        videos
        createdAt
        updatedAt
      }
      updates {
        items {
          id
          name
          short
          content
          type
          createdAt
          updatedAt
        }
        nextToken
      }
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
        supporters
        description
        category
        operator
        target
        projects {
          nextToken
        }
        featuredImg {
          bucket
          key
          region
        }
        createdAt
        updatedAt
      }
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
          supporters
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
          featuredImg
          startDate
          endDate
          devStage
          createdAt
          updatedAt
        }
        channel {
          id
          name
          supporters
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
          supporters
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
          featuredImg
          startDate
          endDate
          devStage
          createdAt
          updatedAt
        }
        channel {
          id
          name
          supporters
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
      featuredImg
      startDate
      endDate
      devStage
      showcase {
        id
        title
        manager
        managerID
        videos
        createdAt
        updatedAt
      }
      updates {
        items {
          id
          name
          short
          content
          type
          createdAt
          updatedAt
        }
        nextToken
      }
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
export const onCreateUpdate = /* GraphQL */ `
  subscription OnCreateUpdate {
    onCreateUpdate {
      id
      project {
        id
        name
        channel {
          id
          name
          supporters
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
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
        featuredImg
        startDate
        endDate
        devStage
        showcase {
          id
          title
          manager
          managerID
          videos
          createdAt
          updatedAt
        }
        updates {
          nextToken
        }
        createdAt
        updatedAt
      }
      author {
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
          supporters
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
          featuredImg
          startDate
          endDate
          devStage
          createdAt
          updatedAt
        }
        channel {
          id
          name
          supporters
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
      name
      short
      content
      type
      coverImg {
        bucket
        key
        region
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUpdate = /* GraphQL */ `
  subscription OnUpdateUpdate {
    onUpdateUpdate {
      id
      project {
        id
        name
        channel {
          id
          name
          supporters
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
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
        featuredImg
        startDate
        endDate
        devStage
        showcase {
          id
          title
          manager
          managerID
          videos
          createdAt
          updatedAt
        }
        updates {
          nextToken
        }
        createdAt
        updatedAt
      }
      author {
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
          supporters
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
          featuredImg
          startDate
          endDate
          devStage
          createdAt
          updatedAt
        }
        channel {
          id
          name
          supporters
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
      name
      short
      content
      type
      coverImg {
        bucket
        key
        region
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUpdate = /* GraphQL */ `
  subscription OnDeleteUpdate {
    onDeleteUpdate {
      id
      project {
        id
        name
        channel {
          id
          name
          supporters
          description
          category
          operator
          target
          createdAt
          updatedAt
        }
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
        featuredImg
        startDate
        endDate
        devStage
        showcase {
          id
          title
          manager
          managerID
          videos
          createdAt
          updatedAt
        }
        updates {
          nextToken
        }
        createdAt
        updatedAt
      }
      author {
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
          supporters
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
          featuredImg
          startDate
          endDate
          devStage
          createdAt
          updatedAt
        }
        channel {
          id
          name
          supporters
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
      name
      short
      content
      type
      coverImg {
        bucket
        key
        region
      }
      createdAt
      updatedAt
    }
  }
`;
