import { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import {
  // HomeClients,
  ChannelTemplate
  // HomeOverview,
  // HomeRoles,
  // HomeFeatures,
  // ChannelSlider
} from '../../components/channel';
import gtm from '../../lib/gtm';

const Channel = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>Indev | Channel</title>
      </Helmet>
      <Box backgroundColor={theme.palette.brand.background2} minHeight="100vh">
        <ChannelTemplate title="Channel Name" author="display name" supporters="180" videos="24" updates="33" target="2,400" amount="1,800" weeks="9" est="47" stage="Planning" price1="5" price2="10" trailer="440012560" />
      </Box>
    </>
  );
};

export default Channel;
