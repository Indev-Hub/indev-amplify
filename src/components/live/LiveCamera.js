/* eslint-disable */
import React, { useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Button,
  Grid,
  OutlinedInput,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  startButton: {
    color: 'white',
    backgroundColor: "green",
    fontSize: '1rem',
    textAlign: 'center',
    width: '80%',
    padding: '10px 20px',
    borderRadius: '0',
    "&:hover": {
      background: "navy"
    },
  },
  stopButton: {
    color: 'white',
    backgroundColor: "red",
    fontSize: '1rem',
    width: '80%',
    padding: '10px 20px',
    borderRadius: '0',
    "&:hover": {
      background: "navy"
    },
  }
}))

const LiveCamera = (props) => {
  const videoRef = useRef(null);
  const classes = useStyles()

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: {ideal: 4096}, height: {ideal: 2160}, aspectRatio: 16/9, frameRate: 24} })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  return (
    <Box>
      <Box display="flex" className="container">
        <Box m="auto" marginTop="100px" padding="40px" borderRadius="20px" backgroundColor="white">
          <Box marginBottom="10px" marginTop="-20px">
            <Typography variant="h4" textAlign="center" fontWeight="500">{props.title}</Typography>
          </Box>
          <Box>
            <video
              ref={videoRef}
              className="player"
            />
          </Box>
          <Grid
            container
            display="flex"
            justifyContent="center"
            marginTop="10px"
          >
            <Grid
              item
              display="flex"
              xs={4}
            >
              <Button className={classes.startButton}>Go Live</Button>
            </Grid>
            <Grid
              item
              display="flex"
              flexDirection="column"
              justifyContent="center"
              xs={4}
            >
              <OutlinedInput placeholder="Video Title" fullWidth="true"></OutlinedInput>
            </Grid>
            <Grid
              item
              display="flex"
              justifyContent="flex-end"
              xs={4}
            >
              <Button className={classes.stopButton}>Stop Recording</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default LiveCamera;