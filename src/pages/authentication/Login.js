import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Card, CardContent, Container, Divider, Link /* , Typography */ } from '@material-ui/core';
import AuthBanner from '../../components/authentication/AuthBanner';
import {
  LoginAmplify,
  LoginAuth0,
  LoginFirebase,
  LoginJWT
} from '../../components/authentication/login';
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

const Login = () => {
  const { platform } = useAuth();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Login | indev</title>
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
          maxWidth="xs"
          sx={{ py: '80px' }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 8
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
                    Log in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Log in on the internal platform
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
                {platform === 'Amplify' && <LoginAmplify />}
                {platform === 'Auth0' && <LoginAuth0 />}
                {platform === 'Firebase' && <LoginFirebase />}
                {platform === 'JWT' && <LoginJWT />}
              </Box>
              <Divider sx={{ my: 3 }} />
              <Link
                color="textSecondary"
                component={RouterLink}
                to="/authentication/register"
                variant="body2"
              >
                No account? Register
              </Link>
              {platform === 'Amplify' && (
                <Link
                  color="textSecondary"
                  component={RouterLink}
                  sx={{ mt: 1 }}
                  to="/authentication/password-recovery"
                  variant="body2"
                >
                  Forgot password
                </Link>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
