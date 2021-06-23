/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Amplify, { API, Auth, graphqlOperation, Storage } from 'aws-amplify';
import { listVideos } from '../../graphql/queries';
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
import FileDropzone from 'src/components/FileDropzone';
import { v4 as uuid } from 'uuid';
import { createVideo } from 'src/graphql/mutations';

Amplify.configure(awsconfig);

function VideoUpdate() {
  const [videos, setVideos] = useState([]);
  const [showAddVideo, setShowAddVideo] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  // const userGroup = currentUser.accessToken.payload["cognito:groups"];
  // const userId = currentUser.accessToken.payload.sub;
 
  const currentUser = async () => {
    let user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    const current = user.attributes.sub;

    console.log('User Info 2', current);

    return ("This");
  }

  const fetchVideos = async () => {
    try {
      const videoData = await API.graphql(graphqlOperation(listVideos));
      const videoList = videoData.data.listVideos.items;
      console.log('Video List',videoList);
      console.log('user info', currentUser());
      setVideos(videoList)
    } catch (error) {
      console.log('error on fetching videos', error);
    }
  };

  return (
    <Box>
      <Typography variant="h2">{currentUser}</Typography>
      <Grid container className="Mapped Videos">
        {videos.map(video => {
          return (
            <Grid item
              sx={{
                m: 2,
                p: 2
              }}>
                <Typography variant="h2">{video.name}</Typography>
                <Typography>{video.description}</Typography>
                <Typography>{video.category}</Typography>
                <Typography>Target: ${video.target}</Typography>
            </Grid>
          )
        })}
      </Grid>
      {showAddVideo ? (
        <AddVideo onUpload={() => {
          setShowAddVideo(false)
          fetchVideos()
          currentUser()
        }}
        
        />
      ) : <IconButton onClick={() => setShowAddVideo(true)}> <AddIcon /></IconButton>
      }
    </Box>
  )
}

export default VideoUpdate;

const AddVideo = ({ onUpload }) => {
  const [videoData, setVideoData] = useState({});
  const [vidFormatData, setVidFormatData] = useState();

  const uploadVideo = async () => {
    console.log('videoData', videoData);
    const { title, description, ownerId, ownerName, order, showcase } = videoData;
    const { key } = await Storage.put(`video_${uuid()}.mp4`, vidFormatData, {contentType: 'video/*'})

    let user = await Auth.currentAuthenticatedUser();
    const { attributes } = user;
    const current = user.attributes.sub;
    console.log('User Info 2', current);

    ownerId = current;
    console.log('Owner ID', ownerId);

    const createVideoInput = {
      id: uuid(),
      title,
      description,
      ownerId,
      ownerName,
      order,
      showcase,
      url: key
    }
    await API.graphql(graphqlOperation(createVideo, {input: createVideoInput}))
    onUpload();
  }
  return (
    <Box>
      <TextField
        label="Title"
        value={videoData.title}
        onChange={e => setVideoData({ ...videoData, title: e.target.value })}
      />
      <TextField
        label="Description"
        value={videoData.description}
        onChange={e => setVideoData({ ...videoData, description: e.target.value })}
      />
      {/* <TextField
        label="Owner ID"
        value={videoData.ownerId}
        onChange={e => setVideoData({ ...videoData, ownerId: e.target.value })}
      /> */}
      <TextField
        label="Owner Name"
        value={videoData.ownerName}
        onChange={e => setVideoData({ ...videoData, ownerName: e.target.value })}
      />
      <TextField
        type="Number"
        label="Order"
        value={videoData.order}
        onChange={e => setVideoData({ ...videoData, order: e.target.value })}
      />
      <FileDropzone
        accept="video/*"
        maxFiles={1}
        onChange={e => setVidFormatData(e.target.files[0])}
      />
      <IconButton onClick={uploadVideo}> <PublishIcon /></IconButton>
    </Box>
  )
}