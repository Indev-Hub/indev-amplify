/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, Grid, Typography } from '@material-ui/core';
import Graphics from '../graphics/Graphics';

function PlanDetails (props) {
  const { cta, plan, description, feature, primaryColor } = props;
  const [planFeature, setPlanFeature] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPlanFeature(feature);
    setIsLoading(false);
    console.log('loading', isLoading)
  }, [])

  return (
    <>
      <Grid container xs={12} mt={10} mb={-7}>
        <Grid item xs={4} backgroundColor={primaryColor ? primaryColor : "brand.primary1"} zIndex="100">
          {/* <Graphics graphicID="1" width="100%" height="100px" position="relative" zIndex="0"/>           */}
          <Typography variant="h2" color="white" textAlign="right" p={4} pr={8}>{plan}</Typography>
        </Grid>
      </Grid>
      <Grid container xs={10} sm={8} lg={6} m="auto">
        <Grid>
          <Card>
            <Grid container xs={12} m="auto" p={4} pt={7}>
              <Grid item p={3}>
                <Typography variant="h5">{description}</Typography>
              </Grid>
              {console.log('Loading', isLoading, 'plan features:', planFeature, 'feature', feature, 'Plan Features:', planFeature.features)}
              {isLoading ? (
                <Typography>Form is loading...</Typography>
              ) : (
                <>
                  {planFeature.features.map((feat) => (
                    <Grid
                      item
                      p={3}
                      xs={6}
                      key={feat.title}
                    >
                      <Typography variant="h5" fontWeight="600">{feat.title}</Typography>
                      <Typography>{feat.detail}</Typography>
                      {console.log('channel id:', feat.title)}
                    </Grid>
                  ))}

                </>
              )}
              <Grid item xs={12} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: '24px',
                      px: 5
                    }}
                  >
                    {cta}
                  </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

PlanDetails.propTypes = {
  plan: PropTypes.string,
  description: PropTypes.string,
  feature: PropTypes.array,
  primaryColor: PropTypes.string
};

export default PlanDetails;
