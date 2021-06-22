import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import MinusIcon from '../icons/Minus';
import LogoIcon from './LogoIcon';

const sections = [
  {
    title: 'General',
    links: [
      {
        title: 'Login',
        href: '/authentication/login'
      },
      {
        title: 'Register',
        href: '/authentication/register'
      },
      {
        title: 'Dashboard',
        href: '#'
      }
    ]
  },
  {
    title: 'Policies',
    links: [
      {
        title: 'Terms & Conditions',
        href: '#'
      },
      {
        title: 'Privacy Policy',
        href: '#'
      },
      {
        title: 'Community Guidelines',
        href: '#'
      },
      {
        title: 'Ads & Sponsorship',
        href: '#'
      },
      {
        title: 'Copyright',
        href: '#'
      }
    ]
  },
  {
    title: 'Community',
    links: [
      {
        title: 'Instagram',
        href: '#'
      },
      {
        title: 'LinkedIn',
        href: '#'
      },
      {
        title: 'Our Team',
        href: '#'
      }
    ]
  }
];

const Footer = (props) => (
  <Box
    sx={{
      backgroundColor: 'brand.background1',
      pb: 6,
      pt: {
        md: 4,
        xs: 2
      }
    }}
    {...props}
  >
    <Container maxWidth="lg">
      <Grid
        container
        spacing={0}
      >
        <Grid
          item
          md={3}
          sm={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            order: {
              md: 1,
              xs: 4
            }
          }}
          xs={12}
        >
          <LogoIcon
            sx={{
              height: 40,
              width: 40
            }}
          />
          <Box sx={{ mt: 1 }}>
            <Typography
              color="text.reverse"
              variant="caption"
            >
              Indev
              <br />
              info@indevhub.com
            </Typography>
          </Box>
        </Grid>
        {sections.map((section, index) => (
          <Grid
            item
            key={section.title}
            md={3}
            sm={4}
            sx={{
              order: {
                md: index + 2,
                xs: index + 1
              }
            }}
            xs={12}
          >
            <Typography
              color="brand.primary1"
              variant="overline"
              fontSize=".8rem"
              letterSpacing=".25rem"
            >
              {section.title}
            </Typography>
            <List disablePadding>
              {section.links.map((link) => (
                <ListItem
                  disableGutters
                  key={link.title}
                  sx={{
                    pb: 0,
                    pt: 0
                  }}
                >
                  <ListItemAvatar
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      minWidth: 0,
                      mr: 0.5
                    }}
                  >
                    <MinusIcon color="primary" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={(
                      <Link
                        href={link.href}
                        color="text.reverse"
                        fontWeight="400"
                        variant="subtitle2"
                      >
                        {link.title}
                      </Link>
                    )}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
      <Divider
        sx={{
          borderColor: (theme) => alpha(theme.palette.primary.contrastText, 0.12),
          my: 6
        }}
      />
      <Box
        textAlign="center"
      >
        <Typography
          sx={{
            color: 'brand.primary0'
          }}
          variant="caption"
        >
          Copyright indev 2021
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default Footer;
