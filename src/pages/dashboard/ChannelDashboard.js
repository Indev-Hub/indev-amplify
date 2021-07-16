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
import { getChannel } from '../../graphql/queries';
import { getChannelByManager } from 'src/graphql/customQueries';
// import ChannelAdd from '../../components/dashboard/channel/channel-create/ChannelAdd';

const ChannelDashboard = (props) => {
  const { settings } = useSettings();
  const { user } = useAuth();
  const [channelInfo, setChannelInfo] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const getChannelInfo = async () => {
    try {
      console.log('user', user.id);
      console.log('channel info', channelInfo);
      // console.log('getChannelByManager', getChannelByManager, queries.getChannelByManager);
      const channelData = await API.graphql(graphqlOperation(getChannelByManager , { id: '77929e49-a848-4b65-ade1-4882067d709b' }));
      
      console.log('channel data', channelData.data.getChannel);
      setChannelInfo(channelData.data.getChannel);
      console.log('channel info after setChannelInfo', channelInfo)
    } catch (error) {
      console.log('error on fetching channel', error);
    }
  };

  useEffect(() => {
    getChannelInfo();
    gtm.push({ event: 'page_view' });

    console.log('channel info after setChannelInfo', channelInfo)
  }, []);

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
              {...props}
            >
              <Grid item>
                <Link
                  color="textSecondary"
                  component={RouterLink}
                  to="/dashboard/channels/new"
                  underline="none"
                  variant="body1"
                >
                  <Paper>
                    <Plus sx={{ fontSize: 250, mt: -3 }} />
                    <Typography variant="h4" sx={{ textAlign: 'center', pb: 2, mt: -6 }}>Add Channel</Typography>
                  </Paper>
                </Link>
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                xl={12}
                xs={12}
                sx={{mt:2}}
              >
                <Formik
                  enableReinitialize
                  initialValues={{
                    name: channelInfo.name || '',
                    category: channelInfo.category || '',
                    description: channelInfo.description || '',
                    featuredImg: channelInfo.featuredImg || '',
                    target: channelInfo.target || '',
                    submit: null
                  }}
                  validationSchema={Yup
                    .object()
                    .shape({
                      name: Yup
                        .string()
                        .min(2)
                        .required('Your first name is required'),
                      description: Yup
                        .string()
                        .min(2, `Give 'em a little more information to love`)
                        .max(250, 'Keep your description short and sweet')
                        .required('You have to have a description so people know why to support you!'),
                      target: Yup
                        .number()
                        .required('Let everyone know how much money you need to focus on the development full-time')
                    })}
                  onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
                    try {
                      // NOTE: Make API request
                      const UpdateChannelInput = {
                        id: channelInfo.id,
                        name: values.name,
                        description: values.description,
                        target: values.target
                      };
                      
                      // Update Channel Table
                      console.log('channel info', UpdateChannelInput);
                      await API.graphql(graphqlOperation(updateChannel, { input: UpdateChannelInput }));
                      console.log('channel info after add to db', UpdateChannelInput);

                      // await wait(200);
                      resetForm();
                      setStatus({ success: true });
                      setSubmitting(false);
                      enqueueSnackbar('Channel updated', {
                        anchorOrigin: {
                          horizontal: 'right',
                          vertical: 'top'
                        },
                        variant: 'success'
                      });
                    } catch (err) {
                      console.error(err);
                      setStatus({ success: false });
                      setErrors({ submit: err.message });
                      setSubmitting(false);
                      console.log('failure to update channel', err)
                    }
                  }}
                >
                  {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form onSubmit={handleSubmit}>
                      <Card>
                        <CardHeader title="Channel" />
                        <Divider />
                        <CardContent>
                          <Grid
                            container
                            spacing={4}
                          >
                            <Grid
                              item
                              md={12}
                              xs={12}
                            >
                              <TextField
                                error={Boolean(touched.name && errors.name)}
                                fullWidth
                                helperText={touched.name && errors.name}
                                label="Channel Name"
                                name="name"
                                placeholder={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid
                              item
                              md={12}
                              xs={12}
                            >
                              <TextField
                                error={Boolean(touched.description && errors.description)}
                                fullWidth
                                helperText={touched.description && errors.description}
                                label="Desription"
                                name="description"
                                rowsMax="8"
                                multiline="true"
                                placeholder={values.description}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid
                              item
                              md={12}
                              xs={12}
                            >
                              <FormControl fullWidth>
                                <InputLabel sx={{ ml:2, mt:-1 }}>Target Amount</InputLabel>
                                <OutlinedInput
                                  error={Boolean(touched.target && errors.target)}
                                  fullWidth
                                  helperText={touched.target && errors.target}
                                  label="Target Amount"
                                  name="target"
                                  placeholder={values.target}
                                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.target}
                                />
                              </FormControl>
                              <InputLabel sx={{ m:2, mb:-1 }} shrink="true" >Featured Image</InputLabel>
                              <FileDropzone
                                accept="image/*"
                                maxFiles={1}
                                value={values.featuredImg}
                              />
                            </Grid>
                          </Grid>

                        </CardContent>
                        <Divider />
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                          }}
                        >
                          <Button
                            color="primary"
                            disabled={isSubmitting}
                            type="button"
                            variant="contained"
                            onClick={getChannelInfo}
                          >
                            Get Channel Info
                          </Button>
                          <Button
                            color="primary"
                            disabled={isSubmitting}
                            type="submit"
                            variant="contained"
                            onClick={getChannelInfo}
                          >
                            Save Changes
                          </Button>
                          {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                              <FormHelperText error>
                                {errors.submit}
                              </FormHelperText>
                            </Box>
                          )}
                        </Box>
                      </Card>
                    </form>
                  )}
                </Formik>
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
