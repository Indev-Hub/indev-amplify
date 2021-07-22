import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  // Button,
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
import useAuth from '../hooks/useAuth';
// import Amplify, { Auth } from 'aws-amplify';
// import { AmplifySignIn, AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
// import awsconfig from '../aws-exports';
import MenuIcon from '../icons/Menu';
import LogoIcon from './LogoIcon';
import AccountPopover from './dashboard/AccountPopover';
// import AccountPopover from './dashboard/AccountPopover';

// Amplify.configure(awsconfig);

const MainNavbar = (props) => {
  const { onSidebarMobileOpen } = props;
  const { isAuthenticated } = useAuth();

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
            to="/channel-test"
            underline="none"
            variant="body1"
            paddingRight="10px"
          >
            Channel Test
          </Link>
          <Link
            color="text.reverse"
            component={RouterLink}
            to="/features"
            underline="none"
            variant="body1"
            paddingRight="10px"
          >
            Upcoming Features
          </Link>
          <Link
            color="text.reverse"
            component={RouterLink}
            to="/dashboard"
            underline="none"
            variant="body1"
            paddingRight="10px"
          >
            Dashboard
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
          { isAuthenticated === false ? (
            <Link
              color="text.reverse"
              component={RouterLink}
              to="/authentication/login"
              underline="none"
              variant="body1"
            >
              Login
            </Link>
          ) : (
            <AccountPopover />
          )}
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
