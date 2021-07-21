import { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import gtm from '../../lib/gtm';
// import Features from '../../components/other/Features';
import { PricingPlan } from 'src/components/pricing';

const MembershipPricing = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>Indev | Feature</title>
      </Helmet>
      <Box backgroundColor={theme.palette.brand.background2} minHeight="100vh">
        <PricingPlan />
      </Box>
    </>
  );
};

export default MembershipPricing;
