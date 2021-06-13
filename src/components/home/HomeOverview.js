import { Box, Container, Hidden, Typography } from '@material-ui/core';
import ChevronRightIcon from '../../icons/ChevronRight';
import ContentSearch from '../dashboard/ContentSearch';

const HomeOverview = (props) => (
  <Box
    sx={{
      backgroundColor: 'primary.main',
      py: 6
    }}
    {...props}
  >
    <Container
      maxWidth="lg"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row'
        }
      }}
    >
      <div>
        <Typography
          sx={{
            color: 'primary.contrastText',
            textAlign: {
              md: 'left',
              xs: 'center'
            }
          }}
          variant="h3"
        >
          Software
        </Typography>

      </div>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'flex-end',
          pr: 4
        }}
      >
        <Hidden mdDown>
          <ChevronRightIcon
            fontSize="large"
            sx={{ color: 'primary.contrastText' }}
          />
        </Hidden>
      </Box>
      <div>
        <Typography
          sx={{
            color: 'primary.contrastText',
            textAlign: {
              md: 'left',
              xs: 'center'
            }
          }}
          variant="h3"
        >
          Mobile App
        </Typography>

      </div>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'flex-end',
          pr: 4
        }}
      >
        <Hidden mdDown>
          <ChevronRightIcon
            fontSize="large"
            sx={{ color: 'primary.contrastText' }}
          />
        </Hidden>
      </Box>
      <div>
        <Typography
          sx={{
            color: 'primary.contrastText',
            textAlign: {
              md: 'left',
              xs: 'center'
            }
          }}
          variant="h3"
        >
          Games
        </Typography>
      </div>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'flex-end',
          pr: 4
        }}
      >
        <Hidden mdDown>
          <ChevronRightIcon
            fontSize="large"
            sx={{ color: 'primary.contrastText' }}
          />
        </Hidden>
      </Box>
      <div>
        <ContentSearch />
      </div>
    </Container>
  </Box>
);

export default HomeOverview;
