import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Divider, Hidden, Link, Toolbar } from '@material-ui/core';
import LogoIcon from '../../LogoIcon';

const UpdateNavbar = (props) => (
  <AppBar
    elevation={0}
    sx={{ backgroundColor: 'background.paper' }}
    {...props}
  >
    <Toolbar sx={{ minHeight: 64 }}>
      <RouterLink to="/">
        <LogoIcon
          sx={{
            height: 40,
            width: 40
          }}
        />
      </RouterLink>
      <Box sx={{ flexGrow: 1 }} />
      <Hidden mdDown>
        <Link
          color="textSecondary"
          component={RouterLink}
          to="/"
          underline="none"
          variant="body1"
        >
          Home
        </Link>
        <Link
          color="textPrimary"
          component={RouterLink}
          to="/update"
          underline="none"
          sx={{ mx: 2 }}
          variant="body1"
        >
          Update
        </Link>
        <Link
          color="textSecondary"
          component={RouterLink}
          to="/contact"
          underline="none"
          variant="body1"
        >
          Contact Us
        </Link>
      </Hidden>
    </Toolbar>
    <Divider />
  </AppBar>
);

export default UpdateNavbar;
