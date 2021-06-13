/* eslint-disable no-irregular-whitespace */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography
} from '@material-ui/core';
import Carousel from 'react-elastic-carousel';
import Item from './HomeRoles';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

function ChannelSlider({ category }) {
  const [items] = useState(['This Test', '10', 2, 3, 4, 5, 6, 7, 8, 9]);

  return (
    <Box className="HomeOverview">
      <Typography variant="h5">{category}</Typography>
      <Box className="carousel-wrapper">
        <Carousel breakPoints={breakPoints}>
          {items.map((item) => (
            <Item key={item}>{item}</Item>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}

ChannelSlider.propTypes = {
  category: PropTypes.any
};

export default ChannelSlider;
