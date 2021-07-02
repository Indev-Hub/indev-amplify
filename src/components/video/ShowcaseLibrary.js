/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {
	Box,
	TextField,
	IconButton,
	Paper,
	Typography,
	Button
	// Typography
} from '@material-ui/core'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { getShowcase } from '../../graphql/queries'
import { updateShowcase } from '../../graphql/mutations';
import { Grid } from '@material-ui/core'
import { Publish } from '@material-ui/icons';



const ShowcaseLibrary = () => {
	const [showcaseData, setShowcaseData] = useState({});
	const [showcaseID, setShowcaseID] = useState(7868357)
	const [videos, setVideos] = useState([]);
	const [order, setOrder] = useState([]);

	useEffect(() => {
		fetchVideos();
	}, [])

	const fetchVideos = async () => {
		try {
			const videoData = await API.graphql(graphqlOperation(getShowcase, { id: showcaseID}));
			const showcaseVideoData = videoData.data.getShowcase.videos;
			const videoList = JSON.parse(showcaseVideoData);

			console.log('videoData: ', videoData);
			console.log('showcaseVideoData: ', showcaseVideoData);
			console.log('videoList: ', videoList);
			setVideos(videoList);
			setShowcaseData(videoData.data.getShowcase);
		} catch (error) {
			console.log('error on fetching videos', error);
		}
	}

	const saveShowcaseChanges = async () => {
		const switchedVideos = [videos[1],videos[0]];
		const newVideos =  switchedVideos.concat(videos.slice(2));
		const updatedShowcase = {
			id: showcaseData.id,
			title: showcaseData.title,
			manager: showcaseData.manager,
			managerID: showcaseData.managerID,
			videos: JSON.stringify(newVideos)
		 };
		console.log('showcaseData1:', showcaseData);
		console.log('showcaseData videos1:', videos);
		console.log('updatedShowcase1:', updatedShowcase);
		await API.graphql(graphqlOperation(updateShowcase, { input: updatedShowcase}));
		setShowcaseData(updatedShowcase)
		setVideos(JSON.parse(updatedShowcase.videos));
		console.log('showcaseData2', showcaseData);
		console.log('showcaseData videos2', videos);
	
	}

	return (
		<Box
			// width="100%"
			alignItems="center"
			justify="center"
			margin="auto"
		>
			{/* <TextField
				label="Showcase ID"
				onChange={e => setShowcaseID(e.target.value)}
			/>
			<Button
				onClick={() => {fetchVideos(showcaseID)}}
			> 
				Load Data
			</Button> */}

			<IconButton onClick={saveShowcaseChanges}>
				<Publish 
					color="primary"/>
			</IconButton>

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
							<Typography className="videoTitle">{showcase.name}</Typography>
						</Grid>
						<Grid item>
							<Typography className="videoDescription">{showcase.uri}</Typography>
						</Grid>
					</Grid>
				</Paper>
			})}
		</Box>
	)
}

export default ShowcaseLibrary;