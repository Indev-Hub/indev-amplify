/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {
	Box,
	IconButton,
	Paper,
	Typography,
	// Typography
} from '@material-ui/core'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { listVideos } from '../../graphql/queries'
import { Computer, PlayArrow, StayCurrentLandscape, Stop, Tablet } from '@material-ui/icons'
import ReactPlayer from 'react-player'
import { Grid } from '@material-ui/core'

const VideoLibrary = () => {
	const [videos, setVideos] = useState([]);
	const [videoPlaying, setVideoPlaying] = useState('');
	const [videoURL, setVideoURL] = useState('');
	const [videoSize, setVideoSize] = useState('comp');

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

	const resizeVideo = (display) => {
		if (display === 'phone') {
			setVideoSize("50%");
			return;
		} else if (display === 'tablet') {
			setVideoSize("75%");
			return;
		} else if (display === 'comp') {
			setVideoSize("100%");
			return;
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
			width="100%"
			alignItems="center"
			justify="center"
			width={videoSize}
			margin="auto"
		>
			<Grid
				container
			>
				<Grid item><IconButton onClick={() => resizeVideo('phone')}><StayCurrentLandscape /></IconButton></Grid>
				<Grid item><IconButton onClick={() => resizeVideo('tablet')}><Tablet /></IconButton></Grid>
				<Grid item><IconButton onClick={() => resizeVideo('comp')}><Computer /></IconButton></Grid>
			</Grid>
			{videos.map((video, idx) => {
				return <Paper variant="outlined" elevation={2} sx={{py: 2, px: 5, m: 1}} key={`video_${idx}`}>
					<Grid
						container
						display="flex"
						className="videoCard"
						direction="column"
						alignItems="center"
						justify="center"
						onClick={() => toggleVideo(idx)}
					>
						<Grid item>
							<IconButton aria-label="play" onClick={() => toggleVideo(idx)}>
								{videoPlaying === idx ? <Stop /> : <PlayArrow />}
							</IconButton>
						</Grid>
						<Grid xs={6}>
							<Typography className="videoTitle">{video.title}</Typography>
						</Grid>
						<Grid item>
							<Typography className="videoDescription">{video.description}</Typography>
						</Grid>
					</Grid>
					{
						videoPlaying === idx ? (
							<Grid
								container
								display="flex"
								className="videoCard"
								direction="column"
								alignItems="center"
								justify="center"
								onClick={() => toggleVideo(idx)}
							>
								<Grid
									item
									// width={videoSize}
									sx={{
										pt: 2
									}}
								>
									<ReactPlayer
										url={videoURL}
										controls
										playing
										width="100%"
										height="auto"
										config={{ file: { attributes: { controlsList: 'nodownload' } } }}
										// onPause={() => toggleVideo(idx)}
									/>
								</Grid>
							</Grid>
						) : null
					}
				</Paper>
			})}
		</Box>
	)
}

export default VideoLibrary;
