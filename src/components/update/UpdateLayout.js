import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core/styles';
import UpdateNavbar from './UpdateNavbar';
// import Footer from '../../../components/Footer';

const UpdateLayoutRoot = experimentalStyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%',
  paddingTop: 64
}));

const UpdateLayout = () => (
  <UpdateLayoutRoot>
    <UpdateNavbar />
    <Outlet />
    {/* <Footer /> */}
  </UpdateLayoutRoot>
);

export default UpdateLayout;
