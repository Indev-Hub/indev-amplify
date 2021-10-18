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
import { Storage } from 'aws-amplify';
import FileDropzone from '../../../FileDropzone';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import {
  createUpdate,
  updateProject,
} from '../../../../graphql/mutations';
import useAuth from '../../../../hooks/useAuth';
import wait from '../../../../utils/wait';

const ProjectVideoAdd = (props) => {
  const { project, user, toggleUpload, overlap } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [files, setFiles] = useState([]);
  const [vidData, setVidData] = useState([]);

  useEffect(() => {
    loadData();
    console.log('vidDATA: ', vidData)
  }, []);

  const handleDrop = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  console.log('files:', files);

  const handleRemove = (file) => {
    setFiles((prevFiles) => prevFiles.filter((_file) => _file.path
      !== file.path));
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };

  // The 'title' prop is passed through in the onSubmit Formik function (line 101-ish)
  const uploadVideo = (title) => {
    // Set path within channel-storage194552-feat/public/ bucket
    // Currently saving inside the project id
    const path = `${project.id}/${title}`;

    // path is defined above and files is from state
    handleUpload(files, path);
  };

  // Upload videos to S3
  const handleUpload = async (file, path) => {
    console.log('before', file, path)
    await Storage.put(path, file, { contentType: 'video' });
    console.log('after success!')
  }

    // Get the vimeo showcase
    const loadData = async () => {
      try {
        const vidFetch = await fetch(`https://api.vimeo.com/me/albums/8521543/videos`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.REACT_APP_SHOWCASE_AUTH}` } })
        .then(response => response.json())
        const vidList = vidFetch.data
        setVidData(vidList);
      } catch (error){
        console.log('ERorr:', error)
      }
    }

  // limit number of video uploads to 2 per month
  const videoLimit = () => {
    const presentYearAndMonth = new Date().toISOString().match(/\d{4}-\d{2}/)[0]
    const matchingMonthUploads = vidData.filter(video => video.created_time.match(presentYearAndMonth))
    
    console.log("Matching Month Uploads:", matchingMonthUploads)

    return (
      <>
        {matchingMonthUploads.length <= 1
          ? (<Button
              color="primary"
              // disabled={isSubmitting}
              type="submit"
              variant="contained"
            >
              Upload Video
            </Button>)
          : (<Button
              color="primary"
              type="submit"
              variant="contained"
            >
              Upgrade Plan
            </Button>)
        }
      </>
    )
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
                title: Yup.string().max(50).required('Your video must have a title!')
              })}
            onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
              try {
                const path = 
                uploadVideo(values.title);

                await wait(200);
                resetForm();
                setStatus({ success: true });
                setSubmitting(false);
                enqueueSnackbar('Video Uploaded Successfully', {
                  anchorOrigin: {
                    horizontal: 'right',
                    vertical: 'top'
                  },
                  variant: 'success'
                });
                toggleUpload();
              } catch (err) {
                console.log('An error occurred during video upload', err)
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
                  <CardHeader title={`Upload a video for ${project.name}`} />
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
                          error={Boolean(touched.title && errors.title)}
                          fullWidth
                          helperText={touched.title && errors.title}
                          label="Video Title"
                          name="title"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.title}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={12}
                        xs={12}
                      >
                        <FileDropzone
                          accept="video/*"
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
                      onClick={toggleUpload}
                    >
                      Cancel
                    </Button>

                    {/* <TextField
                      label="Can you Upload?!"
                      name="upload"
                      type="hidden"
                      // value="Allowed to upload"
                      required
                    /> */}

                    {videoLimit()}
                    {/* <Button
                      color="primary"
                      // disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                    >
                      Upload Video
                    </Button> */}
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

export default ProjectVideoAdd;
