import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  useTheme
} from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Grid,
  Typography
} from '@material-ui/core';
import ChannelVideoAsk from './ChannelVideoAsk';
// import { Gallery } from '../gallery';
import Gallery from '../gallery/Gallery';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        color: '#ffffff',
        backgroundColor: '#EC008C',
        '&:hover': {
          background: '#EC0065'
        },
        borderRadius: '0',
        padding: '20px',
        margin: '0px 10px 10px 10px',
        width: 'calc(100% - 20px)',
        fontSize: '1.5rem'
      }
    }
  },
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
  trailer: {
    overflow: 'hidden',
    backgroundImage: "url('https://source.unsplash.com/1600x900/?nature,water')",
    objectFit: 'cover',
    backgroundColor: 'white',
    height: 500,
    marginLeft: spacing(0),
    marginRight: spacing(0),
    [breakpoints.up('sm')]: {
      paddingTop: spacing(0)
    },
    [breakpoints.up('md')]: {
      paddingTop: spacing(0)
    }
  },
  section: {
    padding: '20px 0',
    color: '#ffffff',
    textAlign: 'center'
  },
  subSection: {
    padding: '0 0',
    color: '#ffffff',
    textAlign: 'center'
  },
  gridInfoItem: {
    backgroundColor: '#ffffff',
    textAlign: 'center',
    padding: '50px 10px',
    marginTop: '10px',
    marginLeft: '10px',
    '&:first-child': {
      marginLeft: 0
    }
  },
  gridProjectColumnItem: {
    padding: '0px',
    marginTop: '10px',
    marginLeft: '10px',
    '&:first-child': {
      marginLeft: 0
    }
  },
  gridProjectRowItem: {
    padding: 0
  }
}));

// eslint-disable-next-line
function ChannelTemplate(props) {
  const { title, author, supporters, videos, updates, stage, weeks, est, amount, target, price1, price2 } = props;
  const classes = useStyles();
  const theme = useTheme();

  return (
    // Container
    <Box
      className={classes.container}
    >

      {/* Trailer video */}
      {/* <Box>
        <div style={{ padding: '56% 0 0 0', position: 'relative' }}>
          <iframe
            src={`https://player.vimeo.com/video/${props.trailer}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
            title="Easy Interface&amp;#039;s Zoom Meeting2021 02 12T19:41:10Z"
          />
        </div>
        <script src="https://player.vimeo.com/api/player.js" />
      </Box> */}
      <Box margin="63px 0 0 0">
        <ChannelVideoAsk border="0" borderRadius="0" margin="0" />
      </Box>
      {/* Channel title */}
      <Box
        className={classes.section}
        backgroundColor={theme.palette.brand.background1}
      >
        <Typography variant="h2" style={{ textTransform: 'uppercase' }}>{title}</Typography>
        <Typography variant="h6">
          {`by ${author}`}
        </Typography>
      </Box>

      {/* Info boxes */}
      <Grid container spacing={0}>
        <Grid item className={classes.gridInfoItem} xs>
          <Typography>Supporters</Typography>
          <Typography variant="h4">{supporters}</Typography>
        </Grid>
        <Grid item className={classes.gridInfoItem} xs>
          <Typography>Videos</Typography>
          <Typography variant="h4">{videos}</Typography>
        </Grid>
        <Grid item className={classes.gridInfoItem} xs>
          <Typography>Updates</Typography>
          <Typography variant="h4">{updates}</Typography>
        </Grid>
      </Grid>

      {/* Project Section */}
      <Box
        className={classes.section}
        backgroundColor={theme.palette.brand.background1}
        marginTop="50px"
      >
        <Typography variant="h3">PROJECT</Typography>
      </Box>
      <Grid container spacing={0}>
        <Grid item className={classes.gridProjectColumnItem} style={{ backgroundColor: '#ffffff', padding: '20px' }} xs>
          <Typography>Description of project goes here.</Typography>
        </Grid>
        <Grid item className={classes.gridProjectColumnItem} xs>
          <Grid container direction="column" className={classes.subSection}>
            <Grid item backgroundColor={theme.palette.brand.background1} padding="5px">
              <Typography>Target goal</Typography>
            </Grid>
            <Grid item backgroundColor={theme.palette.brand.primary1} padding="20px 0">
              <Typography variant="h5">{`$${amount}`}</Typography>
              <Typography>{`of the $${target} target`}</Typography>
            </Grid>
            <Grid item backgroundColor={theme.palette.brand.background1} marginTop="10px" padding="5px">
              <Typography>Weeks in Development</Typography>
            </Grid>
            <Grid item backgroundColor={theme.palette.brand.primary1} padding="20px 0">
              <Typography variant="h5">{`Week ${weeks}`}</Typography>
              <Typography>{`of ${est} expected weeks`}</Typography>
            </Grid>
            <Grid item backgroundColor={theme.palette.brand.background1} marginTop="10px" padding="5px">
              <Typography>Development Stage</Typography>
            </Grid>
            <Grid item backgroundColor={theme.palette.brand.primary1} padding="20px 0">
              <Typography variant="h5">{`${stage}`}</Typography>
              <Typography>{`Week ${weeks} of ${stage} stage`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Video Section Unsupported */}
      <Box
        className={classes.section}
        backgroundColor={theme.palette.brand.background1}
        marginTop="50px"
      >
        <Typography variant="h3">VIDEO COLLECTION</Typography>
      </Box>

      {/* Logged Out */}
      <Grid container backgroundColor={theme.palette.brand.background0} spacing={0}>
        <Grid item className={classes.gridProjectColumnItem} style={{ backgroundColor: '#ffffff', padding: '20px' }} xs>
          <Typography>Support [channel title] and get access to all of the videos and updates.</Typography>
        </Grid>
        <Grid item className={classes.gridProjectColumnItem} xs>
          <Grid container direction="column" className={classes.subSection}>
            <Grid item backgroundColor={theme.palette.brand.primary1} padding="20px 0" margin="10px 20px 20px 20px">
              <Typography variant="h5">{`$${price1}`}</Typography>
              <Typography>per month</Typography>
            </Grid>
            <Grid item backgroundColor={theme.palette.brand.primary1} padding="20px 0" margin="0px 20px 20px 20px">
              <Typography variant="h5">{`$${price2}`}</Typography>
              <Typography>per month</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box backgroundColor={theme.palette.brand.background3} padding="10px">
        <Button>SUPPORT</Button>
      </Box>

      {/* Logged In */}
      {/* <Gallery /> */}
      <Gallery />
    </Box>

  );
}

ChannelTemplate.propTypes = {
  title: PropTypes.any,
  author: PropTypes.any,
  supporters: PropTypes.any,
  videos: PropTypes.any,
  updates: PropTypes.any,
  stage: PropTypes.any,
  weeks: PropTypes.any,
  est: PropTypes.any,
  amount: PropTypes.any,
  target: PropTypes.any,
  price1: PropTypes.any,
  price2: PropTypes.any
};

export default ChannelTemplate;
