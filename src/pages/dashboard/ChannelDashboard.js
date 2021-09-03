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
  Typography
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import useAuth from '../../hooks/useAuth';
import Plus from '../../icons/Plus';
// import { ChannelCreateWizard } from '../../components/dashboard/channel';
import useSettings from '../../hooks/useSettings';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import { updateChannel } from '../../graphql/mutations';
import { getUser } from '../../graphql/queries';
import { getChannelByManager } from 'src/graphql/customQueries';
// import ChannelAdd from '../../components/dashboard/channel/channel-create/ChannelAdd';

const ChannelDashboard = (props) => {
  const { settings } = useSettings();
  const { user } = useAuth();
  const [connectFetch, setConnectFetch] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Set state for User table
  const [userData, setUserData] = useState([]);

  // Load User table data
  useEffect(() => {
    gtm.push({ event: 'page_view' });
    getUserInfo();
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

  return (
    <>
      <Helmet>
        <title>Dashboard: Channel | Indev</title>
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
                Channel
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
                  Channel
                </Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Grid
              container
              justifyContent="center"
              spacing={3}
              xs={10}
              m="auto"
              {...props}
            >
              <Grid item xs={6}>
                <Card sx={{ p: 4, height: '100%' }}>
                  <Typography variant="h5">
                    STEP 1
                  </Typography>
                  <Typography variant="h6" fontWeight="700" mb={2}>
                    Connect your bank account
                  </Typography>
                  <Typography mb={2}>
                    The first step is connecting your bank accout so you can get paid as soon as you have subscribers.
                    We use Stripe to securely handle all transactions.
                    You must set this up before creating your channel to make sure that you can receive payments.
                  </Typography>
                  <Box display="flex" alignItems="center">
                    {!connectFetch ?
                    (
                      <Button 
                        variant="contained"
                        onClick={() => handleChannelCreation()}
                      >
                        Connect Account
                      </Button>
                    ) : (
                      <Typography fontWeight="600" color="primary" p={.7}>Connecting to Stripe...</Typography>
                    )
                    }
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ p: 4, height: '100%' }}>
                  <Typography variant="h5">
                    STEP 2
                  </Typography>
                  <Typography variant="h6" fontWeight="700" mb={2}>
                    Create your channel
                  </Typography>
                  <Typography mb={2}>
                    You're halfway done. Now it's time for the fun part. Start setting up your channel so you can show 
                    everyone what you are working on and receive support to continue developing!
                  </Typography>
                  <Link
                    component={RouterLink}
                    to="/dashboard/channels/new"
                    underline="none"
                  >
                    <Button
                      variant="contained"
                    >
                      Create Channel
                    </Button>
                  </Link>
                </Card>
              </Grid>
            </Grid> 
            {/* <ChannelAdd /> */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ChannelDashboard;
