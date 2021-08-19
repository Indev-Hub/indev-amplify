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
            width={props.width}
            height={props.height}
            frameborder={props.frameborder}
            allow={props.allow}
            allowfullscreen={props.allowfullscreen}
            title={props.title}
          />
        </Grid>
        <Grid item xs={12} px={2}>
          <Typography>{props.title}</Typography>
          {/* <Typography>{props.vidData[0].uri}</Typography>
          {console.log("Gallery Video:", props.vidData[0].uri)} */}
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