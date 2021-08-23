/* eslint-disable */
import React, { useEffect, useState } from "react";
import ProjectOwner from "./ProjectOwner";
import ProjectDetails from "./ProjectDetails";
import ProjectDescription from "./ProjectDescription";
import ProjectReview from "./ProjectReview";
import { createProject, updateChannel } from "src/graphql/mutations";
import { getUser } from "src/graphql/queries";
import { Button } from "@material-ui/core";
import { API, Auth, graphqlOperation } from "aws-amplify";
import useAuth from "src/hooks/useAuth";

const ProjectAdd = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    manager: '',
    category: '',
    description: '',
    featuredImg: '',
    startDate: '',
    endDate: '',
    devStage: ''
  });
  const [project, setProject] = useState();
  const [projectCreated, setProjectCreated] = useState(false);
  // console.log('Project is created:', projectCreated)

  // Set state for User table
  const [userData, setUserData] = useState();

  // Get user attributes
  const { user } = useAuth();
  // console.log('user', user);

  // Load User table data
  useEffect(() => {
    getUserTable();
    console.log('user table:', userData)
  }, [])

  // API call to get User table data
  const getUserTable = async () => {
    try {
      const userInfo = await API.graphql(graphqlOperation(getUser, { id: user.id }));
      const userList = userInfo.data.getUser;
      setUserData(userList);
      console.log('list', userList);
    } catch (error) {
      console.log('error on fetching user table', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // console.log('Change:', formData)
  };
  const next = () => {
    setCurrentStep(currentStep + 1);
  };
  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  // const addProject = async () => {

  //   // Destructure formData
  //   const { name, description, category, operator, featuredImg, startDate, endDate, devStage } = formData;
    
  //   // // Upload the featured image
  //   // const { key } = await Storage.put(`${userId}/${title}_${videoId}.mp4`, formatData, { contentType: 'video/*' });

  //   // Create Project Inputs
  //   const CreateProjectInput = {
  //     name: name,
  //     projectManagerId: userId,
  //     description: description,
  //     category: category,
  //     startDate: startDate,
  //     endDate: endDate,
  //     devStage: devStage
  //     // featuredImg: key // featured image input
  //   };

  //   try {
  //     console.log('Project Input', CreateProjectInput);

  //     // Create new project
  //     const newProject = await API.graphql(graphqlOperation(createProject, { input: CreateProjectInput }));
  //     const setNewProject = newProject.data.createProject;

  //     // Set project state with the items from the createProject mutation
  //     setProject(setNewProject);
      
  //     // Set projectCreated state to true so that channelUpdate will function
  //     setProjectCreated(true);
  //     console.log('project response:', setNewPhannel)
  //     console.log('project created:', projectCreated)
    
  //   } catch (error) {
  //     console.log('An error has occured on Project Creation', error)
  //   }
  // };

  // const channelUpdate = async (addProject) => {
  //   console.log('project update:', addProject)
  //   // Create User Inputs
  //   if(projectCreated === true) {
  //     console.log('new project data', project.id)

  //     // Data input for updateUser call
  //     const UpdateChannelInput = {
  //       id: user.channel.id,
  //       projects: project.id
  //     }

  //     // Updates the User table to include the newly created Channel. Only one channel is allowed per user
  //     // This will overwrite a channel if it exists in the user.channel field
  //     const upChannel = await API.graphql(graphqlOperation(updateChannel, { input: UpdateChannelInput }))
  //     console.log('User Updated!', upChannel) 

  //   }  
  // };

  async function addProject() {
    // Destructure formData
    const { name, description, category, operator, featuredImg, startDate, endDate, devStage } = formData;

    // Create Project Inputs
    const CreateProjectInput = {
      name: name,
      projectManagerId: user.id,
      projectChannelId: userData.channel.id,
      channelID: userData.channel.id,
      description: description,
      category: category,
      startDate: startDate,
      endDate: endDate,
      devStage: devStage
      // featuredImg: key // featured image input
    };

    // Create new project
    const newProject = await API.graphql(graphqlOperation(createProject, { input: CreateProjectInput }));
    // if (!newChannel.ok) {
    //   throw new Error('ERROR on creating new channel', console.error);
    // }
    console.log('New Project Added', newProject.data.createProject)
    return newProject.data.createProject;
    // const setNewChannel = newChannel.data.createChannel;
  }

  // async function Update() {
  //   // showPendingState();
  //   try {
  //     const response = await addProject();
  //     console.log('addProject', response);

  //     // Data input for updateUser call
  //     const UpdateChannelInput = {
  //       id: userData.channel.id,
  //       userChannelId: response.id
  //     }

  //     // Updates the User table to include the newly created Channel. Only one channel is allowed per user
  //     // This will overwrite a channel if it exists in the user.channel field
  //     const upChannel = await API.graphql(graphqlOperation(updateChannel, { input: UpdateChannelInput }))
  //     console.log('Channel Updated!', upChannel) 

  //   } catch (error) {
  //       console.log('error on channel update:', error);
  //   }
  // }


  switch (currentStep) {
    case 1:
      return (
        <ProjectDetails
          data={formData}
          handleChange={handleChange}
          next={next}
        />
      );
    case 2:
      return (
        <ProjectDescription
          data={formData}
          handleChange={handleChange}
          next={next}
          back={back}
        />
      );
    // case 3:
    //   return (
    //     <ProjectDescription
    //       data={formData}
    //       handleChange={handleChange}
    //       next={next}
    //       back={back}
    //     />
    //   );
    default:
      return (
        <>
          <ProjectReview data={formData} addProject={addProject} back={back} />
        </>
      );
  }
};
export default ProjectAdd;