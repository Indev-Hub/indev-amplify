import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, useTheme } from '@material-ui/core';

const style = {
  img: {
    display: 'none',
    width: '50%'
  }
};

function ChannelSliderTemplate(props) {
  const { channelImg, title, sliderHeight } = props;
  const theme = useTheme();

  return (
    <a href="#" style={{ textDecoration: 'none' }}>
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
          <Typography variant="h6" color={theme.palette.text.reverse}>{title}</Typography>
        </Box>
      </Box>
    </a>
  );
}

ChannelSliderTemplate.propTypes = {
  channelImg: PropTypes.string,
  title: PropTypes.string,
  sliderHeight: PropTypes.string
};

export default ChannelSliderTemplate;
