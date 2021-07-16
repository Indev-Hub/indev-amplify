import { React, useRef } from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import Glide from 'react-glidejs';

import './channelSlider.css';
import ChannelSliderTemplate from './ChannelSliderTemplate';
// import './transitions.css';

function ChannelSlider(props) {
  const { genre, sliderHeight } = props;
  console.log('channel genre', genre);
  const gliderRef = useRef(null);

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
        // focusAt="center"
        breakpoints={{
          600: {
            perView: 1,
            peek: {
              before: 0,
              after: 0
            }
          },
          960: {
            perView: 2,
            before: 0,
            after: 0
          }
        }}

      >
        <ChannelSliderTemplate channelImg={genre[0].category} title={genre[0].name} sliderHeight={sliderHeight} />
        <ChannelSliderTemplate channelImg={genre[1].category} title={genre[1].name} sliderHeight={sliderHeight} />
        <ChannelSliderTemplate channelImg={genre[2].category} title={genre[2].name} sliderHeight={sliderHeight} />
        <ChannelSliderTemplate channelImg={genre[3].category} title={genre[3].name} sliderHeight={sliderHeight} />
        {/* <ChannelSliderTemplate channelImg={genre[4].category} title={genre[4].name} sliderHeight={sliderHeight} />
        <ChannelSliderTemplate channelImg={genre[5].category} title={genre[5].name} sliderHeight={sliderHeight} /> */}
      </Glide>
    </Box>
  );
}

ChannelSlider.propTypes = {
  genre: PropTypes.array,
  sliderHeight: PropTypes.string
};

export default ChannelSlider;
