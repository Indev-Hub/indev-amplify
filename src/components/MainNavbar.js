import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  // Button,
  // Chip,
  // Divider,
  // Grid,
  Hidden,
  IconButton,
  Link,
  Toolbar
  // Typography
} from '@material-ui/core';
// import Amplify, { Auth } from 'aws-amplify';
// import { AmplifySignIn, AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
// import awsconfig from '../aws-exports';
import MenuIcon from '../icons/Menu';
import LogoIcon from './LogoIcon';

// Amplify.configure(awsconfig);

const MainNavbar = (props) => {
  const { onSidebarMobileOpen } = props;

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'navbar.default',
        color: 'text.reverse'
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarMobileOpen}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        </Hidden>
        <Hidden lgDown>
          <RouterLink to="/">
            <LogoIcon
              sx={{
                height: 40,
                width: 40
              }}
            />
          </RouterLink>
        </Hidden>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden mdDown>
          {/* <AmplifySignIn />
          <AmplifySignOut /> */}
          <Link
            color="text.reverse"
            component={RouterLink}
            to="/channel"
            underline="none"
            variant="body1"
            paddingRight="10px"
          >
            Channel
          </Link>
          <Link
            color="text.reverse"
            component={RouterLink}
            to="/authentication/register"
            underline="none"
            variant="body1"
            paddingRight="10px"
          >
            Register
          </Link>
          {/* <Chip
            color="primary"
            label="YES!"
            size="small"
            sx={{
              maxHeight: 20,
              ml: 1,
              mr: 2
            }}
          /> */}
          <Link
            color="text.reverse"
            component={RouterLink}
            to="/authentication/login"
            underline="none"
            variant="body1"
          >
            Login
          </Link>
          {/* <Divider
              orientation="vertical"
              sx={{
                height: 32,
                mx: 2
              }}
            />
            <Button
              color="primary"
              component="a"
              href="https://material-ui.com/store/items/devias-kit-pro"
              size="small"
              target="_blank"
               variant="contained"
            >
             Devias Kit Pro
              </Button> */}
        </Hidden>

      </Toolbar>
      {/* <Divider /> */}
    </AppBar>
  );
};

MainNavbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func
};

export default MainNavbar;
