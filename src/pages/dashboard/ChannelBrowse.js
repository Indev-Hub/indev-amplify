import { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@material-ui/core';
import { ChannelBrowseFilter, ChannelBrowseResults } from '../../components/dashboard/channel';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import PlusIcon from '../../icons/Plus';
import gtm from '../../lib/gtm';
import axios from '../../lib/axios';

const ChannelBrowse = () => {
  const isMountedRef = useIsMountedRef();
  const { settings } = useSettings();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getChannels = useCallback(async () => {
    try {
      const response = await axios.get('/api/channels/channels');

      if (isMountedRef.current) {
        setChannels(response.data.channels);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getChannels();
  }, [getChannels]);

  return (
    <>
      <Helmet>
        <title>Dashboard: Channel Browse | Indev</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            alignItems="center"
            container
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                See the latest opportunities
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard/channels"
                  variant="subtitle2"
                >
                  Channels
                </Link>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Browse
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  component={RouterLink}
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  to="/dashboard/channels/new"
                  variant="contained"
                >
                  New Channel
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <ChannelBrowseFilter />
          </Box>
          <Box sx={{ mt: 6 }}>
            <ChannelBrowseResults channels={channels} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ChannelBrowse;
