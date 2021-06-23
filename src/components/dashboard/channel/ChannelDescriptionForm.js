import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, FormHelperText, Paper, Typography } from '@material-ui/core';
import QuillEditor from '../../QuillEditor';
import FileDropzone from '../../FileDropzone';

const ChannelDescriptionForm = (props) => {
  const { savedContent, onBack, onComplete, ...other } = props;
  const [content, setContent] = useState(savedContent); // api for channel_description goes here
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      // NOTE: Make API request

      if (onComplete) {
        onComplete();
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      {...other}
    >
      <Card sx={{ p: 3 }}>
        <Typography
          color="textPrimary"
          variant="h6"
        >
          Channel Description
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          Tell us about the kinds of projects you plan to work on and why users will want to support your efforts.
        </Typography>
        <Paper
          sx={{ mt: 3 }}
          // variant="outlined"
        >
          <QuillEditor
            handleChange={handleChange}
            label="Channel Description"
            name="channel_description"
            placeholder=" "
            maxLength="20"
            sx={{ height: 400 }}
            value={content}
          />
        </Paper>
        <Typography
          color="textPrimary"
          variant="h6"
          sx={{
            mt: 3
          }}
        >
          Channel Cover Image
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          Select your main channel image. This will be used for displaying your channel in search results.
        </Typography>
        <Paper
          sx={{ mt: 3 }}
        >
          <FileDropzone
            accept="image/*"
            maxFiles={1}
          />
        </Paper>
        {error && (
          <Box sx={{ mt: 2 }}>
            <FormHelperText error>
              {FormHelperText}
            </FormHelperText>
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            mt: 6
          }}
        >
          {onBack && (
            <Button
              color="primary"
              onClick={onBack}
              size="large"
              variant="text"
            >
              Previous
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button
            color="primary"
            disabled={isSubmitting}
            type="submit"
            variant="contained"
          >
            {
              (savedContent !== '')
                ? <p>Complete</p>
                : <p>Update</p>
            }
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ChannelDescriptionForm.propTypes = {
  onBack: PropTypes.func,
  onComplete: PropTypes.func,
  savedContent: PropTypes.any
};

export default ChannelDescriptionForm;
