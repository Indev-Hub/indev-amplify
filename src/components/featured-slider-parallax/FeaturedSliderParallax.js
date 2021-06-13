/* eslint-disable indent */

  // import React from 'react';
  import Box from '@material-ui/core/Box';
  import ParallaxCarousel2 from './ParallaxCarousel2';

  const data = [
    {
      id: 1,
      image:
        // eslint-disable-next-line max-len
        'https://source.unsplash.com/1900x900/?'
    },
    {
      id: 2,
      image:
        // eslint-disable-next-line max-len
        'https://source.unsplash.com/1900x900/?'
    },
    {
      id: 3,
      image:
        // eslint-disable-next-line max-len
        'https://source.unsplash.com/1900x900/?'
    }
  ];

  const FeaturedSliderParallax = () => (
    <Box
      width="100%"
      height="100%"
      // maxWidth={840}
      // mx="auto"
    >
      <ParallaxCarousel2 data={data} />
    </Box>
  );

  export default FeaturedSliderParallax;
