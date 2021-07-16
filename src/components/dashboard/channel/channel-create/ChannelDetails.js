/* eslint-disable */
import React from "react";
import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import { Button } from "@material-ui/core";

const ChannelDetails = (props) => {
  const { data, handleChange, next, back } = props;
  return (
    <form>
      <Card sx={{ p: 3 }}>
        <Typography
          color="textPrimary"
          variant="h6"
        >
          Channel details
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          Enter some basic information to categorize your channel. You can change this information later.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            // error={Boolean(touched.channel_title && errors.channel_title)}
            fullWidth
            // helperText={touched.channel_title && errors.channel_title}
            label="Channel Name"
            name="name"
            // onBlur={handleBlur}
            onChange={handleChange}
            value={data.name}
            variant="outlined"
          />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              mt: 3
            }}
          >
            <FormControl
              fullWidth
              variant="outlined"
            >
              <InputLabel>
                Category
              </InputLabel>
              <Select
                // error={Boolean(touched.channel_category && errors.channel_category)}
                fullWidth
                // helperText={touched.channel_category && errors.channel_category}
                label="Category"
                name="category"
                // onBlur={handleBlur}
                onChange={handleChange}
                value={data.category}
              >
                <MenuItem value="game">
                  Game Development
                </MenuItem>
                <MenuItem value="software">
                  Software Development
                </MenuItem>
                <MenuItem value="mobile">
                  Mobile App Development
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            mt: 6
          }}
        >
          <Button
            color="primary"
            onClick={back}
            size="large"
            variant="text"
          >
            Previous
          </Button>
          <Box sx={{ flexGrow: 1 }} />

            {/* Send channel_title and channel_category to db */}
            <Button
              color="primary"
              onClick={next}
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
