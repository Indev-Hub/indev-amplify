/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {
	Box,
	IconButton,
	Paper,
	// Typography
} from '@material-ui/core'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { listVideos } from '../../graphql/queries'
import { PlayArrow, Stop } from '@material-ui/icons'
import ReactPlayer from 'react-player'

const VideoLibrary = () => {
	const [videos, setVideos] = useState([]);
	const [videoPlaying, setVideoPlaying] = useState('');
	const [videoURL, setVideoURL] = useState('');

	useEffect(() => {
		fetchVideos();
	}, [])

	const toggleVideo = async idx => {
		if (videoPlaying === idx) {
			setVideoPlaying('');
			return;
		}

		const videoFilePath = videos[idx].url;
		try {
			const fileAccessURL = await Storage.get(videoFilePath, { expires: 60 })
			console.log('access url', fileAccessURL);
			setVideoPlaying(idx);
			setVideoURL(fileAccessURL)
		} catch (error) {
			// console.error('error accessing the file from s3', error),
			setVideoURL('');
			setVideoPlaying('');
		}
	}

	const fetchVideos = async () => {
		try {
			const videoData = await API.graphql(graphqlOperation(listVideos));
			const videoList = videoData.data.listVideos.items;
			console.log('video list', videoList);
			setVideos(videoList);
		} catch (error) {
			console.log('error on fetching videos', error);
		}
	}
	const idx = 0;

	return (
		<Box
			width="80%"
		>
			{videos.map((video, idx) => {
				return <Paper variant="outlined" elevation={2} sx={{p: 2}} key={`video_${idx}`}>
					<Box className="videoCard">
						<IconButton aria-label="play" onClick={() => toggleVideo(idx)}>
							{videoPlaying === idx ? <Stop /> : <PlayArrow />}
						</IconButton>
						<Box>
							<Box className="videoTitle">{video.title}</Box>
							<Box className="videoDescription">{video.description}</Box>
						</Box>
					</Box>
					<Box>
						{
							videoPlaying === idx ? (
								<ReactPlayer
									url={videoURL}
									controls
									playing
									width="80%"
									height="auto"
									config={{ file: { attributes: { controlsList: 'nodownload' } } }}
									// onPause={() => toggleVideo(idx)}
								/>
							) : null
						}
					</Box>
				</Paper>
			})}
		</Box>
	)
}

export default VideoLibrary;
