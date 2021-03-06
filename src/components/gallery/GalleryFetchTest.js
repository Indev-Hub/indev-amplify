/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  useTheme
} from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Link,
  Typography
} from '@material-ui/core';

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

function GalleryFetchTest() {
  // data state // storage
  const [ data, setData ] = useState([]);
  const [channelId, setId] = useState(7868357);

  // const channelId = "7868357";

  const classes = useStyles();
  const theme = useTheme();

  // Run loadData function 
  useEffect(() => {
    loadData();
    // getData();
  }, [])

  // Get the vimeo showcase 
  const loadData = () => {
    fetch(`https://api.vimeo.com/me/albums/${channelId}/videos`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: 'Bearer 2d5b1461e957305ffc81def0383fe3a0'}})
    .then(response => response.json())
    .then(data => setData(data.data));
  }

  // Get video duration in hours:minutes:seconds
  function formatTime(time) {   
    // Hours, minutes and seconds
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;

    return `${hrs}:${mins}:${secs}`
  } 

  return (
    // console.log(data),
    <Grid container spacing={0}>

      {/* Hero Video */}

      {/* Gallery */}
      {data.map(data => (
        <Grid item className={classes.gridItems} xs={12} md={6} lg={4}>
          <Link href="#" underline="none" color="textPrimary">
            <Box className={classes.gridContent} boxShadow={2}>
              <img className={classes.thumbnail} src={data.pictures.sizes[8].link} />
              <Box className={classes.gridText}>
                <Typography>{data.name}</Typography>
                <Typography lineHeight="10px">{formatTime(data.duration)}</Typography>
              </Box>
            </Box>
          </Link>
        </Grid>
      ))}
      <Typography fontSize="10px"> {JSON.stringify(data, null, 1)}</Typography>
    </Grid>
    // <Typography fontSize="10px"> {JSON.stringify(data, ['pictures', 'sizes', 'width'], 1)}</Typography>
  );
}

export default GalleryFetchTest
