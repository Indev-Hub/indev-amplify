/* eslint-disable */
import { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { Box, Button, Card, CardContent, CardHeader, Divider, Dialog, FormHelperText,  Grid, TextField, Typography } from '@material-ui/core';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import FileDropzone from '../../FileDropzone';
import { updateProject } from 'src/graphql/mutations';
import wait from 'src/utils/wait';

const ProfileImageModal = (props) => {
  const { authorAvatar, authorName, onApply, onClose, open, project, user, ...other } = props;
  const [value, setValue] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const [files, setFiles] = useState([]);
  console.log('files:', files);

  // FileDropzone
  const handleDrop = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemove = (file) => {
    setFiles((prevFiles) => prevFiles.filter((_file) => _file.path
      !== file.path));
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };

  // The 'title' prop is passed through in the onSubmit Formik function (line 101-ish)
  const uploadImage = (files) => {
    try {
      // Set path within channel-storage194552-feat/public/ bucket
      // Currently saving inside the project id
      const path = `user/${user.id}/profileImg`;

      // path is defined above and files is from state
      handleUpload(files, path);

      // Create Project Inputs
      const UpdateProjectInput = {
        id: project.id,
        avatar: path 
      };

      console.log('project info before', UpdateProjectInput)
      const upProj = API.graphql(gAPIraphqlOperation(updateProject, { input: UpdateProjectInput }));
    } catch (error){ 
      console.log("error on updating avatar", error)
    }
  };

  // Upload image to S3
  const handleUpload = async (file, path) => {
    try {
      console.log('before', file, path)
      await Storage.put(path, file, { contentType: 'image' });
      console.log('after success!')
    } catch (err) {
      console.log('error during image upload', err)
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleApply = () => {
    enqueueSnackbar('Request sent', {
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'top'
      },
      variant: 'success'
    });
    // uploadImage(files);

    if (onApply) {
      onApply();
    }
  };

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
      {...other}
    >
      <Grid
        container
        spacing={3}
        justifyContent="center"
        {...props}
      >
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
                submit: null           
              }}
              validationSchema={Yup
                .object()
                .shape({
                  title: Yup.string().max(50).required('Your image must have a title!')
                })}
              onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
                try {
                  console.log('values', files, path)
                  uploadImage(files);

                  await wait(200);
                  resetForm();
                  setStatus({ success: true });
                  setSubmitting(false);
                  enqueueSnackbar('Image Uploaded Successfully', {
                    anchorOrigin: {
                      horizontal: 'right',
                      vertical: 'top'
                    },
                    variant: 'success'
                  });
                } catch (err) {
                  console.log('An error occurred during image upload', err)
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
                    <CardHeader title={`Upload an image for your profile picture!`} />
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
                          {/* <TextField
                            error={Boolean(touched.title && errors.title)}
                            fullWidth
                            helperText={touched.title && errors.title}
                            label="Image Title"
                            name="title"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.title}
                            variant="outlined"
                          /> */}
                        </Grid>
                        <Grid
                          item
                          md={12}
                          xs={12}
                        >
                          <FileDropzone
                            accept="image/*"
                            files={files}
                            showUpload={false}
                            maxFiles={1}
                            onDrop={handleDrop}
                            onRemove={handleRemove}
                            onRemoveAll={handleRemoveAll}
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
                        justifyContent: 'space-between',
                        p: 2
                      }}
                    >
                      <Button
                        color="primary"
                        // disabled={isSubmitting}
                        variant="contained"
                        onClick= {onClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                        // onClick={handleApply}
                      >
                        Upload Image
                      </Button>
                      {/* {console.log('submitting', isSubmitting)} */}
                    </Box>
                  </Card>
                </form>
              )}
            </Formik>
        </Grid>
      </Grid>
    </Dialog>
  );
};

ProfileImageModal.propTypes = {
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  onApply: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

export default ProfileImageModal;