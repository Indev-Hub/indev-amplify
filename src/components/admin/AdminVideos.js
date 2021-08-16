/* eslint-disable */
import { Box, Button, Card, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const AdminVideos = () => {
  const [videos, setVideos] = useState();
  const [deleteVideo, setDeleteVideo] = useState();
  const [loaded, setLoaded] = useState(false);
  console.log(`url: https://api.vimeo.com/me/videos/${deleteVideo}`)

  useEffect(() => {
    // eslint-disable-next-line
    loadVideos();
    console.log('effect videos', videos)
  }, []);
  
  const loadVideos = async () => {
    try {
      const vimVid = await fetch(`https://api.vimeo.com/me/videos?per_page=100&page=2`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.REACT_APP_SHOWCASE_AUTH}` } })
      .then(response => response.json());
      console.log('vimVid', vimVid)
      const vimVidData = vimVid.data;
      console.log('vimVidData', vimVidData)
      setVideos(vimVidData);
      setLoaded(true);

    } catch (error) {
        console.log('error on fetching videos', error);
      }
  }

  const removeVideo = async () => {
    try {
      const vimDelete = await fetch(`https://api.vimeo.com/me/videos/${deleteVideo}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.REACT_APP_SHOWCASE_ADMIN_AUTH}` } })
      .then(response => response.text())
      .then(data => console.log('result', data))
      // .catch(err => console.log('Here is an error:', err))
      // .then(response => response.json());
      // console.log('vimDelete', vimDelete)
      // const vimDeleteData = vimDelete.data;
      // console.log('vimDeleteData', vimDeleteData)
      loadVideos();

    } catch (error) {
        console.log('error on deleting video', error);
      }
  }

  const onClick = (videoId) => {
    setDeleteVideo(videoId);
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item display="flex" alignItems="center" p={2}>
          <Typography component="div">Video <Box component="span" fontWeight="800">{deleteVideo}</Box> will be deleted</Typography>
        </Grid>
        <Grid item alignItems="center" p={1}>
          <Button
            onClick={removeVideo}
          >
            Delete Video
          </Button>
        </Grid>
      </Grid>
      {loaded === true ? (
        <Grid
          container
          spacing={2}
          p={4}
        >
          {videos.map((video, index) => {
          return (
            <Grid item
              onClick={() => onClick(video.uri.split("/")[2])}
              xs={12}
              sm={3}
              md={2}
              lg={1.5}
              xl={1}
            >
              <Card
                item
                sx={{
                  p:2,
                  cursor: 'pointer'
                }}
              >
                <Grid item>
                  <img src={video.pictures.sizes[2].link} style={{ width: '100%' }} alt="Thumbnail" />
                </Grid>
                <Grid item>
                  {video.name}
                </Grid>
                <Grid item>
                  {video.uri.split("/")[2]}
                </Grid>
              </Card>
            </Grid>
          )
          })}
        </Grid>
        ) : (
          null
        )}

    </>
  );
};

export default AdminVideos;
