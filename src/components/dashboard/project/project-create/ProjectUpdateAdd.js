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
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import {
  createUpdate,
  updateProject,
} from '../../../../graphql/mutations';
import useAuth from '../../../../hooks/useAuth';
import wait from '../../../../utils/wait';

const ProjectUpdateAdd = (props) => {
  const { project, user, overlap } = props;

  const { enqueueSnackbar } = useSnackbar();

  const featImg = () => {
    const randomFeat = 'https://source.unsplash.com/weekly?water';
    return randomFeat;
  }

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      mt={overlap}
      {...props}
    >
      <Grid
        item
        xl={9}
        lg={9}
        md={10}
        xs={12}
      >
        {console.log('project', project)}
          <Formik
            enableReinitialize
            initialValues={{
              name: '',
              short: '',
              content: '',
              format: '',
              // coverImg: '',
              submit: null           
            }}
            validationSchema={Yup
              .object()
              .shape({
                name: Yup.string().max(50).required('Your update must have a name!'),
                short: Yup.string().max(200).required('Your update must have a short description!'),
                content: Yup.string().required('Your update must have a short description!'),
                format: Yup.array().required('Please pick which type of update you are creating')
              })}
            onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
              try {
                console.log('project id', project.id)
                // NOTE: Make API request
                const CreateUpdateInput = {
                  name: values.name,
                  updateProjectId: project.id,
                  projectID: project.id,
                  short: values.short,
                  updateAuthorId: user.id,
                  content: values.content,
                  format: values.format,
                  index: project.updates.items.length+1
                  // coverImg: '',
                };
                console.log('update before', CreateUpdateInput);
                // Error occurring here:
                const addUpdate = await API.graphql(graphqlOperation(createUpdate, { input: CreateUpdateInput }));
                console.log('update after', addUpdate.data);

                await wait(200);
                resetForm();
                setStatus({ success: true });
                setSubmitting(false);
                enqueueSnackbar('Update Created Successfully', {
                  anchorOrigin: {
                    horizontal: 'right',
                    vertical: 'top'
                  },
                  variant: 'success'
                });
              } catch (err) {
                console.log('An error occurred during update creation', err)
                console.error(err);
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form onSubmit={handleSubmit}>
                {console.log(values)}
                <Card>
                  <CardHeader title={`Update #${project.updates.items.length+1} for ${project.name}`} />
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
                          label="Update Name"
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
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Update Format</FormLabel>
                          <FormControlLabel
                            control={<Checkbox onChange={handleChange} name="format" value="text" />}
                            label="text"
                          />
                          <FormControlLabel
                            control={<Checkbox onChange={handleChange} name="format" value="images" />}
                            label="images"
                          />
                          <FormControlLabel
                            control={<Checkbox onChange={handleChange} name="format" value="video" />}
                            label="video"
                          />
                        </FormControl>
                        {/* <TextField
                          error={Boolean(touched.content && errors.content)}
                          fullWidth
                          select
                          helperText={touched.content && errors.content}
                          label="Update Format"
                          name="format"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.format}
                          variant="outlined"
                        >
                          {updateFormat.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField> */}
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          error={Boolean(touched.short && errors.short)}
                          fullWidth
                          helperText={touched.short && errors.short}
                          label="Short Description"
                          name="short"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.short}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          error={Boolean(touched.content && errors.content)}
                          fullWidth
                          helperText={touched.content && errors.content}
                          label="Update Content"
                          name="content"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.content}
                          variant="outlined"
                        />
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
                      // disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                    >
                      Create Update
                    </Button>
                    {console.log('submitting', isSubmitting)}
                  </Box>
                </Card>
              </form>
            )}
          </Formik>
      </Grid>
    </Grid>
  );
};

export default ProjectUpdateAdd;

