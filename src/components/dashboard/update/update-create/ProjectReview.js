/* eslint-disable */
import { Box, Button, Card, Grid, Typography } from "@material-ui/core";
import React from "react";
const ProjectReview = (props) => {
  const { data, back, addProject } = props;

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Typography
          color="textPrimary"
          variant="h6"
        >
          Review your channel information
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          If everything looks good then go ahead and create your channel.
        </Typography>
          <Grid container display="flex">
            <Grid item textAlign="center" alignContent="center" pr={1}>
              <Card sx={{ p:2, mt:4}}>
                <Typography fontWeight="500">Project Name</Typography>
                <Typography variant="h6" fontWeight="800">{data.name}</Typography>
              </Card>
            </Grid>
            <Grid item textAlign="center" alignContent="center" pr={1}>
              <Card sx={{ p:2, mt:4}}>
                <Typography fontWeight="500">Project Category</Typography>
                <Typography variant="h6" fontWeight="800">{data.category}</Typography>
              </Card>
            </Grid>
          </Grid>
        <Card sx={{ p:2, mt:4}}>
          <Grid container display="flex">
            <Grid item textAlign="center" alignContent="center" pr={1}>
              <Typography fontWeight="500">Project Description</Typography>
              <Typography variant="h6" fontWeight="800">{data.description}</Typography>
            </Grid>
          </Grid>
        </Card>
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
            Go Back
          </Button>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
      </Card>
        {/* Send channel_title and channel_category to db */}
        <Button
          color="primary"
          onClick={addProject}
          size="large"
          variant="contained"
          fullWidth
          sx={{
            p:2,
            mt:2
          }}
        >
          Create Project
        </Button>
    </>
  );
};
export default ProjectReview;