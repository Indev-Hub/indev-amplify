/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify';
import { listChannels } from '../../graphql/queries';
import awsconfig from '../../aws-exports';
import {
  Box,
  // Card,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';

Amplify.configure(awsconfig);

function ChannelBrowse() {
  const [channels, setChannels] = useState([]);
  const [showAddChannel, setShowAddChannel] = useState(false);

  useEffect(() => {
    fetchChannels();
  }, []);

  

  const fetchChannels = async () => {
    try {
      const channelData = await API.graphql(graphqlOperation(listChannels));
      const channelList = channelData.data.listChannels.items;
      console.log('Channel List',channelList);
      console.log('User Info', Auth.currentSession());
      setChannels(channelList)
    } catch (error) {
      console.log('error on fetching channels', error);
    }
  };

  return (
    <Box>
      <Grid container className="Mapped Channels">
        {channels.map(channel => {
          return (
            <Grid item
              sx={{
                m: 2,
                p: 2
              }}>
                <Typography variant="h2">{channel.name}</Typography>
                <Typography>{channel.description}</Typography>
                <Typography>{channel.category}</Typography>
                <Typography>Target: ${channel.target}</Typography>
            </Grid>
          )
        })}
      </Grid>
      {showAddChannel ? (
        <AddChannel onUpload={() => {
          setShowAddChannel(false)
          fetchChannels()
        }}
        
        />
      ) : <IconButton onClick={() => setShowAddChannel(true)}> <AddIcon /></IconButton>
      }
    </Box>
  )
}

export default ChannelBrowse;

const AddChannel = ({ onUpload }) => {
  const uploadChannel = () => {
    onUpload();
  }
  return (
    <Box>
      <TextField label="Title" />
      <TextField label="Description" />
      <IconButton onClick={uploadChannel}> <PublishIcon /></IconButton>
    </Box>
  )
}