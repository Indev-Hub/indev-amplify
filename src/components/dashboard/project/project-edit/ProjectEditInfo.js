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
import {
  updateProject,
} from '../../../../graphql/mutations';
import wait from '../../../../utils/wait';

const ProjectEditInfo = (props) => {
  const { project, user, overlap } = props;
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Grid container justifyContent="center" mt={-overlap}>
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
                  {/* <CardHeader title={project.name} />
                  <Divider /> */}
                  <CardContent>
                    <Grid
                      container
                      spacing={4}
                      mt={3}
                      px={1}
                    >
                      <Grid
                        item
                        md={8}
                        xs={12}
                      >
                        <Box>
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
                        </Box>
                        <Box mt={3}>
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
                        </Box>
                      </Grid>
                      <Grid
                        item
                        md={3}
                        xs={12}
                      >
                        <Box>
                          <TextField
                            error={Boolean(touched.startDate && errors.startDate)}
                            fullWidth
                            helperText={touched.startDate && errors.startDate}
                            label="Start Date"
                            name="startDate"
                            type="date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.startDate}
                            variant="outlined"
                          />
                        </Box>
                        <Box mt={3}>
                          <TextField
                            error={Boolean(touched.endDate && errors.endDate)}
                            fullWidth
                            helperText={touched.endDate && errors.endDate}
                            label="End Date"
                            name="endDate"
                            type="date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.endDate}
                            variant="outlined"
                          />
                        </Box>
                      </Grid>
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
    </>
  )
}

export default ProjectEditInfo
