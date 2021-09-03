/* eslint-disable */
import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import FileDropzone from "src/components/FileDropzone";
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import { getProject, getUser } from '../../graphql/queries';
import ProjectEdit_v2 from '../../components/dashboard/project/project-edit/ProjectEdit_v2';

const ProjectDashboardEdit = (props) => {
  const { projectDashboardId } = useParams();
  const { settings } = useSettings();
  const { user } = useAuth();
  console.log('user', user)
  const [loading, setLoading] = useState(true);
  const [connectFetch, setConnectFetch] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(null);

  // Set state for User table
  const [userData, setUserData] = useState([]);

  // Set state for Project table
  const [projectData, setProjectData] = useState();

  // Load User table data
  useEffect(() => {
    gtm.push({ event: 'page_view' });
    getUserInfo();
    getProjectInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(getUser, { id: user.id }));
      const userList = userData.data.getUser;
      setUserData(userList);
      console.log('list', userList);
    } catch (error) {
      console.log('error on fetching user', error);
    }
  };

  const getProjectInfo = async () => {
    try {
      const getProjectData = await API.graphql(graphqlOperation(getProject, { id: projectDashboardId }));
      const listProjectData = getProjectData.data.getProject;
      setProjectData(listProjectData);
      console.log('Project list', listProjectData);

      setLoading(false);
    } catch (error) {
      console.log('error on fetching videos', error);
    }
  };

  return (
    <>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Helmet>
            <title>Dashboard: Project Edit | Indev</title>
          </Helmet>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 0
            }}
          >
            {/* <Container maxWidth={settings.compact ? 'xl' : false}> */}
              <Grid
                alignItems="center"
                container
                justifyContent="space-between"
                spacing={0}
                {...props}
              >
                {/* <Grid item>
                  <Typography
                    color="textPrimary"
                    variant="h5"
                  >
                    Project Edit
                  </Typography>
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    separator={<ChevronRightIcon fontSize="small" />}
                    sx={{ mt: 1 }}
                  >
                    <Link
                      color="textPrimary"
                      component={RouterLink}
                      to="/dashboard"
                      variant="subtitle2"
                    >
                      Dashboard
                    </Link>
                    <Link
                      color="textPrimary"
                      component={RouterLink}
                      to="/dashboard/projects"
                      variant="subtitle2"
                    >
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                      >
                        Project
                      </Typography>
                    </Link>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                    >
                      {projectData.name}
                    </Typography>
                  </Breadcrumbs>
                </Grid> */}
              </Grid>
              <Box sx={{ mt: 3 }}>
                {/* <UpdateAdd2 project={projectData} user={userData} /> */}
                <ProjectEdit_v2 project={projectData} user={userData} />
              </Box>
            {/* </Container> */}
          </Box>
        </>
      )}
    </>
  );
};

export default ProjectDashboardEdit;
