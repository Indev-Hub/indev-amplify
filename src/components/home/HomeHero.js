/* eslint-disable */
import React, { useEffect, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import { listChannels } from '../../graphql/queries';
// import ChannelBrowse from '../../pages/channel/ChannelBrowse';
import ChannelSlider from '../channel-slider/ChannelSlider';
// import ChannelCreate from '../dashboard/channel/channel-create/ChannelAdd';
import FeaturedSlider from '../featured-slider/FeaturedSlider';
// import UploadVideo from 'src/pages/channel/UploadVideo';
// import ShowcaseAdd from '../video/ShowcaseAdd';
// import VideoLibrary from '../video/VideoLibrary';
// import HomeOverview from './HomeOverview';
// import ChannelSlider1 from './ChannelSlider';

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

const HomeHero = (props) => {
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
      // console.log('list', listChannelData);
    } catch (error) {
      console.log('error on fetching channels', error);
    }
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
      <Box
        margin="0 8.33%"
        padding="50px 0"
      >
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
            <Typography variant="h4" style={{ marginTop: '0px' }}>Game Development</Typography>
            <ChannelSlider genre={channelData} sliderHeight="500px" />
            <Typography variant="h4" style={{ marginTop: '40px' }}>Software Development</Typography>
            <ChannelSlider genre={channelData} sliderHeight="500px" />
            <Typography variant="h4" marginTop="40px">Mobile App Development</Typography>
            <ChannelSlider genre={channelData} sliderHeight="500px" />
          </>
          )}
        {/* <Typography variant="h4">Mobile App Development</Typography> */}
        {/* <ChannelSlider genre={nice} /> */}
      </Box>
    </Box>
  )
};

export default HomeHero;
