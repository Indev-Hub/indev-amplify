/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import GalleryVideo from "./GalleryVideo";
import GalleryLibrary from "./GalleryLibrary";
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


function Gallery() {
  // data state // storage

  // new state for the video player. Attribute values can be dynamically coded? Woo Jin
  const [video, setVideo] = useState({ src: "https://player.vimeo.com/video/477406181?title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=172959", width: "640", height: "360", frameborder: "0", allow: "autoplay; fullscreen; picture-in-picture", allowfullscreen: true, title: "Test Video Converse" });

  const [data, setData] = useState([]);
  const [channelId, setId] = useState(8521543);

  const classes = useStyles();
  const theme = useTheme();

  // Run loadData function 
  useEffect(() => {
    loadData();
    // getData();
  }, [])

  // Get the vimeo showcase
  const loadData = () => {
    fetch(`https://api.vimeo.com/me/albums/${channelId}/videos`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer 2d5b1461e957305ffc81def0383fe3a0' } })
      .then(response => response.json())
      .then(data => setData(data.data));
  }

  // Get video duration in hours:minutes:seconds
  const formatTime = (time) => {
    // Hours, minutes and seconds
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;

    return `${hrs}:${mins}:${secs}`
  }

  // Retrieves selected video's ID from data and modifies iframe source  - Woo Jin 6/12/2021
  // Changing from function onThumbnailClick(videoID) to  onThumbnailClick = (videoID) => {  - Woo Jin 6/12/2021

  const onThumbnailClick = (videoID,titleID) => {
    // "...video" copies all of the video's current attributes, src overwrites the current src url by substituting the videoID
    setVideo({
      ...video,
      src: `https://player.vimeo.com/video/${videoID}?title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=172959`,
      title: `${titleID}`
    });
  }

  return (
    console.log(data),
    <Grid container spacing={0}>

      {/* Hero Video */}

      {/* iframe that embeds Vimeo's video player. "src" initialized as "", to be modified with onThumbnailClick - Woo Jin */}
      
      <GalleryVideo 
        src={video.src}
        width={video.width}
        height={video.height}
        frameborder={video.frameborder}
        allow={video.allow}
        allowfullscreen={video.allowfullscreen}
        title={video.title}
        />

      {/* Library */}

      <GalleryLibrary 
        data={data}
        onThumbnailClick={onThumbnailClick}
        classes={classes}
        formatTime={formatTime}
        />

      </Grid>

  );
}

export default Gallery
