// import { experimentalStyled } from '@material-ui/core/styles';
import mainLogo from './assets/Logo.png';

// const LogoRoot = experimentalStyled('svg')();

const Logo = (props) => (
  <img
    src={mainLogo}
    alt="Indev"
    height="40"
    version="1.1"
    viewBox="0 0 52 52"
    width="40"
    {...props}
  />
);

export default Logo;
