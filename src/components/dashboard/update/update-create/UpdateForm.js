/* eslint-disable */
import React from "react";
import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography
} from "@material-ui/core";
import { Button } from "@material-ui/core";

const UpdateForm = (props) => {
  const { data, handleChange, addUpdate, next, back } = props;
  return (
    <form>
      <Grid container sx={{ p: 3, mt: 4 }}>
        <Grid item pr={3} xs={8}>
          <Card sx={{ p: 3 }}>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              Update
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
                label="Update Title"
                name="name"
                // onBlur={handleBlur}
                onChange={handleChange}
                value={data.name}
                variant="outlined"
              />
              <Box pt={2}>
                <TextField
                  // error={Boolean(touched.channel_title && errors.channel_title)}
                  fullWidth
                  // helperText={touched.channel_title && errors.channel_title}
                  label="Short description"
                  name="short"
                  // onBlur={handleBlur}
                  onChange={handleChange}
                  value={data.short}
                  variant="outlined"
                />
              </Box>
              <Grid container display="flex" sx={{ mt: 2 }}>
          <FormControl
            fullWidth
            variant="outlined"
          >
            <InputLabel>
              Update Type
            </InputLabel>
            <Select
              // error={Boolean(touched.channel_category && errors.channel_category)}
              fullWidth
              // helperText={touched.channel_category && errors.channel_category}
              label="Update type"
              name="type"
              // onBlur={handleBlur}
              onChange={handleChange}
              value={data.type}
            >
              <MenuItem value="text">
                Written Update
              </MenuItem>
              <MenuItem value="video">
                Video Update
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
            </Box>
            <Box
              sx={{
                display: 'flex',
                mt: 6
              }}
            >
              {/* <Button
                color="primary"
                onClick={back}
                size="large"
                variant="text"
              >
                Previous
              </Button> */}
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
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ ml: 1 }}>
              <FormControlLabel
                control={(
                  <Switch
                    color="primary"
                    edge="start"
                    name="enablePublishAt"
                  />
                )}
                label="Schedule Publish"
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
      {/* Send channel_title and channel_category to db */}
      <Button
        color="primary"
        onClick={addUpdate}
        size="large"
        variant="contained"
        fullWidth
        sx={{
          p:2,
          mt:2
        }}
      >
        Create Update
      </Button>
    </form>
  );
};
export default UpdateForm;
