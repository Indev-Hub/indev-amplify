/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Grid, Typography, useTheme } from '@material-ui/core';
import Graphics from '../graphics/Graphics';

const style = {
  img: {
    display: 'none',
    width: '50%'
  }
};

function ChannelSliderTemplate01(props) {
  const { channel, sliderHeight } = props;
  const theme = useTheme();

  const lastUpdate = () => {
    // One day Time in ms (milliseconds)
    const oneDay = 1000 * 60 * 60 * 24;

    // To set present_dates to two variables
    const presentDate = new Date();

    // 0-11 is Month in JavaScript
    const prevUpdate = new Date(channel.updatedAt);

    // To Calculate the result in milliseconds and then converting into days
    const result = Math.round(presentDate.getTime() - prevUpdate.getTime()) / (oneDay).toString();

    // To remove the decimals from the (Result) resulting days value
    const finalResult = result.toFixed(0);
    return finalResult;
  };

  return (
    <Card raised>
      <Box
        className={style.img}
        style={{
          backgroundImage: `url('https://source.unsplash.com/1900x900/?${channel.category}&&${channel.name}')`,
          backgroundSize: 'cover'
        }}
        backgroundColor={theme.palette.background.default}
        height={sliderHeight}
        display="flex"
        alignItems="flex-end"
      >
        <Box
          backgroundColor={theme.palette.brand.primary1}
          padding="20px"
          width="100%"
          zIndex={20000}
        >
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              xs={12}
            >
              <Typography variant="h4" align="center" color={theme.palette.text.reverse}>{channel.name}</Typography>
              <Typography align="center" color={theme.palette.text.reverse}>{channel.category}</Typography>
            </Grid>
            <Grid
              item
              xs={4}
            >
              <Card raised sx={{ color: 'white', backgroundColor: '#ffffff55', px: 1, py: 2 }}>
                <Typography variant="h3" align="center">{channel.projects.items.length}</Typography>
                <Typography variant="h6" align="center">Projects</Typography>
              </Card>
            </Grid>
            <Grid
              item
              xs={4}
            >
              <Card raised sx={{ color: 'white', backgroundColor: '#ffffff55', px: 1, py: 2 }}>
                <Typography variant="h3" align="center">{channel.supporters !== null || undefined ? channel.supporters.length : '0'}</Typography>
                <Typography variant="h6" align="center">Supporters</Typography>
              </Card>
            </Grid>
            <Grid
              item
              xs={4}
            >
              <Card raised sx={{ color: 'white', backgroundColor: '#ffffff55', px: 1, py: 2 }}>
                <Typography variant="h3" align="center">{lastUpdate()}</Typography>
                <Typography variant="h6" align="center">Days Ago</Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Card>
  );
}

ChannelSliderTemplate01.propTypes = {
  channel: PropTypes.string,
  sliderHeight: PropTypes.string
};

export default ChannelSliderTemplate01;
