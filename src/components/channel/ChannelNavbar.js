import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  // Button,
  // Chip,
  Divider,
  // Grid,
  Hidden,
  IconButton,
  Link,
  Toolbar
  // Typography
} from '@material-ui/core';
import MenuIcon from '../../icons/Menu';
import LogoIcon from '../LogoIcon';

const ChannelNavbar = (props) => {
  const { onSidebarMobileOpen } = props;

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'navbar.default',
        color: 'text.secondary'
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
          <Link
            color="textSecondary"
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
            color="textSecondary"
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
      <Divider />
    </AppBar>
  );
};

ChannelNavbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func
};

export default ChannelNavbar;
