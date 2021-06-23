import { React, useRef } from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import Glide from 'react-glidejs';

import './featuredSlider.css';
import FeaturedSliderTemplate from './FeaturedSliderTemplate';
// import './transitions.css';

function FeaturedSlider(props) {
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
        gap="0"
        customSlideAnimation={{
          timeout: 250,
          classNames: 'fade'
        }}
        peek={{
          before: 0,
          after: 0
        }}
        perView={1}
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
            perView: 1
          }
        }}

      >
        <FeaturedSliderTemplate channelImg={genre[0].image} title={genre[0].title} sliderHeight={sliderHeight} />
        <FeaturedSliderTemplate channelImg={genre[1].image} title={genre[1].title} sliderHeight={sliderHeight} />
        <FeaturedSliderTemplate channelImg={genre[2].image} title={genre[2].title} sliderHeight={sliderHeight} />
        <FeaturedSliderTemplate channelImg={genre[3].image} title={genre[3].title} sliderHeight={sliderHeight} />
        <FeaturedSliderTemplate channelImg={genre[4].image} title={genre[4].title} sliderHeight={sliderHeight} />
        <FeaturedSliderTemplate channelImg={genre[5].image} title={genre[5].title} sliderHeight={sliderHeight} />
      </Glide>
    </Box>
  );
}

FeaturedSlider.propTypes = {
  genre: PropTypes.array,
  sliderHeight: PropTypes.string
};

export default FeaturedSlider;
