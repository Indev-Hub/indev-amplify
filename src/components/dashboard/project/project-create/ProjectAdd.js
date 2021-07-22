/* eslint-disable */
import React, { useState } from "react";
import ProjectOwner from "./ProjectOwner";
import ProjectDetails from "./ProjectDetails";
import ProjectDescription from "./ProjectDescription";
import ProjectReview from "./ProjectReview";
import { createProject } from "src/graphql/mutations";
import { Button } from "@material-ui/core";
import { API, Auth, graphqlOperation } from "aws-amplify";

const ProjectAdd = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    manager: '',
    operator: '',
    category: '',
    description: '',
    featuredImg: ''  
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log('Change:', formData)
  };
  const next = () => {
    setCurrentStep(currentStep + 1);
  };
  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  const addProject = async () => {
    // Get user attributes
    const { signInUserSession } = await Auth.currentAuthenticatedUser();
    const userName = signInUserSession.accessToken.payload.username;
    const userId = signInUserSession.accessToken.payload.sub

    console.log('user name', userName);
    console.log('user id', userId);

    // // Upload the featured image
    const { name, description, category, operator, featuredImg } = formData;
    // const { key } = await Storage.put(`${userId}/${title}_${videoId}.mp4`, formatData, { contentType: 'video/*' });

    // Create Project Inputs
    const CreateProjectInput = {
      name: name,
      ProjectManagerId: userId,
      description: description,
      category: category,
      operator: operator,
      // featuredImg: key // featured image input
    };
    console.log('Project Name', name);
    console.log('Project Input', CreateProjectInput);
    await API.graphql(graphqlOperation(createProject, { input: CreateProjectInput }));
    console.log('Project Name', name);
    // onUpload();
  };

  switch (currentStep) {
    case 1:
      return (
        <ProjectOwner
          data={formData}
          handleChange={handleChange}
          next={next}
        />
      );
    case 2:
      return (
        <ProjectDetails
          data={formData}
          handleChange={handleChange}
          next={next}
          back={back}
        />
      );
    case 3:
      return (
        <ProjectDescription
          data={formData}
          handleChange={handleChange}
          next={next}
          back={back}
        />
      );
    default:
      return (
        <>
          <ProjectReview data={formData} addProject={addProject} back={back} />
        </>
      );
  }
};
export default ProjectAdd;