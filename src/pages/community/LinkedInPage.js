/* eslint-disable */

import { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import {
  // HomeClients,
  // ChannelTemplate,
  // HomeOverview,
  // HomeRoles,
  // HomeFeatures,
  // ChannelSlider
} from '../../components/channel';
import gtm from '../../lib/gtm';
import LinkedIn from '../../components/community/LinkedIn';

const LinkedInPage = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>Indev | LinkedIn</title>
      </Helmet>
      <Box backgroundColor={theme.palette.brand.background2} minHeight="100vh">
        <LinkedIn />
      </Box>
    </>
  );
};


export default LinkedInPage;
