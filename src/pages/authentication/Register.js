import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Card, CardContent, Container, Divider, Link /* , Typography */ } from '@material-ui/core';
import AuthBanner from '../../components/authentication/AuthBanner';
import {
  RegisterAmplify,
  RegisterAuth0,
  RegisterFirebase,
  RegisterJWT
} from '../../components/authentication/register';
// import LogoIcon from '../../components/LogoIcon';
import IndevBeta from '../../components/assets/IndevBeta500px.png';
import useAuth from '../../hooks/useAuth';
import gtm from '../../lib/gtm';

// const platformIcons = {
//   Amplify: '/static/icons/amplify.svg',
//   Auth0: '/static/icons/auth0.svg',
//   Firebase: '/static/icons/firebase.svg',
//   JWT: '/static/icons/jwt.svg'
// };

const Register = () => {
  const { platform } = useAuth();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Register | indev</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <AuthBanner />
        <Container
          maxWidth="sm"
          sx={{ py: '80px' }}
        >
          <Box
            sx={{
              mb: 8,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <RouterLink to="/">
              <img
                src={IndevBeta}
                height="auto"
                width="300px"
                sx={{
                  height: 'auto',
                  width: 0
                }}
                alt="Indev Beta"
              />
            </RouterLink>
          </Box>
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 4
              }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 0
                }}
              >
                {/* <div>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                  >
                    Register
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Register on the internal platform
                  </Typography>
                </div> */}
                {/* <Box
                  sx={{
                    height: 32,
                    '& > img': {
                      maxHeight: '100%',
                      width: 'auto'
                    }
                  }}
                >
                  <img
                    alt="Auth platform"
                    src={platformIcons[platform]}
                  />
                </Box> */}
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 0
                }}
              >
                {platform === 'Amplify' && <RegisterAmplify />}
                {platform === 'Auth0' && <RegisterAuth0 />}
                {platform === 'Firebase' && <RegisterFirebase />}
                {platform === 'JWT' && <RegisterJWT />}
              </Box>
              <Divider sx={{ my: 3 }} />
              <Link
                color="textSecondary"
                component={RouterLink}
                to="/authentication/login"
                variant="body2"
              >
                Have an account? Login
              </Link>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Register;
