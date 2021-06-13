import { Box } from '@material-ui/core';
import LogoIcon from './LogoIcon';
import FeaturedSliderParallax from './featured-slider-parallax/FeaturedSliderParallax';

const SlashScreen = () => (
  <Box
    sx={{
      alignItems: 'center',
      backgroundColor: 'background.paper',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      left: 0,
      p: 3,
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 2000
    }}
  >
    <LogoIcon />
    <FeaturedSliderParallax />
  </Box>
);

export default SlashScreen;
