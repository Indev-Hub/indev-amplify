/* eslint-disable */
import React, { useEffect, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import { listChannels } from '../../graphql/queries';
// import ChannelBrowse from '../../pages/channel/ChannelBrowse';
import ChannelSlider from '../channel-slider/ChannelSlider';
// import ChannelCreate from '../dashboard/channel/channel-create/ChannelAdd';
import FeaturedSlider from '../featured-slider/FeaturedSlider';
import Graphics from '../graphics/Graphics';
import GridAssets02 from '../assets/Grid Assets 02.png';

// import UploadVideo from 'src/pages/channel/UploadVideo';
// import ShowcaseAdd from '../video/ShowcaseAdd';
// import VideoLibrary from '../video/VideoLibrary';
// import HomeOverview from './HomeOverview';
// import ChannelSlider1 from './ChannelSlider';

const offset = 5;

const featured = [
  {
    title: 'Game Dev 1',
    image: 'game'
  },
  {
    title: 'Game Dev 2',
    image: 'computer game'
  },
  {
    title: 'Game Dev 3',
    image: 'controller'
  },
  {
    title: 'Game Dev 4',
    image: 'sega'
  },
  {
    title: 'Game Dev 5',
    image: 'atari'
  },
  {
    title: 'Game Dev 6',
    image: 'nintendo'
  }
];
const game = [
  {
    title: 'Game Dev 1',
    image: 'game'
  },
  {
    title: 'Game Dev 2',
    image: 'computer game'
  },
  {
    title: 'Game Dev 3',
    image: 'controller'
  },
  {
    title: 'Game Dev 4',
    image: 'sega'
  },
  {
    title: 'Game Dev 5',
    image: 'atari'
  },
  {
    title: 'Game Dev 6',
    image: 'nintendo'
  }
];
const software = [
  {
    title: 'Software Dev 1',
    image: 'software'
  },
  {
    title: 'Software Dev 2',
    image: 'app'
  },
  {
    title: 'Software Dev 3',
    image: 'program'
  },
  {
    title: 'Software Dev 4',
    image: 'keyboard'
  },
  {
    title: 'Software Dev 5',
    image: 'lights'
  },
  {
    title: 'Software Dev 6',
    image: 'microsoft'
  }
];
const mobile = [
  {
    title: 'Mobile Dev 1',
    image: 'mobile'
  },
  {
    title: 'Mobile Dev 2',
    image: 'mobile game'
  },
  {
    title: 'Mobile Dev 3',
    image: 'phone app'
  },
  {
    title: 'Mobile Dev 4',
    image: 'iOS'
  },
  {
    title: 'Mobile Dev 6',
    image: 'android'
  },
  {
    title: 'Mobile Dev 7',
    image: 'play store'
  }
];

const HomeHeroAlt = (props) => {
  const [channelData, setChannelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getChannelInfo();
  }, []);  
  
  const getChannelInfo = async () => {
    try {
      const getChannelData = await API.graphql(graphqlOperation(listChannels));
      const listChannelData = getChannelData.data.listChannels.items;
      setChannelData(listChannelData);
      setIsLoading(false);
      console.log('list', listChannelData);
    } catch (error) {
      console.log('error on fetching channels', error);
    }
  };

  const categorySelect = (cat) => {
    const catGame = channelData.filter(function (channel) {
      return (
        channel.category === cat
      )
    })

    return catGame;
  };

  return (
    <Box
      sx={{
        backgroundColor: 'brand.background2',
        pt: 0
      }}
      {...props}
    >
      <Container
        maxWidth="100%"
        sx={{
          alignItems: 'center',
          // display: 'flex',
          flexDirection: 'column',
          px: {
            md: '0px !important'
          }
        }}
      >
        <FeaturedSlider genre={featured} sliderHeight="800px" />
      </Container>
      <Box>
        {/* <HomeOverview /> */}
        {/* <ChannelBrowse /> */}
        {/* <VideoUpdate /> */}
        {/* <UploadVideo /> */}
        {/* <ShowcaseAdd /> */}
        {/* <VideoLibrary /> */}
        {/* <ChannelCreate /> */}
        {isLoading ? (
          <Typography>Form is loading...</Typography>
        ) : (
          <>
            {/* GAME DEVELOPMENT CATEGORY */}
            <Grid container mt={10}>
              <Grid
                container
                zIndex='20'
              >
                <Grid
                  sx={{
                    backgroundColor: 'brand.background1',
                    pr: 5,
                    py: 3,
                    // ml: offset
                  }}
                  xs={5}
                >
                  <Typography variant="h2" textAlign="right" color="white" fontWeight="700">Game Development</Typography>   
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="center"
                zIndex='5'
                mt={-8}
              >
                <Grid container xs={12} sx={{ backgroundImage: `url(static/assets/unnamed.png)`, backgroundSize: 'contain', p: 5 }} justifyContent="center">
                  <Grid item xs={10}>
                    <ChannelSlider genre={categorySelect('game')} sliderHeight="500px" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* SOFTWARE DEVELOPMENT CATEGORY */}
            <Grid container mt={10}>
              <Grid
                container
                zIndex='20'
              >
                <Grid
                  sx={{
                    backgroundColor: 'brand.background1',
                    pr: 5,
                    py: 3,
                    // ml: offset
                  }}
                  xs={5}
                >
                  <Typography variant="h2" textAlign="right" color="white" fontWeight="700">Software Development</Typography>   
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="center"
                zIndex='5'
                mt={-8}
              >
                <Grid container xs={12} sx={{ backgroundImage: `url(static/assets/6-2-graphic-design-transparent.png)`, backgroundSize: 'contain', backgroundRepeat: 'repeat-x', p: 5 }} justifyContent="center">
                  <Grid item xs={10}>
                    <ChannelSlider genre={categorySelect('software')} sliderHeight="500px" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* MOBILE DEVELOPMENT CATEGORY */}
            <Grid container py={10}>
              <Grid
                container
                zIndex='20'
              >
                <Grid
                  sx={{
                    backgroundColor: 'brand.background1',
                    pr: 5,
                    py: 3,
                    // ml: offset
                  }}
                  xs={5}
                >
                  <Typography variant="h2" textAlign="right" color="white" fontWeight="700">Mobile Development</Typography>   
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="center"
                zIndex='5'
                mt={-8}
              >
                <Grid container xs={12} sx={{ backgroundImage: `url(static/assets/GridAssets02.png)`, backgroundSize: '33%', p: 5 }} justifyContent="center">
                  <Grid item xs={10}>
                    <ChannelSlider genre={categorySelect('mobile')} sliderHeight="500px" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* <Typography variant="h4" style={{ marginTop: '0px' }}>Game Development</Typography>
            <ChannelSlider genre={categorySelect('game')} sliderHeight="500px" />
            <Typography variant="h4" style={{ marginTop: '40px' }}>Software Development</Typography>
            <ChannelSlider genre={categorySelect('software')} sliderHeight="500px" />
            <Typography variant="h4" marginTop="40px">Mobile App Development</Typography>
            <ChannelSlider genre={categorySelect('mobile')} sliderHeight="500px" /> */}

          </>
          )}
        {/* <Typography variant="h4">Mobile App Development</Typography> */}
        {/* <ChannelSlider genre={nice} /> */}
      </Box>
    </Box>
  )
};

export default HomeHeroAlt;
