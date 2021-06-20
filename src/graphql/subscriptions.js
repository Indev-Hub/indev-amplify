/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChannel = /* GraphQL */ `
  subscription OnCreateChannel {
    onCreateChannel {
      id
      name
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
        createdAt
        updatedAt
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
        createdAt
        updatedAt
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
        createdAt
        updatedAt
      }
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
      description
      category
      devs
      target
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
      description
      category
      devs
      target
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
      description
      category
      devs
      target
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
      orig_title
      orig_videoUrl
      videos {
        items {
          id
          orig_title
          title
          url
          description
          duration
          order
          showcaseId
          ownerId
          ownerName
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
export const onUpdateShowcase = /* GraphQL */ `
  subscription OnUpdateShowcase {
    onUpdateShowcase {
      id
      title
      orig_title
      orig_videoUrl
      videos {
        items {
          id
          orig_title
          title
          url
          description
          duration
          order
          showcaseId
          ownerId
          ownerName
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
export const onDeleteShowcase = /* GraphQL */ `
  subscription OnDeleteShowcase {
    onDeleteShowcase {
      id
      title
      orig_title
      orig_videoUrl
      videos {
        items {
          id
          orig_title
          title
          url
          description
          duration
          order
          showcaseId
          ownerId
          ownerName
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
export const onCreateVideo = /* GraphQL */ `
  subscription OnCreateVideo {
    onCreateVideo {
      id
      orig_title
      title
      url
      description
      duration
      order
      showcaseId
      ownerId
      ownerName
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateVideo = /* GraphQL */ `
  subscription OnUpdateVideo {
    onUpdateVideo {
      id
      orig_title
      title
      url
      description
      duration
      order
      showcaseId
      ownerId
      ownerName
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteVideo = /* GraphQL */ `
  subscription OnDeleteVideo {
    onDeleteVideo {
      id
      orig_title
      title
      url
      description
      duration
      order
      showcaseId
      ownerId
      ownerName
      createdAt
      updatedAt
    }
  }
`;
