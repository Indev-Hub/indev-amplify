import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Box, Button, TextField } from '@material-ui/core';
import { createCard } from '../../../slices/kanban';
import { useDispatch } from '../../../store';
import FileDropzone from '../../FileDropzone';

const VideoLibraryCardAdd = (props) => {
  const { columnId, ...other } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleAddInit = () => {
    setIsExpanded(true);
  };

  const handleAddCancel = () => {
    setIsExpanded(false);
    setName('');
  };

  const handleAddConfirm = async () => {
    try {
      await dispatch(createCard(columnId, name || 'Untitled Card'));
      setIsExpanded(false);
      setName('');
      enqueueSnackbar('Card created', {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'success'
      });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err.message, {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'error'
      });
    }
  };

  return (
    <div {...other}>
      {isExpanded
        ? (
          <>
            <FileDropzone />
            <Box
              sx={{
                display: 'flex',
                mt: 1
              }}
            >
              <TextField
                fullWidth
                label="Video Title"
                name="cardName"
                onChange={handleChange}
                value={name}
                variant="outlined"
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2
              }}
            >
              <Button
                color="primary"
                onClick={handleAddCancel}
                variant="text"
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={handleAddConfirm}
                variant="contained"
              >
                Add
              </Button>
            </Box>
          </>
        )
        : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Button
              color="primary"
              onClick={handleAddInit}
              variant="text"
            >
              Add Video
            </Button>
          </Box>
        )}
    </div>
  );
};

VideoLibraryCardAdd.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default VideoLibraryCardAdd;
