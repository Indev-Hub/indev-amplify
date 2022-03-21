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
import { listShowcases } from '../../graphql/queries'
import { Grid } from '@material-ui/core'

const VideoLibrary = () => {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		fetchVideos();
	}, [])
// TODO: This component will be used as the ind'l vid through  mapping from the given Showcase item, and saved as an obj ( array match )
	const fetchVideos = async () => {
		try {
			const videoData = await API.graphql(graphqlOperation(listShowcases));
			const videoList = videoData.data.listShowcases.items;
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
			margin="auto"
		>
			{videos.map((showcase, idx) => {
				return <Paper variant="outlined" sx={{py: 2, px: 5, m: 1}} key={`showcase_${idx}`}>
					<Grid
						container
						display="flex"
						className="videoCard"
						direction="column"
						alignItems="center"
						justify="center"
					>
						<Grid item xs={6}>
							<Typography className="videoTitle">{showcase.title}</Typography>
						</Grid>
						<Grid item>
							<Typography className="videoDescription">{showcase.id}</Typography>
						</Grid>
					</Grid>
				</Paper>
			})}
		</Box>
	)
}

export default VideoLibrary;