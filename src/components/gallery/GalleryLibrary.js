/* eslint-disable */
import PropTypes from "prop-types";
import {
  Box,
  Grid,
  Link,
  Typography
} from '@material-ui/core';


function GalleryLibrary(props) {
  const { data, onThumbnailClick, classes, formatTime } = props;
  console.log('data', data)
  return (
    <Grid container spacing={0}>
      { 
        data.map(data => (
        <Grid item className={classes.gridItems} xs={12} md={6} lg={4}>
          <Box sx={{ cursor: 'pointer' }} className={classes.gridContent} boxShadow={2} onClick={() => onThumbnailClick(data.uri.replace("/videos/", ""), data.name)}> {/* Added new onClick function - Woo Jin */}
            <img className={classes.thumbnail} src={data.pictures.sizes[6].link} />
            <Box className={classes.gridText}>
              <Typography>{data.name}</Typography>
              <Typography lineHeight="10px">{formatTime(data.duration)}</Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

GalleryLibrary.propTypes = {
  data: PropTypes.Array,
  onThumbnailClick: PropTypes.func,
}

export default GalleryLibrary;