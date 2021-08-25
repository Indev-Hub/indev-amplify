import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, useTheme } from '@material-ui/core';

const style = {
  img: {
    display: 'none',
    width: '50%'
  }
};

function ChannelSliderTemplate01(props) {
  const { channelImg, channel, sliderHeight } = props;
  const theme = useTheme();

  return (
    <Box
      className={style.img}
      style={{
        backgroundImage: `url('https://source.unsplash.com/1900x900/?${channelImg}')`,
        backgroundSize: 'cover'
      }}
      backgroundColor={theme.palette.background.default}
      height={sliderHeight}
    >
      <Box
        backgroundColor={theme.palette.brand.primary1}
        padding="20px"
      >
        <Typography variant="h6" color={theme.palette.text.reverse}>{channel.name}</Typography>
        <Typography color={theme.palette.text.reverse}>{channel.category}</Typography>
      </Box>
    </Box>
  );
}

ChannelSliderTemplate01.propTypes = {
  channelImg: PropTypes.string,
  channel: PropTypes.string,
  sliderHeight: PropTypes.string
};

export default ChannelSliderTemplate01;
