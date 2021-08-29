import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core/styles';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../graphql/queries';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebarDeveloper from './DashboardSidebarDeveloper';
import useAuth from '../../hooks/useAuth';

const DashboardLayoutRoot = experimentalStyled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%'
}));

const DashboardLayoutWrapper = experimentalStyled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: '64px',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: '280px'
  }
}));

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
  position: 'relative',
  WebkitOverflowScrolling: 'touch'
});

const DashboardLayout = () => {
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
  const { user } = useAuth();

  // ============================== //
  //      Load User table data      //
  // ============================== //

  useEffect(() => {
    getUserTable();
  }, []);

  const getUserTable = async () => {
    try {
      const userInfo = await API.graphql(graphqlOperation(getUser, { id: user.id }));
      console.log('user info', userInfo);
      const userData = userInfo.data.getUser;
      sessionStorage.setItem('userData', JSON.stringify(userData));
      console.log('user data', userData);
    } catch (error) {
      console.log('error on fetching user table', error);
    }
  };

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar onSidebarMobileOpen={() => setIsSidebarMobileOpen(true)} />
      <DashboardSidebarDeveloper
        onMobileClose={() => setIsSidebarMobileOpen(false)}
        openMobile={isSidebarMobileOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
