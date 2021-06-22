/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Amplify, { API, Auth, graphqlOperation, Storage } from 'aws-amplify';
import { listVideos } from '../../graphql/queries';
import awsconfig from '../../aws-exports';
import {
  Box,
  // Card,
  // Grid,
  IconButton,
  TextField,
  // Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PublishIcon from '@material-ui/icons/Publish';
import FileDropzone from 'src/components/FileDropzone';
import { v4 as uuid } from 'uuid';
import { createVideo } from 'src/graphql/mutations';

Amplify.configure(awsconfig);

const AddVideo = ({ onUpload }) => {
  const [videoData, setVideoData] = useState({});
  const [vidFormatData, setVidFormatData] = useState();



  const uploadVideo = async () => {
    console.log('videoData', videoData);
    const { title, description, order, showcase } = videoData;
    const { key } = await Storage.put(`video_${uuid()}.mp4`, vidFormatData, {contentType: 'video/*'})

    const ownerId = Auth.user.attributes.sub;
    const ownerName = Auth.user.attributes.username;
    console.log('Owner ID', ownerId);
    console.log('Owner Username', ownerName);

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
        sx={{
          m:1
        }}
        onChange={e => setVideoData({ ...videoData, title: e.target.value })}
      />
      <TextField
        label="Description"
        value={videoData.description}
        sx={{
          m:1
        }}
        onChange={e => setVideoData({ ...videoData, description: e.target.value })}
      />
      {/* <TextField
        label="Owner ID"
        placeholder={Auth.user.attributes.email}
        value={videoData.ownerId}
        sx={{
          m:1
        }}
        onChange={e => setVideoData({ ...videoData, ownerId: e.target.value })}
      />
      <TextField
        label="Owner Name"
        value={videoData.ownerName}
        sx={{
          m:1
        }}
        onChange={e => setVideoData({ ...videoData, ownerName: e.target.value })}
      /> */}
      <TextField
        type="Number"
        label="Order"
        value={videoData.order}
        sx={{
          m:1
        }}
        onChange={e => setVideoData({ ...videoData, order: e.target.value })}
      />
      <FileDropzone
        accept="video/*"
        maxFiles={1}
        sx={{
          m:1
        }}
        onChange={e => setVidFormatData(e.target.files[0])}
      />
      <IconButton onClick={uploadVideo}> <PublishIcon /></IconButton>
    </Box>
  )
}

function UploadVideo() {
  const [videos, setVideos] = useState([]);
  const [showAddVideo, setShowAddVideo] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const videoData = await API.graphql(graphqlOperation(listVideos));
      const videoList = videoData.data.listVideos.items;
      setVideos(videoList)
    } catch (error) {
      console.log('error on fetching videos', error);
    }
  };

  return (
    <Box>
      {showAddVideo ? (
        <AddVideo onUpload={() => {
          setShowAddVideo(false)
          fetchVideos()
        }}
        
        />
      ) : <IconButton onClick={() => setShowAddVideo(true)}> <AddIcon />Add Video</IconButton>
      }
    </Box>
  )
}

export default UploadVideo;

