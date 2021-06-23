import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import Halftone20White from '../assets/Halftone 20 White@1000px.png';
import Halftone20Prussian from '../assets/Halftone 20 Prussian@1000px.png';

function Graphics(props) {
  const { width, graphicID } = props;
  const graphicArray = [
    {
      name: 'Halftone White',
      type: 'Halftone',
      graphic: Halftone20White
    },
    {
      name: 'Halftone Prussian',
      type: 'Halftone',
      graphic: Halftone20Prussian
    },
    {
      name: 'Link to url that does work',
      type: 'URL',
      graphic: 'https://source.unsplash.com/1900x900/?halftone'
    }
  ];

  return (

    <Box>
      <img src={graphicArray[graphicID].graphic} width={width} height="auto" alt="" />
      <Typography>{graphicArray[1].name}</Typography>
    </Box>
  );
}

Graphics.propTypes = {
  width: PropTypes.any,
  graphicID: PropTypes.any
};

export default Graphics;
