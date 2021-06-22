import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, FormHelperText, Paper, Radio, Typography } from '@material-ui/core';

const typeOptions = [
  {
    description: ' ',
    title: 'I’m an independent developer',
    value: 'solo'
  },
  {
    description: 'I am part of a collective of devs working on projects together',
    title: 'I represent a collective of independent developers',
    value: 'group'
  },
  {
    description: 'I am operating the channel for a studio with 2 or more developers',
    title: 'I represent an independent development studio',
    value: 'studio'
  }
];

const ChannelOwnerForm = (props) => {
  const { onBack, onNext, ...other } = props;
  const [type, setType] = useState(typeOptions[1].value);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (newType) => {
    setType(newType);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      // NOTE: Make API request

      if (onNext) {
        onNext();
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
          Who is operating this channel?
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          You can update this later if your operating status changes.
        </Typography>
        <Box sx={{ mt: 2 }}>
          {typeOptions.map((typeOption) => (
            <Paper
              key={typeOption.value}
              sx={{
                alignItems: 'flex-start',
                display: 'flex',
                mb: 2,
                padding: 2
              }}
              variant="outlined"
            >
              <Radio
                checked={type === typeOption.value}
                color="primary"
                onClick={() => handleChange(typeOption.value)}
              />
              <Box sx={{ ml: 2 }}>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  {typeOption.title}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {typeOption.description}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
        {error && (
          <Box sx={{ mt: 2 }}>
            <FormHelperText error>
              {error}
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
            Next
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ChannelOwnerForm.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func
};

export default ChannelOwnerForm;
