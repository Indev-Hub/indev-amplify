import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Divider, Hidden, IconButton, TextField, Tooltip } from '@material-ui/core';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import useAuth from '../../../hooks/useAuth';

const ChatMessageAdd = (props) => {
  const { disabled, onSend, ...other } = props;
  const fileInputRef = useRef(null);
  const { user } = useAuth();
  const [body, setBody] = useState('');

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSend = () => {
    if (!body) {
      return;
    }

    if (onSend) {
      onSend(body);
    }

    setBody('');
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.paper',
        display: 'flex',
        flexShrink: 0,
        px: 2,
        py: 1
      }}
      {...other}
    >
      <Hidden smDown>
        <Avatar
          sx={{ mr: 2 }}
          src={user.avatar}
        />
      </Hidden>
      <TextField
        disabled={disabled}
        fullWidth
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="Leave a message"
        value={body}
        size="small"
        variant="outlined"
      />
      <Tooltip title="Send">
        <span>
          <IconButton
            color="primary"
            disabled={!body || disabled}
            onClick={handleSend}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
      <Hidden smDown>
        <Box sx={{ height: 24 }}>
          <Divider orientation="vertical" />
        </Box>
        <Tooltip title="Attach photo">
          <span>
            <IconButton
              disabled={disabled}
              edge="end"
              onClick={handleAttach}
            >
              <AddPhotoIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Attach file">
          <span>
            <IconButton
              disabled={disabled}
              edge="end"
              onClick={handleAttach}
            >
              <AttachFileIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Hidden>
      <input
        hidden
        ref={fileInputRef}
        type="file"
      />
    </Box>
  );
};

ChatMessageAdd.propTypes = {
  disabled: PropTypes.bool,
  onSend: PropTypes.func
};

ChatMessageAdd.defaultProps = {
  disabled: false
};

export default ChatMessageAdd;
