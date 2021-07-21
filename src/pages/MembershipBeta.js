/* eslint-disable */
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Grid,
  Switch,
  Typography,
  Badge,
  Skeleton,
  Hidden,
  Card
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import PlanDetails from '../components/pricing/PlanDetails';
import { PricingPlan } from '../components/pricing';
import gtm from '../lib/gtm';

const MembershipBeta = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState('');

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    (async () => {
      // const response = await fetch(`/static/pricing/pricing_${theme.palette.mode}.svg`);
      const response = await fetch(`/static/pricing/pricing_${theme.palette.mode}.svg`);
      const blob = await response.blob();

      setImage(URL.createObjectURL(blob));
      setIsLoading(false);
    })();
  }, [theme.palette.mode]);

  return (
    <>
      <Helmet>
        <title>Membership - Beta | Indev</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          pb: 6
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.default',
            py: 6
          }}
        >
          <Container maxWidth="lg">
            <Grid
              container
              alignItems="center"
              spacing={2}
              flexWrap="nowrap"
            >
              <Grid
                item
                md={7}
                xs={12}
              >
                <Typography
                  color="textPrimary"
                  variant="h3"
                >
                  Join Indev.
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ my: 2 }}
                  variant="body1"
                >
                  Sign up for the beta membership to get access to cool functionality.
                </Typography>
                <Switch color="primary" />
                <Badge
                  badgeContent="25% OFF"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: 'success.main',
                      color: 'primary.contrastText',
                      right: -38,
                      top: '25%'
                    }
                  }}
                >
                  <Typography
                    color="textPrimary"
                    variant="body1"
                  >
                    Yearly Payment
                  </Typography>
                </Badge>
              </Grid>
              <Hidden mdDown>
                <Grid
                  item
                  md={5}
                >
                  <Box
                    sx={{
                      maxWidth: 419,
                      width: '100%'
                    }}
                  >
                    {isLoading
                      ? (
                        <Skeleton
                          sx={{
                            borderRadius: 1,
                            pt: '99.76%',
                            width: '100%'
                          }}
                          variant="rectangular"
                        />
                      )
                      : (
                        <img
                          alt="Pricing Hero"
                          src={image}
                          style={{ width: '100%' }}
                        />
                      )}
                  </Box>
                </Grid>
              </Hidden>
            </Grid>
          </Container>
        </Box>
        <Container
          maxWidth="lg"
          sx={{ py: 6 }}
        >
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Card>
              </Card>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <Card>
              </Card>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <Card>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Typography
          align="center"
          color="textSecondary"
          component="p"
          variant="caption"
        >
          30% of our income goes into Whale Charity
        </Typography>
      </Box>
    </>
  );
};

export default MembershipBeta;
