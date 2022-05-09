/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {
	Box,
	IconButton,
	Paper,
	Typography,
	// Typography
} from '@material-ui/core'
import {
    makeStyles,
    useTheme
  } from '@material-ui/core/styles';

import { API, graphqlOperation, Storage } from 'aws-amplify'
import { getShowcase } from '../../graphql/queries'
import { Grid } from '@material-ui/core'



window.onblur = function () { document.title = 'you went?'; }

window.onfocus = function () { document.title = 'you came back'; }


const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
      flexGrow: 1
    },
    container: {
      marginTop: 60,
      paddingBottom: 60,
      [breakpoints.up('sm')]: {
        margin: '0 8.33%'
      },
      [breakpoints.up('md')]: {
        margin: '0 16.66%'
      },
      [breakpoints.up('lg')]: {
        margin: '0 16.66%'
      }
    },
    gridItems: {
      display: 'block',
      // overflow: 'hidden',
      backgroundColor: '#transparent',
      textAlign: 'left',
      padding: '10px 10px'
      // [breakpoints.up('md')]: {
      //   padding: '10px 20px'
      // },
      // [breakpoints.up('lg')]: {
      //   padding: '10px 30px'
      // }
    },
    gridContent: {
      display: 'block',
      overflow: 'hidden',
      backgroundColor: 'white',
      borderRadius: '20px 20px 0 0',
      padding: '10px',
      margin: 0,
      [breakpoints.up('md')]: {
        margin: 0
      },
      [breakpoints.up('lg')]: {
        margin: 0
      }
    },
    gridText: {
      width: '50px',
      // padding: '0 0 10px 20px',
      fontSize: '18px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis !important',
      '& a': {
        textDecoration: 'none',
        color: 'purple !important',
      },
      '& a:hover': {
        textDecoration: 'none',
        color: 'red'
      }
    },
    heroContainer: {
      display: 'block',
      width: '100%',
      overflow: 'hidden',
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '15px',
      margin: 0
    },
    thumbnail: {
      borderRadius: '12px 12px 0 0',
      // margin: '10px',
      maxWidth: '100%'
    }
  }));

const SingleVideo = () => {
  const [showcaseID, setShowcaseID] = useState(7868357)
	const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState(null);


  const classes = useStyles();

	useEffect(() => {
		fetchVideos();
	}, [])

  // Get video duration in hours:minutes:seconds
  const formatTime = (time) => {
    // Hours, minutes and seconds
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;

    return `${hrs}:${mins}:${secs}`
  }
// TODO: This component will be used as the ind'l vid through  mapping from the given Showcase item, and saved as an obj ( array match )
	const fetchVideos = async () => {
        try {
            const videoData = await API.graphql(graphqlOperation(getShowcase, { id: showcaseID }));
            const videoLibrary = JSON.parse(videoData.data.getShowcase.videos);
            setVideos(videoLibrary);
      
            console.log('videoLibrary:', videoLibrary);
              setVideo(videoLibrary[0]);
            // array match/filter
          } catch (error) {
            console.log(' VW:error on fetching videos', error);
          }
		// try {
		// 	const videoData = await API.graphql(graphqlOperation(listShowcases));
		// 	const videoList = videoData.data.listShowcases.items;
		// 	console.log('video list', videoList);
		// 	setVideos(videoList);
		// } catch (error) {
		// 	console.log('error on fetching videos', error);
		// }
	}
	const idx = 0;

	return (
		<Box
			width="100%"
			alignItems="center"
			justify="center"
			margin="auto"
		>
	    {video ? (<Paper variant="outlined" sx={{py: 2, px: 5, m: 1}} key={`showcase_${idx}`}>
					<Grid
						container
						display="flex"
						className="videoCard"
						direction="column"
						alignItems="center"
						justify="center"
					>
						<Grid item xs={6}>
							<Typography className="videoTitle">Video Title: {video.name}</Typography>
						</Grid>
						<Grid item>
							<Typography className="videoDescription">Video URL: http://localhost:3000/showcase{video.uri}</Typography>
						</Grid>
                        <Grid item className={classes.gridItems} xs={12} md={6} lg={4}>
                        <Box sx={{ cursor: 'pointer' }} className={classes.gridContent} boxShadow={2} onClick={() => onThumbnailClick(video.uri.replace("/videos/", ""), video.name)}>
                            <img className={classes.thumbnail} src={video.pictures.sizes[6].link} />
                            <Box className={classes.gridText}>
                            <Typography>{video.name}</Typography>
                            <Typography lineHeight="10px">{formatTime(video.duration)}</Typography>
                            </Box>
                        </Box>
                        </Grid>
					</Grid>
				</Paper>) : null
			})
		</Box>
	)
}

export default SingleVideo;