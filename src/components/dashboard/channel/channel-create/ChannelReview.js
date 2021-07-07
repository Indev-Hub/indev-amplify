/* eslint-disable */
import { Box, Button, Card, Grid, Typography } from "@material-ui/core";
import React from "react";
const ChannelReview = (props) => {
  const { data, back, addChannel } = props;

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
          If everything looks good then go ahead and submit your channel.
        </Typography>
          <Grid container display="flex">
            <Grid item textAlign="center" alignContent="center" pr={1}>
              <Card sx={{ p:2, mt:4}}>
                <Typography fontWeight="500">Channel Name</Typography>
                <Typography variant="h6" fontWeight="800">{data.name}</Typography>
              </Card>
            </Grid>
            <Grid item textAlign="center" alignContent="center" pr={1}>
              <Card sx={{ p:2, mt:4}}>
                <Typography fontWeight="500">Channel Category</Typography>
                <Typography variant="h6" fontWeight="800">{data.category}</Typography>
              </Card>
            </Grid>
          </Grid>
        <Card sx={{ p:2, mt:4}}>
          <Grid container display="flex">
            <Grid item textAlign="center" alignContent="center" pr={1}>
              <Typography fontWeight="500">Channel Description</Typography>
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

            {/* Send channel_title and channel_category to db */}
            <Button
              color="primary"
              onClick={addChannel}
              size="large"
              variant="contained"
            >
              Create Channel
            </Button>
          </Box>
      </Card>
    </>
  );
};
export default ChannelReview;