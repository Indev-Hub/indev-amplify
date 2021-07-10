/* eslint-disable */
import React, { useState } from "react";
import { Box, Button, Card, FormControlLabel, FormHelperText, Paper, Radio, RadioGroup, Typography } from '@material-ui/core';

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

const ChannelDetails = (props) => {
  const { data, handleChange, next } = props;
  const [selectedValue, setSelectedValue] = useState();
  // const [sectedType, setSelectedType] = useState();
  console.log('selected value:', selectedValue);

  const handleRadio = (event) => {
    setSelectedValue(event.target.value);
    // handleChange();
    console.log('value', data);
    console.log('selected value', selectedValue);
  };

  const continueNext = (event) => {
    // handleChange();
    next();
  }

  return (
    <form>
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
                checked={selectedValue === typeOption.value}
                color="primary"
                name="operator"
                value={typeOption.value}
                onClick={handleRadio}
                onChange={handleChange}
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
        <Box
          sx={{
            display: 'flex',
            mt: 6
          }}
        >
          <Box sx={{ flexGrow: 1 }} />

            {/* Send channel_title and channel_category to db */}
            <Button
              color="primary"
              onClick={continueNext}
              size="large"
              variant="contained"
            >
              Next
            </Button>
          </Box>
      </Card>
    </form>
  );
};
export default ChannelDetails;
