import { React, useRef } from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import Glide from 'react-glidejs';

import './channelSlider.css';
import ChannelSliderTemplate from './ChannelSliderTemplate';
// import './transitions.css';

function ChannelSlider(props) {
  const { genre, sliderHeight } = props;

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
        <ChannelSliderTemplate channelImg={genre[0].image} title={genre[0].title} sliderHeight={sliderHeight} />
        <ChannelSliderTemplate channelImg={genre[1].image} title={genre[1].title} sliderHeight={sliderHeight} />
        <ChannelSliderTemplate channelImg={genre[2].image} title={genre[2].title} sliderHeight={sliderHeight} />
        <ChannelSliderTemplate channelImg={genre[3].image} title={genre[3].title} sliderHeight={sliderHeight} />
        <ChannelSliderTemplate channelImg={genre[4].image} title={genre[4].title} sliderHeight={sliderHeight} />
        <ChannelSliderTemplate channelImg={genre[5].image} title={genre[5].title} sliderHeight={sliderHeight} />
      </Glide>
    </Box>
  );
}

ChannelSlider.propTypes = {
  genre: PropTypes.array,
  sliderHeight: PropTypes.string
};

export default ChannelSlider;
