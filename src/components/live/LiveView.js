import React from 'react';
import PropTypes from 'prop-types';
import {
  Box
} from '@material-ui/core';
import LiveCamera from './LiveCamera';

function LiveView(props) {
  const { userId } = props;
  return (
    <Box>
      <LiveCamera title="Developer Live Stream" />
      <iframe allow="camera; microphone" width="100%" height="auto" src={`https://yougrowto.be:/WebRTCAppEE/index.html?name='${userId}'`} frameBorder="0" title="Indev" allowFullScreen />
    </Box>
  );
}

LiveView.propTypes = {
  userId: PropTypes.string
};

export default LiveView;
