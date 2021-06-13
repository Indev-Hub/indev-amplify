import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Typography,
  useTheme
} from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints }) => ({
  button: {
    fontSize: 18,
    lineHeight: 1,
    fontWeight: 500,
    padding: '10px 40px',
    color: '#fff',
    width: 'auto',
    borderRadius: 500,
    backgroundColor: '#EC008C',
    zIndex: 40,
    [breakpoints.up('lg')]: {
      padding: '10px 40px'
    }
  },
  panelFront: {
    padding: '20px',
    width: '33.33%',
    marginLeft: '8.33%',
    marginTop: '8.33%'
  },
  featuredText: {
    textShadow: '#000000 4px 2px 20px'
  }
}));

function FeaturedSliderTemplate(props) {
  const { channelImg, title, description, category } = props;
  const theme = useTheme();
  const classes = useStyles();

  return (
    <a href="#" style={{ textDecoration: 'none' }}>
      <Box
        style={{
          backgroundImage: `url('https://source.unsplash.com/1900x900/?${channelImg}')`,
          height: '70vh',
          minHeight: 600,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1,
          backgroundSize: 'cover'
        }}
        // backgroundColor={theme.palette.background.default}
        // height="500px"
      >
        <Box
          className={classes.panelFront}
          // backgroundColor={theme.palette.brand.primary}
          // padding="20px"
          // width="33.33%"
          // marginLeft="8.33%"
          // marginTop="8.33%"
        >
          <Typography className={classes.featuredText} variant="h3" color={theme.palette.text.reverse}>{title}</Typography>
          <Typography className={classes.featuredText} variant="h6" color={theme.palette.text.reverse}>{description}</Typography>
          <Typography className={classes.featuredText} variant="h6" color={theme.palette.text.reverse}>{category}</Typography>
          <Button className={classes.button}>View Now</Button>
        </Box>
      </Box>
    </a>
  );
}

FeaturedSliderTemplate.propTypes = {
  channelImg: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.any,
  category: PropTypes.string
};

export default FeaturedSliderTemplate;
