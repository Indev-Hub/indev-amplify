/* eslint-disable */
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import FileDropzone from "src/components/FileDropzone";
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Breadcrumbs,
  Container,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  // IconButton,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  Link,
  Paper,
  Switch,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Chip
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import useAuth from '../../hooks/useAuth';
import Plus from '../../icons/Plus';
// import { ChannelCreateWizard } from '../../components/dashboard/channel';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import { updateChannel } from '../../graphql/mutations';
import { getChannel, getUser } from '../../graphql/queries';
import { getChannelByManager } from 'src/graphql/customQueries';
import { Edit } from '@material-ui/icons';
import loadingGif from '../../components/assets/loading1.gif';
// import ChannelAdd from '../../components/dashboard/channel/channel-create/ChannelAdd';

const ProjectDashboard = (props) => {
  const { settings } = useSettings();
  const { user } = useAuth();
  console.log('user', user)
  const [loading, setLoading] = useState(true);
  const [connectFetch, setConnectFetch] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(null);

  // Set state for User table
  const [userData, setUserData] = useState();
  const [projectData, setProjectData] = useState();

  // Load User table data
  useEffect(() => {
    gtm.push({ event: 'page_view' });
    getUserTable();
  }, []);

  // API call to get User table data
  const getUserTable = async () => {
    try {
      const userInfo = await API.graphql(graphqlOperation(getUser, { id: user.id }));
      console.log('user info', userInfo);
      const userList = userInfo.data.getUser;
      setUserData(userList);
      setProjectData(userList.channel.projects.items);
      setLoading(false);
      console.log('userList', userList);
      console.log('project data', projectData);
      console.log('is loading', loading);
    } catch (error) {
      console.log('error on fetching user table', error);
    }
  };

  const handleChannelCreation = () => {
    console.log('click!');
    setConnectFetch(true);
    fetch("/onboard-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.url) {
          window.location = data.url;
        } else {
          elmButton.removeAttribute("disabled");
          elmButton.textContent = "<Something went wrong>";
          console.log("data", data);
        }
      });
  }

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      {loading ? (
        <Grid
        container
        height="80vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item

        >
          <img
            src={loadingGif}
            width="150px"
            height="auto"
            alt=""
          />
          <Typography align="center">Loading Projects...</Typography>
        </Grid>
      </Grid>
    ) : (
        <>
          <Helmet>
            <title>Dashboard: Projects | Indev</title>
          </Helmet>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 8
            }}
          >
            <Container maxWidth={settings.compact ? 'xl' : false}>
              <Grid
                alignItems="center"
                container
                justifyContent="space-between"
                spacing={3}
                {...props}
              >
                <Grid item>
                  <Typography
                    color="textPrimary"
                    variant="h5"
                  >
                    Project
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
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                    >
                      Projects
                    </Typography>
                  </Breadcrumbs>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3 }}>
                <Grid
                  container
                  justifyContent="center"
                  xs={10}
                  m="auto"
                >
                  <Grid item xs={12}>
                    {projectData.map((project, index) => {
                      return (
                        <Grid
                          key={index}
                          container
                          justifyContent="center"
                          display="column"
                          sx={{ m: 1 }}
                          xs={12}
                        >
                          <Grid item xs={12}>
                            <Accordion
                              expanded={expanded === `panel${index}`}
                              onChange={handleChange(`panel${index}`)}
                            >
                              <AccordionSummary
                                aria-controls={`panel${index}d-content`}
                                id={`panel${index}d-header`}
                              >
                                <Grid container alignItems="center" justifyContent="space-between">
                                  <Grid item xs={6}>
                                    <Typography variant="h3">{project.name}</Typography>
                                  </Grid>
                                  <Grid item>
                                    <IconButton
                                      onClick={(event) => event.stopPropagation()}
                                      onFocus={(event) => event.stopPropagation()}
                                      href={`/dashboard/project/${project.id}`}
                                    >
                                      <Edit />
                                    </IconButton>                          
                                  </Grid>
                                </Grid>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Divider />
                                <Grid container spacing={2} mt={2}>
                                  <Grid item xs={8}>
                                    <Typography>{project.description}</Typography>
                                  </Grid>
                                  <Grid item align="center" xs={2}>
                                    <Chip label={project.devStage} />
                                  </Grid>
                                  <Grid item align="center" xs={2}>
                                    <Typography>Updates</Typography>
                                    <Typography variant="h5">{project.updates.items.length}</Typography>
                                  </Grid>
                                </Grid>
                              </AccordionDetails>
                            </Accordion>
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default ProjectDashboard;
