// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//   Grid,
//   Typography
// } from '@material-ui/core';

// const ProjectEdit = (props) => {
//   const { project } = props;
//   return (
//     <>
//       <Grid container>
//         <Grid item>
//           <Typography>{project.name}</Typography>
//         </Grid>

//       </Grid>
//     </>
//   );
// };

// ProjectEdit.propTypes = {
//   project: PropTypes.any
// };

// export default ProjectEdit;
/* eslint-disable */
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  // Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  Link,
  Switch,
  TextField,
  Typography
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import {
  updateProject,
  updateUser
} from '../../../../graphql/mutations';
import useAuth from '../../../../hooks/useAuth';
import wait from '../../../../utils/wait';
// import countries from './countries';

const ProjectEdit = (props) => {
  const { project } = props;
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  console.log('user', user.id);
  console.log('userInfo:', userInfo);

  const getUserInfo = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(queries.getUser, { id: user.id }));
      const userList = userData.data.getUser;
      setUserInfo(userList);
      console.log('list', userList);
    } catch (error) {
      console.log('error on fetching videos', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Grid
      container
      spacing={3}
      {...props}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center'
              }}
            >
              <Box
                sx={{
                  p: 1,
                  border: (theme) => `1px dashed ${theme.palette.divider}`,
                  borderRadius: '50%'
                }}
              >
                <Avatar
                  src={user.avatar}
                  sx={{
                    height: 100,
                    width: 100
                  }}
                />
              </Box>
              <Typography
                color="textPrimary"
                sx={{ mt: 1 }}
                variant="subtitle2"
              >
                {user.name}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Your plan:
                {' '}
                <Link
                  color="primary"
                  component={RouterLink}
                  to="/dashboard/account"
                >
                  {user.plan}
                </Link>
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth
              variant="text"
            >
              Remove Picture
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid
        item
        lg={8}
        md={6}
        xl={9}
        xs={12}
      >
        <Formik
          enableReinitialize
          initialValues={{
            name: project.name,
            developers: project.developers,
            description: project.description,
            category: project.category,
            featuredImg: project.featuredImg,
            startDate: project.startDate,
            endDate: project.endDate,
            devStage: project.devStage,
            updates: project.updates,
            submit: null

            /*
            canHire: userInfo.canHire || false,
            city: user.city || '',
            country: user.country || '',
            email: user.email || '',
            isPublic: user.isPublic || false,
            firstName: userInfo.firstName || '',
            lastName: userInfo.lastName || '',
            displayName: userInfo.displayName || '',
            phone: user.phone || '',
            state: user.state || '',
            submit: null
            */
           
          }}
          validationSchema={Yup
            .object()
            .shape({
              name: Yup.string().max(50).required('Your project must have a name!'),
              description: Yup.string().max(500).required('Your project must have a description!'),
              category: Yup.string(),
              startDate: Yup.string().required('Please enter the date you started this project'),
              endDate: Yup.string().required('Please enter an estimated date you will finish this project'),
              devStage: Yup.string().required('Pick the closest stage that your project is in'),
            })}
          onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            try {
              // NOTE: Make API request
              const UpdateProjectInput = {
                id: project.id,
                name: values.name,
                developers: values.developers,
                description: values.description,
                startDate: values.startDate,
                endDate: values.endDate,
                devStage: values.devStage,
                updates: values.updates
              };
              console.log('project info', UpdateProjectInput);
              console.log('user.id:', user.id, 'user.sub', user.sub);
              await API.graphql(graphqlOperation(updateProject, { input: UpdateProjectInput }));
              console.log('user info', UpdateProjectInput);

              await wait(200);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              enqueueSnackbar('Project updated', {
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
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader title={project.name} />
                <Divider />
                <CardContent>
                  <Grid
                    container
                    spacing={4}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.name && errors.name)}
                        fullWidth
                        helperText={touched.name && errors.name}
                        label="Project Name"
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.description && errors.description)}
                        fullWidth
                        helperText={touched.description && errors.description}
                        label="Description"
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.displayName && errors.displayName)}
                        fullWidth
                        helperText={touched.displayName && errors.displayName}
                        label="Start Date"
                        name="startDate"
                        type="date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.startDate}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.displayName && errors.displayName)}
                        fullWidth
                        helperText={touched.displayName && errors.displayName}
                        label="End Date"
                        name="endDate"
                        type="date"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.endDate}
                        variant="outlined"
                      />
                    </Grid>
                    {/* <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.phone && errors.phone)}
                        fullWidth
                        helperText={touched.phone && errors.phone}
                        label="Phone Number"
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <Autocomplete
                        getOptionLabel={(option) => option.text}
                        options={countries}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            label="Country"
                            name="country"
                            onChange={handleChange}
                            variant="outlined"
                            {...params}
                          />
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.state && errors.state)}
                        fullWidth
                        helperText={touched.state && errors.state}
                        label="State/Region"
                        name="state"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.state}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.city && errors.city)}
                        fullWidth
                        helperText={touched.city && errors.city}
                        label="City"
                        name="city"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.city}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="subtitle2"
                      >
                        Public Profile
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="body2"
                      >
                        Means that anyone viewing your profile will
                        be able to see your contacts details
                      </Typography>
                      <Switch
                        checked={values.isPublic}
                        color="primary"
                        edge="start"
                        name="isPublic"
                        onChange={handleChange}
                      />
                    </Grid> */}
                    {/* <Grid
                      item
                      md={12}
                      xs={12}
                      justify="center"
                      justifyContent="center"
                      display="flex"
                      textAlign="center"
                    >
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <Switch
                          checked={values.canHire}
                          color="primary"
                          edge="start"
                          name="canHire"
                          onChange={handleChange}
                        />
                        <Typography
                          color="textPrimary"
                          gutterBottom
                          variant="subtitle2"
                        >
                          Available to hire
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          When this is selected your channel will be shown to recruiters and companies looking to hire. You can toggle this on/off as often as you like.
                        </Typography>
                      </Grid>
                    </Grid> */}
                  </Grid>
                  {errors.submit && (
                    <Box sx={{ mt: 3 }}>
                      <FormHelperText error>
                        {errors.submit}
                      </FormHelperText>
                    </Box>
                  )}
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
                    type="submit"
                    variant="contained"
                  >
                    Save Changes
                  </Button>
                </Box>
              </Card>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default ProjectEdit;

