/* eslint-disable */
import React, { useEffect, useState } from "react";
import ChannelOwner from "./ChannelOwner";
import ChannelDetails from "./ChannelDetails";
import ChannelDescription from "./ChannelDescription";
import ChannelReview from "./ChannelReview";
import { createChannel, updateUser } from "src/graphql/mutations";
import { Button } from "@material-ui/core";
import { API, Auth, graphqlOperation } from "aws-amplify";
import useAuth from "src/hooks/useAuth";

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
  const [channel, setChannel] = useState();
  const [channelCreated, setChannelCreated] = useState(false);
  // console.log('Channel is created:', channelCreated)

  // Get user attributes
  const { user } = useAuth();
  // console.log('user', user)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const next = () => {
    setCurrentStep(currentStep + 1);
  };
  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  async function addChannel() {
    try {
      // Destructure formData
      const { name, description, category, operator, featuredImg } = formData;

      // Create Channel Inputs
      const CreateChannelInput = {
        name: name,
        channelManagerId: user.id,
        description: description,
        category: category,
        operator: operator,
        // featuredImg: key // featured image input
      };

      // Create new channel
      const newChannel = await API.graphql(graphqlOperation(createChannel, { input: CreateChannelInput }));
      console.log('newChannel:', newChannel)
      return newChannel.data.createChannel;
      
    } catch (error) {
      console.log('An error occurred when trying to create your channel:', error);
    }
  }

  async function Update() {
    // showPendingState();
    try {
      const response = await addChannel();
      console.log('addChannel', response);

      // Data input for updateUser call
      const UpdateUserInput = {
        id: user.id,
        userChannelId: response.id
      }

      // Updates the User table to include the newly created Channel. Only one channel is allowed per user
      // This will overwrite a channel if it exists in the user.channel field
      const upUser = await API.graphql(graphqlOperation(updateUser, { input: UpdateUserInput }))
      console.log('User Updated!', upUser) 

    } catch (error) {
        console.log('error on user update:', error);
    }
  }


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
          <ChannelReview data={formData} addChannel={Update} back={back} />
        </>
      );
  }
};
export default ChannelAdd;