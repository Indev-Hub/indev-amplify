/* eslint-disable */
import PropTypes from "prop-types";
import {
  Box,
  Grid,
  Link,
  Typography
} from '@material-ui/core';
function GalleryVideo(props) {
  return(
    <Grid
        // display="flex"
        className="videoCard"
        direction="column"
        alignItems="center"
        justify="center"
        xs={12}
      >
        <Grid item xs={12} className="heroContainer">
          <iframe
            src={props.src}
            width="100%"
            height={props.width*.3}
            frameborder={props.frameborder}
            allow={props.allow}
            allowfullscreen={props.allowfullscreen}
            title={props.title}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>{props.title}</Typography>
        </Grid>
      </Grid>
  )
}

GalleryVideo.propTypes = {
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  frameborder: PropTypes.string,
  allow: PropTypes.string,
  allowfullscreen: PropTypes.string,
  title: PropTypes.string
};

export default GalleryVideo;