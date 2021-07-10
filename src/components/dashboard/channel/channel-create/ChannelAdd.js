/* eslint-disable */
import React, { useState } from "react";
import ChannelOwner from "./ChannelOwner";
import ChannelDetails from "./ChannelDetails";
import ChannelDescription from "./ChannelDescription";
import ChannelReview from "./ChannelReview";
import { createChannel } from "src/graphql/mutations";
import { Button } from "@material-ui/core";
import { API, Auth, graphqlOperation } from "aws-amplify";

const ChannelAdd = () => {
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

  const addChannel = async () => {
    // Get user attributes
    const { signInUserSession } = await Auth.currentAuthenticatedUser();
    const userName = signInUserSession.accessToken.payload.username;
    const userId = signInUserSession.accessToken.payload.sub

    console.log('user name', userName);
    console.log('user id', userId);

    // // Upload the featured image
    const { name, description, category, operator, featuredImg } = formData;
    // const { key } = await Storage.put(`${userId}/${title}_${videoId}.mp4`, formatData, { contentType: 'video/*' });

    // Create Channel Inputs
    const CreateChannelInput = {
      id: "001",
      name: name,
      manager: userId,
      description: description,
      category: category,
      operator: operator,
      // featuredImg: key // featured image input
    };
    console.log('Channel Name', name);
    console.log('Channel Input', CreateChannelInput);
    await API.graphql(graphqlOperation(createChannel, { input: CreateChannelInput }));
    console.log('Channel Name', name);
    // onUpload();
  };

  switch (currentStep) {
    case 1:
      return (
        <ChannelOwner
          data={formData}
          handleChange={handleChange}
          next={next}
        />
      );
    case 2:
      return (
        <ChannelDetails
          data={formData}
          handleChange={handleChange}
          next={next}
          back={back}
        />
      );
    case 3:
      return (
        <ChannelDescription
          data={formData}
          handleChange={handleChange}
          next={next}
          back={back}
        />
      );
    default:
      return (
        <>
          <ChannelReview data={formData} addChannel={addChannel} back={back} />
          <Button
            color="primary"
            onClick={addChannel}
            size="large"
            variant="contained"
          >
            Create Channel
          </Button>
        </>
      );
  }
};
export default ChannelAdd;