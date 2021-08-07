/* eslint-disable */
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import React, { useState } from "react";
import FileDropzone from "src/components/FileDropzone";
import QuillEditor from "src/components/QuillEditor";

const ProjectDescription = (props) => {
  const { data, savedContent, handleChange, next, back } = props;
  // const [content, setContent] = useState(savedContent); // api for channel_description goes here

  return (
    <form>
      <Card sx={{ p: 3 }}>
        <Typography
          color="textPrimary"
          variant="h6"
        >
          Project Description
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          Tell us about the kinds of projects you plan to work on and why users will want to support your efforts.
        </Typography>
        <Grid sx={{ mt: 2 }}>
          <TextField
            // error={Boolean(touched.channel_title && errors.channel_title)}
            // helperText={touched.channel_title && errors.channel_title}
            fullWidth
            label="Project Description"
            name="description"
            multiline="true"
            maxRows="2"
            // onBlur={handleBlur}
            onChange={handleChange}
            value={data.description}
            variant="outlined"
          />
          <Typography fontSize="12px" sx={{ml:2}}>Max 250 characters</Typography>
        </Grid>
        <Grid container display="flex" sx={{ mt: 2 }}>
          <Grid item>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              onChange={handleChange}
              value={data.startDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item sx={{ ml: 4 }}>
            <TextField
              label="Estimated End Date"
              name="endDate"
              type="date"
              onChange={handleChange}
              value={data.endDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item sx={{ ml: 4 }}>
            <Typography> 
              When did you start your project and when do you think it will be finished?
            </Typography>
          </Grid>
        </Grid>
        <Grid container display="flex" sx={{ mt: 2 }}>
          <FormControl
            fullWidth
            variant="outlined"
          >
            <InputLabel>
              Development Stage
            </InputLabel>
            <Select
              // error={Boolean(touched.channel_category && errors.channel_category)}
              fullWidth
              // helperText={touched.channel_category && errors.channel_category}
              label="Stage of development"
              name="devStage"
              // onBlur={handleBlur}
              onChange={handleChange}
              value={data.devStage}
            >
              <MenuItem value="planning">
                Planning
              </MenuItem>
              <MenuItem value="analysis">
                Analysis
              </MenuItem>
              <MenuItem value="design">
                Design
              </MenuItem>
              <MenuItem value="development">
                Development
              </MenuItem>
              <MenuItem value="testing">
                Testing
              </MenuItem>
              <MenuItem value="maintenance">
                Maintenance
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Typography
          color="textPrimary"
          variant="h6"
          sx={{
            mt: 4
          }}
        >
          Project Cover Image
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          Select your main channel image. This will be used for displaying your channel in search results.
        </Typography>
        <Paper
          sx={{ mt: 2 }}
        >
          <FileDropzone
            accept="image/*"
            maxFiles={1}
            value={data.featuredImg}
          />
        </Paper>
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
export default ProjectDescription;