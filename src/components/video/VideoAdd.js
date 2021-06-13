/* eslint-disable */
import React, { useState } from 'react';
import { createVideo } from '../../graphql/mutations';
// import { v4 as uuid } from 'uuid';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import {
	// Card,
	// CardHeader,
	// CardContent,
	IconButton,
	TextField,
	Box
} from '@material-ui/core';
import { uniqueId } from 'lodash';
import { Publish } from '@material-ui/icons';
// import FileDropzone from './FileDropzone';

const VideoAdd = ({ onUpload }) => {
    const [videoData, setVideoData] = useState({});
    const [formatData, setformatData] = useState();

	// START Dropzone consts
	// const [files, setFiles] = useState([]);

	// const handleDrop = (newFiles) => {
	// 	setFiles((prevFiles) => [...prevFiles, ...newFiles]);
	// };

	// const handleRemove = (file) => {
	// 	setFiles((prevFiles) => prevFiles.filter((_file) => _file.path
	// 	!== file.path));
	// };
  
	// const handleRemoveAll = () => {
	// 	setFiles([]);
	// };
	// END Dropzone consts


    const uploadVideo = async () => {
        //Upload the video
		const videoId = uniqueId();
		console.log('unique id', videoId)
        console.log('videoData', videoData);
        const { title, description, showcase, ownerId } = videoData;
        const { key } = await Storage.put(`user/${title}_${videoId}.mp4`, formatData, { contentType: 'video/*' });

        const createVideoInput = {
            id: videoId,
            title,
            description,
            ownerId,
            url: key,
            showcase
        };
        await API.graphql(graphqlOperation(createVideo, { input: createVideoInput }));
        onUpload();
    };

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
			{/* <Box>
				<FileDropzone
				accept="video/*"
				files={files}
				onDrop={handleDrop}
				onRemove={handleRemove}
				onRemoveAll={handleRemoveAll}
				onChange={e => setformatData(e.target.files[0])}
				/>
			</Box> */}
            <input type="file" accept="video/*" onChange={e => setformatData(e.target.files[0])} />
            <IconButton onClick={uploadVideo}>
                <Publish />
            </IconButton>
        </Box>
    );
};

export default VideoAdd;
