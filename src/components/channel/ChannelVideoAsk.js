import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

function ChannelVideoAsk(props) {
  const { currentChannel } = props;
  const iframeStyle = {
    border: '0',
    borderRadius: '0'
  };

  return (
    <Box marginBottom="-4px">
      <iframe
        src={`https://www.videoask.com/fvqeua3ma#channelid='${currentChannel}'`}
        allow="camera *; microphone *; autoplay *; encrypted-media *; fullscreen *; display-capture *;"
        width="100%"
        height="600px"
        style={iframeStyle}
        title="Make your Indev trailer"
      />
    </Box>
  );
}

ChannelVideoAsk.propTypes = {
  currentChannel: PropTypes.string
};

export default ChannelVideoAsk;
