/* eslint-disable */
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  // Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import {
  updateProject,
} from '../../../../graphql/mutations';
import useAuth from '../../../../hooks/useAuth';
import wait from '../../../../utils/wait';
import ProjectUpdateAdd from '../project-create/ProjectUpdateAdd';
import ProjectEditInfo from './ProjectEditInfo';
import { Add, CameraAlt } from '@material-ui/icons';
import ProjectUpdateList from './ProjectUpdateList';
import ProjectVideoAdd from '../project-create/ProjectVideoAdd';
import ProjectImageModal from './ProjectImageModal';

const offset = 5;

const ProjectEdit_v2 = (props) => {
  const { project } = props;
  const { user } = useAuth();
  const [ showUpdate, setShowUpdate ] = useState(false);
  const [ showUpload, setShowUpload ] = useState(false);
  const [ featImage, setFeatImage ] = useState();
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  // const { user } = useAuth();
  // const [userInfo, setUserInfo] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  function toggleUpdate() {
    setShowUpdate(false);
  }

  function toggleUpload() {
    setShowUpload(false);
  }

  const featImg = () => {
    const randomFeat = 'https://source.unsplash.com/weekly?water';
    return randomFeat;
  }

  useEffect(() => {
    featuredImg();
    console.log("HELLO")
  }, [])

  const featuredImg = async () => {
    if (featImage === null) {
        featImg();
        console.log('featImg', featImg)
        return;
    }

    const imageFilePath = `${project.id}/featuredImg`;
    try {
        const fileAccessURL = await Storage.listObjects();
        console.log('access url', fileAccessURL);
        setFeatImage(fileAccessURL);
        return;
    } catch (error) {
        console.error('error accessing the file from s3', error);
    }
};

  const handleApplyModalOpen = () => {
    setIsApplicationOpen(true);
  };

  const handleApplyModalClose = () => {
    setIsApplicationOpen(false);
  };

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
          backgroundImage: featImage,
          backgroundSize: 'cover',
          height: 300
        }}
        xs={12}
      >
        <img height="300px" src={featImage} alt='' />
        <Grid container justifyContent="space-between">
          <Grid
            item
            xs={5}
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
          {/* <Grid
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
              {console.log('update length', project.updates.items.length)}
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
          </Grid> */}
          <Grid
            item
            xs={3}
            align="right"
            pr={2}
          >
            <Avatar sx={{ backgroundColor: 'brand.primary0' }}>
              <IconButton onClick={handleApplyModalOpen}>
                <CameraAlt sx={{ color: 'brand.primary2' }} />
              </IconButton>
            </Avatar>
            {/* <Button variant="contained" color="secondary">Change Image</Button>             */}
          </Grid>
          <ProjectEditInfo project={project} user={user} overlap={5} />
          <ProjectUpdateList project={project} user={user} overlap={5} />
          {showUpdate ? (
            <ProjectUpdateAdd project={project} user={user} overlap={5} toggleUpdate={toggleUpdate} />
          ) : (
            <Grid container justifyContent="center" xs={12} mb={1} mt={1}>
              <Grid item xs={9}>
                <Button fullWidth sx={{ p: 1 }} variant="contained" onClick={() => setShowUpdate(true)} startIcon={<Add />}>Add Update</Button>
              </Grid>
            </Grid>
          )}
          {showUpload ? (
            <ProjectVideoAdd project={project} user={user} overlap={0} mb={10} toggleUpload={toggleUpload} />
          ) : (
            <Grid container justifyContent="center" xs={12} mb={10} mt={1}>
              <Grid item xs={9}>
                <Button fullWidth sx={{ p: 1 }} variant="contained" onClick={() => setShowUpload(true)} startIcon={<Add />}>Upload Video</Button>
              </Grid>
            </Grid>
          )}
            <ProjectImageModal
              // authorAvatar={project.author.avatar}
              // authorName={project.author.name}
              onApply={handleApplyModalClose}
              onClose={handleApplyModalClose}
              open={isApplicationOpen}
              project={project}
              user={user}
            />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectEdit_v2;
