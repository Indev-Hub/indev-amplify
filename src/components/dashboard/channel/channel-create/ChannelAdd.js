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

  // useEffect(() => {
  //   userUpdate();
  // }, [channelCreated])

  // Get user attributes
  const { user } = useAuth();
  console.log('user', user)

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

  const addChannel = async () => {
    // console.log('user name', userName);
    // console.log('user id', user.id);

    // Destructure formData
    const { name, description, category, operator, featuredImg } = formData;

    // // Upload the featured image
    // const { key } = await Storage.put(`${user.id}/${title}_${videoId}.mp4`, formatData, { contentType: 'video/*' });

    // Create Channel Inputs
    const CreateChannelInput = {
      name: name,
      channelManagerId: user.id,
      description: description,
      category: category,
      operator: operator,
      // featuredImg: key // featured image input
    };

    try {
    console.log('Channel Input', CreateChannelInput);

    // Create new channel
    const newChannel = await API.graphql(graphqlOperation(createChannel, { input: CreateChannelInput }));
    const setNewChannel = newChannel.data.createChannel;

    // Set channel state with the items from the createChannel mutation
    setChannel(setNewChannel);

    // Set channelCreated state to true so that userUpdate will function
    setChannelCreated(true);
    console.log('channel response:', setNewChannel)
    console.log('channel created:', channelCreated)

     } catch (error) {
      console.log('An error has occured', error)
    }

   
  };

  const userUpdate = async (addChannel) => {
    console.log('channel update:', addChannel)
    // Create User Inputs
    if(channelCreated === true) {
      console.log('new channel data', channel.id)

      // Data input for updateUser call
      const UpdateUserInput = {
        id: user.id,
        userChannelId: channel.id
      }

      // Updates the User table to include the newly created Channel. Only one channel is allowed per user
      // This will overwrite a channel if it exists in the user.channel field
      const upUser = await API.graphql(graphqlOperation(updateUser, { input: UpdateUserInput }))
      console.log('User Updated!', upUser) 

    }  
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
          <ChannelReview data={formData} addChannel={userUpdate} back={back} />
        </>
      );
  }
};
export default ChannelAdd;