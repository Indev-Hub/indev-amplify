import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Chip, Drawer, Hidden, Link } from '@material-ui/core';
import LogoIcon from './LogoIcon';

const MainSidebar = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  return (
    <Hidden lgUp>
      <Drawer
        anchor="left"
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
        PaperProps={{
          sx: {
            backgroundColor: 'background.default',
            width: 256
          }
        }}
      >
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: 2
          }}
        >
          <RouterLink to="/">
            <LogoIcon />
          </RouterLink>
          <Box
            sx={{
              display: 'flex',
              pb: 2,
              pt: 3
            }}
          >
            <Link
              color="textSecondary"
              component={RouterLink}
              to="/authentication/register"
              underline="none"
              variant="body1"
            >
              Register
            </Link>
            <Chip
              color="primary"
              label="YES!"
              size="small"
              sx={{
                maxHeight: 20,
                ml: 1,
                mr: 2
              }}
            />
          </Box>
          <Link
            color="textSecondary"
            component={RouterLink}
            to="/authentication/login"
            underline="none"
            variant="body1"
          >
            Login
          </Link>
          <Button
            color="primary"
            component="a"
            href="https://material-ui.com/store/items/devias-kit-pro"
            size="small"
            sx={{ mt: 4 }}
            target="_blank"
            variant="contained"
          >
            Devias Kit Pro
          </Button>
        </Box>
      </Drawer>
    </Hidden>
  );
};

MainSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default MainSidebar;
