/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from 'react';
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


function Gallery(props) {
  // data state // storage
  const { setVidData, vidData } = props;
  // new state for the video player. Attribute values can be dynamically coded? Woo Jin
  const [video, setVideo] = useState({ src: "https://player.vimeo.com/video/477406181?title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=172959", width: "1280", height: "720", frameborder: "0", allow: "autoplay; fullscreen; picture-in-picture", allowfullscreen: true, title: "Test Video Converse" });
  
  // Set hero vid object
  const [heroVid, setHeroVid] = useState();
  
  const heroVidUpdate = (vid) => {
    console.log('url', vid)
    const updatedHero = vidData.filter(x => x.uri.split("/")[2] === vid)  //vidData.find(function( vid ) { return vid.uri.split("/")[2] === vidID; });
    setHeroVid(updatedHero);
    console.log('heroVid', heroVid)
  }

  const [data, setData] = useState([]);
  const [channelId, setId] = useState(8521543);

  const classes = useStyles();
  const theme = useTheme();

  // Resize Hero Video on window resize
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  // Display window size (not used for anything besides testing)
  function ShowWindowDimensions(props) {
    const [width, height] = useWindowSize();
    return <span>Window size: {width} x {height}</span>;
  }
  
  // Get window width after window resize
  function HeroVidWidth(vidWidth) {
    const [width] = useWindowSize();
    return width*vidWidth;
  }

  // Get window height after window resize
  function HeroVidHeight(vidHeight) {
    const [height] = useWindowSize();
    return height*vidHeight;
  }

  // Run loadData function 
  useEffect(() => {
    loadData();
    // getData();
  }, [])

  // Get the vimeo showcase
  const loadData = () => {
    fetch(`https://api.vimeo.com/me/albums/${channelId}/videos`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.REACT_APP_SHOWCASE_AUTH}` } })
      .then(response => response.json())
      // .then(data => setData(data.data))
      .then(data => setVidData(data.data));
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
    heroVidUpdate(videoID);
  }

  return (
    console.log(vidData),
    <Grid container spacing={0}>

      {/* Hero Video */}

      {/* iframe that embeds Vimeo's video player. "src" initialized as "", to be modified with onThumbnailClick - Woo Jin */}
      
      <GalleryVideo 
        src={video.src}
        width="100%" //{video.width}
        height={HeroVidHeight(.37)} //{video.height}
        frameborder={video.frameborder}
        allow={video.allow}
        allowfullscreen={video.allowfullscreen}
        title={video.title}
        vidData={heroVid}
      />
      {/* {console.log('video data', vidData.reduce((acc, it) => (acc[it] = it, acc), []))}
      {console.log('video src', video.src.substring(video.src.lastIndexOf("/video/"), video.src.lastIndexOf("?")))} */}

      {/* Library */}
      <GalleryLibrary 
        data={vidData}
        onThumbnailClick={onThumbnailClick}
        classes={classes}
        formatTime={formatTime}
      />

      </Grid>

  );
}

export default Gallery
