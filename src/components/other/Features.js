import React, { useState } from 'react';
import { Box, Button, Card, Chip, Grid, IconButton, Typography } from '@material-ui/core';
import { PlusOneTwoTone } from '@material-ui/icons';

const features = [
  {
    name: 'Zoom Integration',
    description: 'Automatically add Zoom cloud recordings to your channel',
    status: 'In Development'
  },
  {
    name: 'Discord Integration',
    description: 'Embed discord chat into channel so developers can message their supporters directly using discord without needing to leave Indev.',
    status: 'In Development'
  }
];

const fixes = [
  {
    name: 'Authentication on page refresh',
    description: 'Every time a page is refreshed the user is logged out and redirected to the login page. The user should stay logged in when a page is refreshed.',
    status: 'In Development'
  }
];

const Features = () => {
  const Headline = 'Upcoming Features and Fixes';

  const [textWrap, setTextWrap] = useState(true);

  const switchWrap = () => {
    if (textWrap) {
      return setTextWrap(false);
    } if (textWrap === false) {
      return setTextWrap(true);
    }
    return setTextWrap(null);
  };

  const chipColor = (status) => {
    switch (status) {
      case 'In Queue':
        return 'chip.chip1';
      case 'In Development':
        return 'chip.chip2';
      case 'Testing':
        return 'chip.chip3';
      case 'Deployed':
        return 'chip.chip4';
      default:
        return '#eee';
    }
  };

  return (
    <Grid container display="flex" xs={10} m="auto" mt={5}>
      <Card sx={{ width: '100%', p: 5 }} onClick={switchWrap} href="#">
        <Grid item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} xs={12}>
          <Typography variant="h2">{Headline}</Typography>
          <Box>
            <Button sx={{ borderRadius: 5, height: 0, mr: 2 }} variant="contained">Report bug</Button>
            <Button sx={{ borderRadius: 5, height: 0, mr: 2 }} variant="contained">Request feature</Button>
          </Box>
        </Grid>
        <Grid
          item
          pt={3}
        >
          <Box display="flex" alignItems="flex-end">
            <Typography variant="h3" sx={{ pl: 3 }}>Features</Typography>
            <Button sx={{ borderRadius: 5, ml: 1, mb: 0 }}>Request feature</Button>
          </Box>
          { features.map((feat) => (
            <Card
              sx={{
                px: 3,
                py: 1,
                mt: 1
              }}
            >
              <Grid container alignItems="center">
                <Grid item xs={5} pr={2}>
                  <Typography variant="h6">{feat.name}</Typography>
                  <Typography lineHeight="1.2" noWrap={textWrap}>{feat.description}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Chip
                    label={feat.status}
                    sx={{
                      color: 'brand.primary0',
                      backgroundColor: chipColor(feat.status)
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  {/* eslint-disable-next-line */}
                  <IconButton><PlusOneTwoTone /></IconButton>
                </Grid>
              </Grid>
            </Card>
          ))};
        </Grid>
        <Grid
          item
          pt={3}
        >
          <Box display="flex" alignItems="flex-end">
            <Typography variant="h3" sx={{ pl: 3 }}>Bugs and Fixes</Typography>
            <Button sx={{ borderRadius: 5, ml: 1, mb: 0 }}>Report bug</Button>
          </Box>
          { fixes.map((fix) => (
            <Card
              sx={{
                px: 3,
                py: 1,
                mt: 1
              }}
            >
              <Grid container alignItems="center">
                <Grid item xs={5} pr={2}>
                  <Typography variant="h6">{fix.name}</Typography>
                  <Typography lineHeight="1.2" noWrap={textWrap}>{fix.description}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Chip
                    label={fix.status}
                    sx={{
                      color: 'brand.primary0',
                      backgroundColor: chipColor(fix.status)
                    }}
                  />
                </Grid>
              </Grid>
            </Card>
          ))};
        </Grid>
      </Card>
    </Grid>
  );
};

export default Features;
