/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography
} from '@material-ui/core';

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
  const [value, setValue] = useState(
    data.operator ? data.operator : ''
  );

  useEffect(() => {
    setValue(value);
    console.log(value)
    // handleChange();
    data.operator = value;
    console.log('data:', data)
  }, [value])

  const continueNext = (e) => {
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
        <FormControl component="fieldset">
          <RadioGroup name="operator" value={value} sx={{ mt: 2 }}>
            <Paper
              sx={{
                alignItems: 'flex-start',
                display: 'flex',
                mb: 2,
                padding: 2,
              }}
              variant="outlined"
            >
              <Radio
                  // checked={value}
                  color="primary"
                  name="solo"
                  value="solo"
                  // onClick={handleRadio}
                  onChange={(e) => setValue(e.target.value)}
              />
              <Box sx={{ ml: 2 }}>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  I’m an independent developer
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  I work alone
                </Typography>
              </Box>
            </Paper>
            <Paper
              sx={{
                alignItems: 'flex-start',
                display: 'flex',
                mb: 2,
                padding: 2
              }}
              variant="outlined"
            >
              <Radio
                  // checked={value}
                  color="primary"
                  name="group"
                  value="group"
                  onChange={(e) => setValue(e.target.value)}
              />
              <Box sx={{ ml: 2 }}>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  I represent a collective of independent developers
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  I am part of a collective of devs working on projects together
                </Typography>
              </Box>
            </Paper>
            <Paper
              sx={{
                alignItems: 'flex-start',
                display: 'flex',
                mb: 2,
                padding: 2
              }}
              variant="outlined"
            >
              <Radio
                  // checked={value}
                  color="primary"
                  name="studio"
                  value="studio"
                  onChange={(e) => setValue(e.target.value)}
              />
              <Box sx={{ ml: 2 }}>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  I represent an independent development studio
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  I am operating the channel for a studio with 2 or more developers
                </Typography>
              </Box>
            </Paper>

            <FormControlLabel value="group" control={<Radio />} label="Male" />
            <FormControlLabel value="studio" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
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
