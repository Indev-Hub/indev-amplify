/* eslint-disable */
import { React, useRef, useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Link
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Glide from 'react-glidejs';
import './channelSlider.css';
import { API, graphqlOperation } from 'aws-amplify';
import { listChannels } from '../../graphql/queries';
import ChannelSliderTemplate from './ChannelSliderTemplate';
// import ChannelSliderTemplate from './ChannelSliderTemplate';
// import './transitions.css';

function ChannelSlider(props) {
  const { genre, sliderHeight } = props;
  const gliderRef = useRef(null);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      const channelData = await API.graphql(graphqlOperation(listChannels));
      const channelList = channelData.data.listChannels.items;
      // console.log('channel list', channelList);
      setChannels(channelList);
    } catch (error) {
      console.log('error on fetching channels', error);
    }
  };

  return (
    <Box
      className="App"
      style={{
        background: 'transparent'
      }}
    >
      <Glide
        ref={gliderRef}
        throttle={0}
        type="carousel"
        gap="10"
        customSlideAnimation={{
          timeout: 250,
          classNames: 'fade'
        }}
        peek={{
          before: 0,
          after: 0
        }}
        perView={3}
        startAt={0}
        slideClassName="slider__frame"
        focusAt="center"
        breakpoints={{
          960: {
            perView: 1,
            peek: {
              before: 0,
              after: 0
            }
          },
          1280: {
            perView: 2
          }
        }}

      >
        {channels.map((channel, index) => (
          <Grid
            item
            xs={4}
            key={channel.id}
            href={`/channel/${channel.id}`}
          >
            <Link
              href={`/channel/${channel.id}`}
              sx={{
                '&:hover': {
                  textDecoration: 'none'
                }
              }}
            >
              <ChannelSliderTemplate channelImg={genre[1].image} title={genre[1].title} sliderHeight={sliderHeight} />
              {/* <SearchTemplate1 channel={channel} index={index} /> */}
            </Link>
            {/* {console.log('channel id:', channel.id)} */}
          </Grid>
        ))}

        {/* <ChannelSliderTemplate channelImg={genre[0].image} title={genre[0].title} sliderHeight={sliderHeight} />
        <ChannelSliderTemplate channelImg={genre[1].image} title={genre[1].title} sliderHeight={sliderHeight} />
        <ChannelSliderTemplate channelImg={genre[2].image} title={genre[2].title} sliderHeight={sliderHeight} />
        <ChannelSliderTemplate channelImg={genre[3].image} title={genre[3].title} sliderHeight={sliderHeight} />
        <ChannelSliderTemplate channelImg={genre[4].image} title={genre[4].title} sliderHeight={sliderHeight} />
        <ChannelSliderTemplate channelImg={genre[5].image} title={genre[5].title} sliderHeight={sliderHeight} /> */}
      </Glide>
    </Box>
  );
}

ChannelSlider.propTypes = {
  genre: PropTypes.array,
  sliderHeight: PropTypes.string
};

export default ChannelSlider;
