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

const Pricing = () => {
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

  const Alpha =
  { features:
    [
      {
        title: 'Showcase your current project',
        detail: 'Promote your current project while it is in development. Share your progress and interact with your supporters along the way.'
      },
      {
        title: 'Support payments',
        detail: 'Collect monthly subscription payments from your supporters through our integration with Stripe. Safe, secure, and easy.'
      },
      {
        title: 'Job Search',
        detail: 'Indev can display your content to recruiters or companies that are looking to hire developers for on-site or remote positions.'
      },
      {
        title: 'Live stream your updates',
        detail: 'You can live stream your updates, announcements, progress reports, or anything else directly from your Indev account.'
      },
      {
        title: 'Generate recurring revenue',
        detail: 'Revenue collected from your supporters allows you to continue developing your product and all of your videos live in your library, becoming a product themselves.'
      },
      {
        title: 'Supporter forum',
        detail: ''
      }
    ]
  };

  const Beta =
  { features:
    [
      {
        title: 'All the features of Indev Alpha',
        detail: 'The Indev Beta membership includes all of the things you get with our Alpha membership plus these extra features.'
      },
      {
        title: 'Support payments',
        detail: 'Automatically upload your zoom videos to your Indev video library. Record it with Zoom and promote and sell it with Indev.'
      },
      {
        title: 'Up to 3 projects on your channel',
        detail: `If you are working on more than one project this is the membership for you. Show your supporters everything they're supporting.`
      },
      {
        title: 'Find the right people',
        detail: `Get access to Indev's supporter database to see who has the desire and skillset to help with your Indev project`
      }
    ]
  };

  const Pro =
  { features:
    [
      {
        title: 'All the features of Indev Beta',
        detail: 'The Indev Pro membership includes all of the things you get with our Beta and Alpha membership plus these extra features.'
      },
      {
        title: 'Pre-sales',
        detail: 'If you are ready to start collecting pre-sale revenue then Indev Pro will allow you to do just that.'
      },
      {
        title: 'Even more projects',
        detail: 'Create up to ten projects with the Pro account. Need even more projects? We can make that work if you give us a call.'
      },
      {
        title: 'Team',
        detail: 'You can have a team of people associated with your channel when your team needs multiple people to manage your Indev account.'
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Pricing | Indev</title>
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
                  Start developing on Indev.
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ my: 2 }}
                  variant="body1"
                >
                  Join a community where we support indie developers and independent projects.
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
                <PricingPlan
                  cta="Sign Up |  Indev Free"
                  currency="$"
                  description="For individual independent developers."
                  features={[
                    '1 Project',
                    'Receive support payments',
                    'Job placement',
                    'Live video updates',
                    'Video library',
                    'Supporter forum'
                  ]}
                  // image="/static/pricing/plan1.svg"
                  name="ALPHA"
                  price="0"
                  sx={{
                    height: '100%',
                    maxWidth: 460,
                    mx: 'auto'
                  }}
                />
              </Card>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <Card>
                <PricingPlan
                  cta="Start Free Trial"
                  currency="$"
                  description="For small teams and advanced devs."
                  features={[
                    'Up to 3 projects',
                    'Receive support payments',
                    'Job placement',
                    'Live video updates',
                    'Video library',
                    'Supporter forum',
                    'Use your own logo',
                    'Talent search',
                    'Zoom integration'
                  ]}
                  image="/static/pricing/plan2.svg"
                  name="BETA"
                  popular
                  price="16"
                  sx={{
                    height: '100%',
                    maxWidth: 460,
                    mx: 'auto'
                  }}
                />
              </Card>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <Card>
                <PricingPlan
                  cta="Contact Us"
                  currency="$"
                  description="For studios and large teams."
                  features={[
                    'Up to 10 projects',
                    'Receive support payments',
                    'Job placement',
                    'Live video updates',
                    'Video library',
                    'Supporter forum',
                    'Use your own logo',
                    'Talent search',
                    'Zoom integration',
                    'Custom logo and colors'
                  ]}
                  image="/static/pricing/plan3.svg"
                  name="PRO"
                  price="84"
                  sx={{
                    height: '100%',
                    maxWidth: 460,
                    mx: 'auto'
                  }}
                />
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
        <PlanDetails
          plan="ALPHA"
          cta="Sign up for free"
          description="The Indev Alpha membership is your chance to get your project in front of supporters for free. If you are looking for a free option, we recommend signing up as an Indev Tester since you will get all the features of the most expensive membership in exchange for telling us about your experience."
          primaryColor="brand.primary1"
          feature={Alpha}
        />
        <PlanDetails
          plan="BETA"
          cta="Beta Membership"
          description="The Beta membership is made for people that have more than one project currently in development. There are more integrations possible in this membership as well as the opportunity to use Indev to find other talented developers, artists, etc to help you out."
          feature={Beta}
        />
        <PlanDetails
          plan="PRO"
          cta="Go PRO now"
          description="The Pro membership is for teams or indie studios that are only “indie” because they like it that way. This is also a good membership for developers that have already achieved validation through a successful Kickstarter or Indiegogo campaign and want to move their customers onto an ongoing interactive platform."
          feature={Beta}
        />
      </Box>
    </>
  );
};

export default Pricing;
