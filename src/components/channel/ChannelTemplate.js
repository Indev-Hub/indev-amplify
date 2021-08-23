/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import {
  makeStyles,
  useTheme
} from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  Card,
  Grid,
  Hidden,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import { getChannel, updatesByProject } from '../../graphql/queries';
import ChannelVideoAsk from './ChannelVideoAsk';
import Gallery from '../gallery/Gallery';
import ProjectTemplateV1 from '../project/ProjectTemplateV1';
import loadingGif from '../assets/loading1.gif';
import { TabPanel } from '@material-ui/lab';

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
    marginTop: '50px'
  },
  sectionHeader: {
    padding: '20px 0',
    color: '#ffffff',
    textAlign: 'center'
  },
  subSection: {
    padding: '20px',
    color: '#ffffff',
    textAlign: 'center'
  },
  gridInfo: {
    marginLeft: '20px',
    '&:first-child': {
      marginLeft: 0
    },
    [breakpoints.down('sm')]: {
      marginLeft: '10px'
    }
  },
  gridInfoItem: {
    backgroundColor: '#ffffff',
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      height: '100px'
    }
  },
  gridProjectColumnItem: {
    padding: '0px',
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
  const { title, author, videos, updates, stage, weeks, est, amount, target, price1, price2 } = props;
  const classes = useStyles();
  const theme = useTheme();

  // Get Channel
  const { channelId } = useParams();
  console.log('Channel ID:', channelId);
  const [channelData, setChannelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get number of videos in the vimeo showcase
  const [vidData, setVidData] = useState([]);
  const [showcaseId, setShowcaseId] = useState(7868357);

  useEffect(() => {
    // eslint-disable-next-line
    getChannelInfo();
    // getUpdatetInfo();
  }, []);

  const getChannelInfo = async () => {
    try {
      const getChannelData = await API.graphql(graphqlOperation(getChannel, { id: channelId }));
      const listChannelData = getChannelData.data.getChannel;
      setChannelData(listChannelData);
      console.log('channel list', listChannelData);

      fetch(`https://api.vimeo.com/me/albums/${channelId}/videos`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.REACT_APP_SHOWCASE_AUTH}` } })
      .then(response => response.json())
      .then(data => setVidData(data.data));
      console.log('vid data', vidData);

      setIsLoading(false);
    } catch (error) {
      console.log('error on fetching videos', error);
    }
  };


  // Get the vimeo showcase
  const loadData = () => {
    fetch(`https://api.vimeo.com/me/albums/${channelId}/videos`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.REACT_APP_SHOWCASE_AUTH}` } })
      .then(response => response.json())
      // .then(data => setData(data.data))
      .then(data => setVidData(data.data));
  }

  // Handle Tab state
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`project-tabpanel-${index}`}
        aria-labelledby={`project-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function menuProps(index) {
    return {
      id: `project-tab-${index}`,
      'aria-controls': `project-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // Container
    <>
      {isLoading ? (
        <Grid
          container
          height="80vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            item

          >
            <img
              src={loadingGif}
              width="150px"
              height="auto"
              alt=""
            />
            <Typography align="center">Loading Channel...</Typography>
          </Grid>
        </Grid>
      ) : (
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
            className={classes.sectionHeader}
            backgroundColor={theme.palette.brand.background1}
          >
            <Typography variant="h2" style={{ textTransform: 'uppercase' }}>{channelData.name ? channelData.name : title}</Typography>
            <Typography variant="h6">
              {`by ${channelData.manager.displayName}`}
            </Typography>
          </Box>

          {/* Info boxes */}
          <Grid
            container
            spacing={0}
            sx={{
              backgroundColor: 'transparent',
              padding: 2,
              [theme.breakpoints.down('sm')]: {
                padding: 1,
              },
            }}
          >
            <Grid item className={classes.gridInfo} xs>
              <Card className={classes.gridInfoItem} alignItems="center">
                <Typography>Supporters</Typography>
                {(() => {
                  if (channelData.supporters === null || channelData.supporters.length == 0 ) {
                    return (
                      <>
                        {/* <Typography>Become the first supporter</Typography> */}
                        <Button variant="contained">SUPPORT</Button>
                        {/* {console.log('Supporters DO NOT EXIST', channelData.supporters.length)} */}
                      </>                    );
                  } else {
                    return (
                      <>
                        <Typography variant="h4">{channelData.supporters.length}</Typography>
                        {console.log('This Many Supporters EXIST:', channelData.supporters.length)}
                      </>
                    );
                  }
                })()}
              </Card>
            </Grid>
            <Grid item className={classes.gridInfo} xs>
              <Card className={classes.gridInfoItem}>
                <Typography>Videos</Typography>
                <Typography variant="h4">{vidData ? vidData.length: videos}</Typography>
              </Card>
            </Grid>
            <Grid item className={classes.gridInfo} xs>
              <Card className={classes.gridInfoItem}>
                <Typography>Updates</Typography>
                <Typography variant="h4">{updates}</Typography>
              </Card>
            </Grid>
            <Hidden smDown>
              <Grid item className={classes.gridInfo} xs>
                <Card className={classes.gridInfoItem}>
                  <Typography>Target</Typography>
                  <Typography variant="h4">{channelData.target ? channelData.target.toLocaleString() : '--'}</Typography>
                </Card>
              </Grid>
            </Hidden>
          </Grid>

          {/* Project Section */}
          <AppBar position="static">
            <Tabs value={value} onChange={handleTabChange} aria-label="simple tabs example">
            {channelData.projects.items.map((project, index) => (
              <Tab label={project.name} {...menuProps({index})} />
            ))}
            </Tabs>
          </AppBar>
          {channelData.projects.items.map((project, index) => (
            <TabPanel value={value} index={index}>
              <ProjectTemplateV1 projectData={channelData.projects.items[index]} />
            </TabPanel>
          ))}

      {/* <AppBar position="static">
        <Tabs value={value} onChange={handleTabChange} textColor="white" indicatorColor="secondary" aria-label="simple tabs example">
          <Tab label="Personal" {...menuProps(0)} />
          <Tab label="Financial" {...menuProps(1)} />
          <Tab label="Location" {...menuProps(2)} />
        </Tabs>
      </AppBar>          
      <TabPanel value={value} index={0}>
        <ProfilePersonal profileData={profileData} handleProfileChange={handleProfileChange} />
        {console.log('profile data:', profileData)}
      </TabPanel> */}

          {channelData.projects.items.map((project, index) => (
            <Card className={classes.section}>
              <Box
                className={classes.sectionHeader}
                backgroundColor={theme.palette.brand.background1}
              >
                <Typography variant="h3">{channelData.projects.items[index].name}</Typography>
              </Box>
              <Grid container spacing={0} p={3}>
                  <Grid container mb={3}>
                    <ProjectTemplateV1 projectData={channelData.projects.items[index]} />
                  </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item className={classes.gridProjectColumnItem} style={{ backgroundColor: '#ffffff', padding: '20px' }} xs>
                  <Typography>{channelData.description}</Typography>
                </Grid>
                <Grid item className={classes.gridProjectColumnItem} xs lg={4}>
                  <Grid container direction="column" className={classes.subSection}>
                    <Grid item backgroundColor={theme.palette.brand.background1} padding="5px">
                      <Typography>Target goal</Typography>
                    </Grid>
                    <Grid item backgroundColor={theme.palette.brand.primary1} padding="20px 0">
                      <Typography variant="h5">{`$${amount}`}</Typography>
                      <Typography>{`of the $${channelData.target ? channelData.target.toLocaleString() : '0'} target`}</Typography>
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
            </Card>
          ))}

          {/* Video Section Unsupported */}
             <Card className={classes.section}> 
              <Box
                className={classes.sectionHeader}
                backgroundColor={theme.palette.brand.background1}
              >
                <Typography variant="h3">VIDEO COLLECTION</Typography>
              </Box>

              {/* Logged Out */}
              {/* <Grid container backgroundColor={theme.palette.brand.background0} spacing={0}>
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
              </Grid> */}
              <Gallery setVidData={setVidData} vidData={vidData} />
            </Card>
        </Box>
      )}
    </>
  );
}

ChannelTemplate.propTypes = {
  title: PropTypes.any,
  author: PropTypes.any,
  // supporters: PropTypes.any,
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
