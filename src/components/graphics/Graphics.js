/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Halftone20White from '../assets/Halftone 20 White@1000px.png';
import Halftone20Prussian from '../assets/Halftone 20 Prussian@1000px.png';
import GridAssets02 from '../assets/Grid Assets 02.png';

export const Graphic1 = (props) => {
  const { position, width, height, top, left } = props;
  return <img src="static/assets/Halftone 20 Prussian@1000px.png" style={{ objectFit: 'cover', zIndex: '0', position: props.position, width: props.width, height: props.height, marginTop: props.top, marginLeft: props.left }} alt="" />
}

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
    name: 'Grid Assets 02',
    type: 'Grid',
    graphic: GridAssets02
  }
];

function Graphics(props) {
  const {
    type = 'img',
    position = 'relative',
    width = '100%',
    height = 'auto',
    boxWidth = '100%',
    boxHeight = '100%',
    marginTop = '0',
    marginLeft = '0',
    visibility = 'visible',
    graphicID = '0',
    objectFit = 'contain',
    zIndex = '0'
  } = props;
  // switch (type) {
  //   case 'img':
  //     return <img src={graphicArray[graphicID].graphic} width={width} height={height} style={{ objectFit: 'cover', position: position, marginTop: top, marginLeft: left, visibility: visible }} alt="" />;
  //   default:
  //     return graphicArray[graphicID]
  // }
  return (
    <Box className="funny">
      <Box
        overflow="hidden"
        width={boxWidth}
        height={boxHeight}
        mt={marginTop}
        ml={marginLeft}
        position={position}
        zIndex={zIndex}
      >
        {/* eslint-disable-next-line */}
        <img src={graphicArray[graphicID].graphic} width={width} height={height} style={{ position: position, visibility: visibility, zIndex: zIndex }} alt="" />;
        </Box>
      </Box>
  );
}

Graphics.propTypes = {
  type: PropTypes.any,
  position: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
  top: PropTypes.any,
  left: PropTypes.any,
  visible: PropTypes.any,
  graphicID: PropTypes.any
};

export default Graphics;
