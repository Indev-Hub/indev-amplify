import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Card, CardContent, Container, Divider, Link, Typography } from '@material-ui/core';
import queryString from 'query-string';
import AuthBanner from '../../components/authentication/AuthBanner';
import { PasswordResetAmplify } from '../../components/authentication/password-reset';
import LogoIcon from '../../components/LogoIcon';
import useAuth from '../../hooks/useAuth';
import gtm from '../../lib/gtm';

const platformIcons = {
  Amplify: '/static/icons/amplify.svg',
  Auth0: '/static/icons/auth0.svg',
  Firebase: '/static/icons/firebase.svg',
  JWT: '/static/icons/jwt.svg'
};

const PasswordReset = () => {
  const { platform, passwordTokenValid } = useAuth();
  const [visible, setVisible] = useState(false);
  const { search } = useLocation();
  const values = queryString.parse(search);
  localStorage.setItem('userT', values.t);
  const userEmail = localStorage.getItem('userN');
  /* --------- PASSWORD TOKEN VALID ND--------- */
  // const passwordTokenValid = (token, email) => {
  //   console.log(' password reset email');
  //   console.log(email);
  //   axios.get('/api/user/validatePasswordResetToken', { params: { token, email } })
  //     .then((response) => {
  //       console.log('PASSWORD TOKEN VALID-------');
  //       console.log(response);
  //       setVisible(true);
  //     }, (error) => {
  //       console.log('PASSWORD TOKEN  IS INVALID-------');
  //       console.log(error);
  //     });
  // };
  /*---------------------------------------------------------*/
  const callbackPasswordTokenValid = (data) => {
    console.log('data callbackPasswordTokenValid ----- ');
    console.log(data);
    setVisible(true);
  };

  useEffect(() => {
    try {
      passwordTokenValid(callbackPasswordTokenValid, values.t, userEmail);
      console.log('PASSWORD TOKEN VALID try  -------');
    } catch (err) {
      console.log('PASSWORD TOKEN VALID error  -------');
      console.error(err);
    }
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Password Reset | Indev</title>
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
          sx={{ py: 10 }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <RouterLink to="/">
              <LogoIcon
                sx={{
                  height: 40,
                  width: 40
                }}
              />
            </RouterLink>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 8
            }}
          />
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
                  mb: 3
                }}
              >
                <div>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                  >
                    Password Reset
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    {!visible ? <div>To reset your password, please check your email.</div>
                      : <div>Enter your password.</div>}
                  </Typography>
                </div>
                <Box
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
                </Box>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3
                }}
              >
                {visible && platform === 'Amplify' && <PasswordResetAmplify />}
              </Box>
              <Divider sx={{ my: 3 }} />
              {platform === 'Amplify' && (
                <Link
                  color="textSecondary"
                  component={RouterLink}
                  to="/authentication/password-recovery"
                  variant="body2"
                >
                  Did you not receive the code?
                </Link>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default PasswordReset;
