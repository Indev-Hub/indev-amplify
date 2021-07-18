import React from 'react';
import { Box, Button, Card, Grid, Typography } from '@material-ui/core';

// const ui = [
//   {
//     Name:
//   }
// ]

const Features = () => {
  const Headline = 'Upcoming Features and Fixes';
  return (
    <Grid container display="flex" xs={10} m="auto" mt={5}>
      <Card sx={{ width: '100%', p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h2">{Headline}</Typography>
        <Box>
          <Button sx={{ borderRadius: 5, height: 0, mr: 2 }} variant="contained">Report a bug</Button>
          <Button sx={{ borderRadius: 5, height: 0, mr: 2 }} variant="contained">Request a feature</Button>
        </Box>
      </Card>
      <Grid
        item
        width="100%"
        pt={3}
      >
        <Card
          sx={{
            p: 3
          }}
        >
          <Typography variant="h2">{Headline}</Typography>
        </Card>
      </Grid>

    </Grid>
  );
};

export default Features;
