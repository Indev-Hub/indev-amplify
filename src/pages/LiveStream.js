import { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import {
  LiveView
//   LiveRecord
} from '../components/live';
import gtm from '../lib/gtm';

const LiveStream = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>Indev | Live Stream</title>
      </Helmet>
      <Box backgroundColor={theme.palette.background.default} minHeight="100vh">
        <LiveView userId="10" />
        {/* <LiveRecord /> */}
      </Box>
      <Footer />
    </>
  );
};

export default LiveStream;
