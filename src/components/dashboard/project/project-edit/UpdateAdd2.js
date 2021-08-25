/* eslint-disable */
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  // Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import {
  updateProject,
} from '../../../../graphql/mutations';
import useAuth from '../../../../hooks/useAuth';
import wait from '../../../../utils/wait';
// import Graphics from 'src/components/graphics/Graphics';

const offset = 5;

const UpdateAdd2 = (props) => {
  const { project } = props;
  const { user } = useAuth();
  // const [userInfo, setUserInfo] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  // const getUserInfo = async () => {
  //   try {
  //     const userData = await API.graphql(graphqlOperation(queries.getUser, { id: user.id }));
  //     const userList = userData.data.getUser;
  //     setUserInfo(userList);
  //     console.log('list', userList);
  //   } catch (error) {
  //     console.log('error on fetching videos', error);
  //   }
  // };

  const featImg = () => {
    const randomFeat = 'https://source.unsplash.com/weekly?water';
    return randomFeat;
  }

  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      {...props}
    >
      <Grid
        item
        sx={{
          // backgroundImage: <Graphics graphicID="1" />,
          backgroundSize: 'cover',
          height: 300
        }}
        xs={12}
      >
        <Grid
          item
          sx={{
            backgroundImage: `url(${featImg()})`,
            backgroundSize: 'cover',
            height: 300
          }}
          xs={12}
        >
          <Grid container>
            <Grid
              item
              xs={3}
              zIndex='20'
            >
              <Box
                sx={{
                  backgroundColor: 'brand.background1',
                  pr: 5,
                  py: 2,
                  ml: -offset
                }}
              >
                <Box
                  sx={{
                    ml: offset
                  }}
                >
                  <Typography variant="h2" textAlign="right" color="white" fontWeight="700">{project.name}</Typography>   
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              zIndex="5"
            >
              <Box
                sx={{
                  backgroundColor: 'white',
                  mt: 8,
                  ml: -4,
                  p: 4
                }}
              >
                {console.log('update length', project.updates.itemslength)}
                {console.log('updates', project.updates)}
                {project.updates.items.length > 0 ? (
                  project.updates.items.map((update, index) => (
                    <>
                      <Typography>Update #{index+1}</Typography>
                      <Typography>Name: {update.name}</Typography>
                    </>
                  ))
                ) : (
                  null
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              align="right"
              pr={2}
            >
              <Button variant="contained" color="secondary">Change Image</Button>            
            </Grid>
          </Grid>

        </Grid>
        <Grid
          item
          xl={9}
          lg={9}
          md={10}
          xs={12}
        >
          <Formik
            enableReinitialize
            initialValues={{
              name: project.name || '',
              developers: project.developers || '',
              description: project.description || '',
              category: project.category || '',
              featuredImg: project.featuredImg || '',
              startDate: project.startDate || '',
              endDate: project.endDate || '',
              devStage: project.devStage || '',
              updates: project.updates || '',
              submit: null
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
                console.log('project id', project.id)
                // NOTE: Make API request
                const UpdateProjectInput = {
                  id: project.id,
                  name: values.name,
                  // developers: values.developers,
                  description: values.description,
                  startDate: values.startDate,
                  endDate: values.endDate,
                  devStage: values.devStage
                  // updates: values.updates
                };
                console.log('project info before', UpdateProjectInput);
                // Error occurring here:
                const upProj = await API.graphql(graphqlOperation(updateProject, { input: UpdateProjectInput }));
                console.log('project info after', upProj.data);

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
                      Update Project
                    </Button>
                  </Box>
                </Card>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UpdateAdd2;

